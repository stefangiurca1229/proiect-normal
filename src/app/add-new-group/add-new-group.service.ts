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

@Injectable({
    providedIn: "root"
})
export class AddNewGroupService {

    public usersQueue = new ReplaySubject(1);
    public realtimeDatabase: Database
    public app: FirebaseApp

    constructor(
        private fireStore: AngularFirestore,
        // private db: AngularFireDatabase
    ) {
        this.app = initializeApp(environment.firebase);
        this.realtimeDatabase = getDatabase(this.app)

        this.usersQueue.pipe(
            concatMap(
               async (data: any ) => {
                    const userRef = this.fireStore.collection('users').doc(data.email);
                    const groupRef = this.fireStore.collection('chats').doc(data.groupName);

                    const userSnapshot = await firstValueFrom(userRef.get());
                    const groupSnapshot = await firstValueFrom(groupRef.get());

                    const userData = userSnapshot?.data() as IUser;
                    const groupData = groupSnapshot?.data() as IChat;

                    groupData.users.push({
                        email: data.email,
                        userName: userData.userName
                    });
                    userData.chats.push(data.groupName);

                    const userSet = await userRef.set(userData).then(
                        () => console.log(userData, "salvat")
                    )

                    const groupSet = await groupRef.set(groupData).then(
                        () => console.log(groupData, "group data salvat")
                    )
                    return of(data.email).pipe(delay(1000))
                }
            )
        ).subscribe(
            res => console.log("fertich ", res)
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
                        set(ref(this.realtimeDatabase,"chats/"+uuid),{
                            messages: [""]
                        }).then(
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