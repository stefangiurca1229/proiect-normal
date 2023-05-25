import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database'
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { BehaviorSubject, map, Observable, of, take } from "rxjs";
import { IChat } from "../interfaces/IChat";
import { FirebaseAuthService } from "./firebaseAuth.service";
import { IMessage } from '../interfaces/IMessage'

@Injectable({
    providedIn: 'root'
})
export class ChatService{

    public groupChatUid: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
    public userEmail: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
    public messages: BehaviorSubject<IMessage[] | undefined> = new BehaviorSubject<IMessage[] | undefined>(undefined)
    public userName: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined)
    public chats: BehaviorSubject<IChat[] | undefined> = new BehaviorSubject<IChat[] | undefined>(undefined)

    constructor(
        private db: AngularFireDatabase,
        private fireStore: AngularFirestore,
        private firebaseAuth: FirebaseAuthService,
    ){
        this.groupChatUid.subscribe(
            (groupId: string | undefined) => {
                this.getChatMessages(groupId)
                    .subscribe(
                        (messages: IMessage[] )=>{
                            this.messages.next(messages);
                        }
                    )
            }
        )
    }

    public publishMessage(message: string){
        this.userName.pipe(take(1))
                        .subscribe(
                            (userName: string | undefined) => {
                                this.groupChatUid.pipe(take(1))
                                                .subscribe(
                                                    (groupId: string | undefined) =>{
                                                        if(groupId && userName){
                                                            const chatRef = this.db.object('chats/' + groupId); 
                                                            chatRef.snapshotChanges().pipe(
                                                                take(1)
                                                              ).subscribe(snapshot => {
                                                                const currentArray = snapshot.payload.val() as [] || []; // Get the current array or initialize it if it doesn't exist
                                                                const updatedArray = [...currentArray, {
                                                                    from: userName,
                                                                    content: message
                                                                }]; // Add the new element to the array
                                                            
                                                                chatRef.update(updatedArray)
                                                                  .then(() => console.log('New message added successfully.'))
                                                                  .catch(error => console.log('Error adding new element:', error));
                                                              });
                                                        }
                                                    } 
                                                )
                            }
                        )
    }

    getUserChats(email: string): Observable<any[]> {
       let userRef = this.fireStore.collection('users').doc(email).get();
       return userRef.pipe(
           map( (u: any) => {
              return u.data().chats
            })
       )
    }
    
    getChatUid(chatName: string): void{
        this.firebaseAuth.getUserInfo()
                        .pipe(take(1))
                        .subscribe(
                            (user: any) => {
                                this.userEmail.next(user.email)
                                this.userName.next(user.displayName)
                                let userRef = this.fireStore.collection('users').doc(user.email).get()
                                userRef
                                    .pipe(
                                    take(1),
                                    map((userInfo: any) => userInfo.data().chats)
                                        )
                                    .subscribe(
                                        (chats: any) =>{
                                            console.log(chats);
                                            if(chats){
                                                if(chats.includes(chatName)){
                                                    let chatRef = this.fireStore.collection('chats').doc(chatName).get();
                                                    chatRef.pipe(
                                                        map( (chat: any) => chat.data().groupId)
                                                    ).subscribe(
                                                        (groupId: string) => {
                                                            this.groupChatUid.next(groupId)
                                                        }
                                                    )
                                                }
                                            }
                                        }
                                    )
                            }
                        )
    }

    getChatMessages(chatUid: string | undefined): Observable<any>{
        if(chatUid){
            const chatRef = this.db.object('chats/' + chatUid);
            return chatRef.valueChanges();  
        }
        return of(undefined)
    }

    exitGroup(chat: string){
        this.firebaseAuth.getUserInfo()
                        .pipe(take(1))
                        .subscribe(
                            (user: any) => {
                                this.getUserChats(user.email)
                                    .pipe(take(1))
                                    .subscribe(
                                        (chats) => {
                                            chats.forEach(
                                                chat => {
                                                    let chatRef = this.fireStore.collection('chats').doc(chat)
                                                    chatRef.get()
                                                        .pipe(
                                                            take(1),
                                                            map((chatInfo: any) => {
                                                                return chatInfo.data().users
                                                            })
                                                            )
                                                        .subscribe(
                                                            (users: any) => {
                                                                const newUsers = users.filter( (u: any) => u.email != user.email)
                                                                chatRef.update({
                                                                    users: newUsers
                                                                })
                                                            }
                                                        )
                                                }
                                            )
                                        }
                                    )
                                let userRef = this.fireStore.collection("users").doc(user.email)
                                userRef.get()
                                        .pipe(
                                            map((user: any) => user.data().chats),
                                            take(1)
                                            )
                                        .subscribe(
                                            (chats: any) => {
                                                const newChats = chats.filter( (c: any) => c != chat)
                                                this.chats.next(newChats)
                                                userRef.update({
                                                    chats: newChats
                                                })
                                            }
                                        )
                            }
                        )
    }

    deleteGroup(chat: string){
        let chatRef = this.fireStore.collection('chats').doc(chat)
        chatRef.get()
            .pipe(
                map((chatInfo: any) => chatInfo.data().users),
                take(1)
            )
            .subscribe(
                (users: any) =>{
                    users.forEach((user: any) => {
                        let userRef = this.fireStore.collection('users').doc(user.email)
                        userRef.get()
                            .pipe(
                                map( (u: any) => u.data().chats),
                                take(1)
                            )
                            .subscribe(
                                (chats: any) =>{
                                    console.log(chats)
                                    const newChats = chats.filter( (c: any) => c != chat)
                                    this.chats.next(newChats)
                                    userRef.update({
                                        chats: newChats
                                    })
                                }
                            )
                    });
                    chatRef.delete()
                }
            )
    }

    addUserToGroup(userEmail: string, groupName: string){
        let userRef = this.fireStore.collection("users").doc(userEmail)
        let groupRef = this.fireStore.collection("chats").doc(groupName)
        userRef.get()
            .pipe(
                take(1)
            )
            .subscribe(
                (userInfo: any ) =>{
                    console.log("---------",userInfo.data())
                    userInfo = userInfo.data()
                    if(userInfo){
                        if(!userInfo.chats.includes(groupName)){
                            userInfo.chats.push(groupName)
                            userRef.update({
                                chats: userInfo.chats
                            })
                            groupRef.get()
                                .pipe(
                                    map( (c: any) => c.data().users),
                                    take(1)
                                )
                                .subscribe(
                                    (users: any) => {
                                        console.log(users)
                                        users.push({
                                            email: userEmail,
                                            userName: userInfo.userName
                                        })
                                        groupRef.update({
                                            users: users
                                        }).then( () => console.log("user adaugat cu sucess"))
                                    }
                                )
                        }
                    }
                }
            )
    }

}