import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database'
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ChatService{
    constructor(
        private db: AngularFireDatabase,
        private fireStore: AngularFirestore
    ){}

    getUserChats(email: string): Observable<any[]> {
       let userRef = this.fireStore.collection('users').doc(email).get();
       return userRef.pipe(
           map( (u: any) => {
              return u.data().chats
            })
       )
    }

}