import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
    providedIn: 'root'
})
export class FirebaseService{
    constructor(
        private http: HttpClient,
        private fireStore: AngularFirestore
      ) {
        console.log("service")
      }

      checkIfUserExists(uid: string){
        const userRef = this.fireStore.collection(uid).get();
        return userRef                 
      }

      addNewUser( userName: string, uid: string, photoUrl: string, email: string){
        const collectionRef = this.fireStore.collection("users");
        const tutRef = collectionRef.doc(email);
        tutRef.set({
            uid: uid,
            userName: userName,
            photoUrl: photoUrl,
            chats: []
        })
       }
}