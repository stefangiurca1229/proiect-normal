import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Platform } from "@ionic/angular";
import { GoogleAuthProvider } from 'firebase/auth';
import { BehaviorSubject, map, Observable, take } from "rxjs";
import { FirebaseService } from "./firebase.service";
// import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

@Injectable({
    providedIn: "root"
})
export class FirebaseAuthService {

    constructor(
        private afAuth: AngularFireAuth,
        private firebaseService: FirebaseService
    ) { }

    saveNewUserInfo(user: any) {
        this.firebaseService.checkIfUserExists(user.uid)
            .subscribe(
                u => {
                    console.log("check if user exist in firestore ", u)
                    if (u.size == 0) {
                        this.firebaseService.addNewUser(user.displayName, user.uid, user.photoURL, user.email)
                    }
                }
            )
    }

    GoogleAuth() {
        return this.AuthLogin(new GoogleAuthProvider());
    }

    AuthLogin(provider: any) {
        return this.afAuth
            .signInWithPopup(provider)
            .then(
                (user: any) => {
                    console.log(user.user.uid,user)
                    this.saveNewUserInfo(user.user)
                }
            )
    }

    AuthLoginNative(email: string, password: string) {
        this.afAuth
            .signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log('You have been successfully logged in with email and pwd', result);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    registerNewUserWithEmailAndPwd(email: string, password: string) {
        this.afAuth.createUserWithEmailAndPassword(email, password)
            .then(
                (user: any) => {
                    console.log("new user created! ", user.user.uid)
                    this.saveNewUserInfo(user.user)
                }
            )
    }

    getLoginStatus(): Observable<Boolean> {
        return this.afAuth.authState.pipe(map(
            (user: any) => {
                if (user) {
                    return true;
                }
                return false;
            }
        ))
    }

    getUserInfo() {
        return this.afAuth.authState;
    }

    signOut(){
        this.afAuth.signOut()
    }
}