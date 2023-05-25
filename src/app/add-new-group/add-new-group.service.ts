import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Database, getDatabase, ref, set } from "firebase/database";
import { uuidv4 } from "@firebase/util";
import { concatMap, delay, firstValueFrom, map, of, ReplaySubject, take } from "rxjs";
import { IChat } from "../interfaces/IChat";
import { IUser } from "../interfaces/IUser";
import { FirebaseApp, initializeApp } from "@firebase/app";
import { environment } from "src/environments/environment";
import { ChatService } from "../services/chat.service";
import { Router } from "@angular/router";
import { FirebaseAuthService } from "../services/firebaseAuth.service";

@Injectable({
    providedIn: "root"
})
export class AddNewGroupService {

    public usersQueue = new ReplaySubject(1);
    public realtimeDatabase: Database
    public app: FirebaseApp

    constructor(
        private fireStore: AngularFirestore,
        private chatService: ChatService,
        private router: Router,
        private auth: FirebaseAuthService
        // private db: AngularFireDatabase
    ) {
        this.app = initializeApp(environment.firebase);
        this.realtimeDatabase = getDatabase(this.app)

        this.usersQueue.pipe(
            concatMap(
                async (data: any) => {
                    const userRef = this.fireStore.collection('users').doc(data.email);
                    const groupRef = this.fireStore.collection('chats').doc(data.groupName);

                    const userSnapshot = await firstValueFrom(userRef.get());
                    const groupSnapshot = await firstValueFrom(groupRef.get());

                    const userData = userSnapshot?.data() as IUser;
                    const groupData = groupSnapshot?.data() as IChat;

                    let userDontExist = true;
                    groupData.users.forEach(
                        (u: any) => {
                            if (u.email == data.email)
                                userDontExist = false;
                        }
                    )

                    if (userDontExist) {
                        groupData.users.push({
                            email: data.email,
                            userName: userData.userName
                        });
                        const groupSet = await groupRef.set(groupData).then(
                            () => {
                                console.log(groupData, "group data salvat")
                            }
                        )
                    }

                    if (!userData.chats.includes(data.groupName)) {
                        userData.chats.push(data.groupName);

                        const userSet = await userRef.set(userData).then(
                            () => console.log(userData, "salvat")
                        )
                    }

                    return of(data.email).pipe(delay(1000))
                }
            )
        ).subscribe(
            res => {
                console.log("fertich ", res)
                auth.getUserInfo()
                    .subscribe(
                        user =>{
                            if(user?.email){
                                let userRef = fireStore.collection("users").doc(user?.email)
                                userRef.get()
                                    .pipe(
                                        map((u:any) => u.data().chats),
                                        take(1)
                                    )
                                    .subscribe(
                                        (chats: any) => {
                                            chatService.chats.next(chats)
                                            router.navigate(["home"])
                                        }
                                    )
                            }
                        }
                    )
            }
        )

    }

    checkIfEmailIsValid(email: string) {
        const userRef = this.fireStore.collection("users").doc(email)

        return userRef.get().pipe(
            map(user => user.exists)
        )
    }

    createNewGroup(groupName: string) {
        const groupRef = this.fireStore.collection('chats').doc(groupName)

        return groupRef.get()
            .pipe(map(
                (group) => {
                    if (!group.exists) {
                        let uuid = uuidv4()
                        // this.db.list(uuid).set(uuid,
                        //     {
                        //         messages: []
                        //     }
                        // )
                        // chatRef.set({messages: []})
                        set(ref(this.realtimeDatabase, "chats/" + uuid), []).then(
                            res => console.log("cica s-a salvat", res)
                        )
                        groupRef.set({
                            groupId: uuid,
                            users: []
                        })
                    }
                    return group.exists
                }
            ))
    }
}