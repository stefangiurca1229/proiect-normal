import { inject } from "@angular/core"
import { Router } from "@angular/router"
import { take } from "rxjs"
import { FirebaseAuthService } from "../services/firebaseAuth.service"

export const getLoginStatusForLogin = () => {

    const firebaseAuth = inject(FirebaseAuthService)
    const router = inject(Router)

    firebaseAuth.getLoginStatus().pipe(take(1))
                                 .subscribe(
                                     isLoggedIn => {
                                         console.log(isLoggedIn)
                                         if(isLoggedIn){
                                            router.navigate(['home'])
                                         }
                                         return !isLoggedIn
                                     }
                                 )
}

export const getLoginStatus = () => {

    const firebaseAuth = inject(FirebaseAuthService)
    const router = inject(Router)

    firebaseAuth.getLoginStatus().pipe(take(1))
                                 .subscribe(
                                     isLoggedIn => {
                                         if(!isLoggedIn){
                                             router.navigate(['login'])
                                         }
                                         return isLoggedIn
                                     }
                                 )
}