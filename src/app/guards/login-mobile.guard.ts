import { inject } from "@angular/core"
import { Router } from "@angular/router"
import { Platform } from "@ionic/angular"

export const isMobileApp = () => {
    const platform  = inject(Platform)
    return platform.is('android') || platform.is('ios')
}
export const isNotMobile = () => {
    const platform  = inject(Platform)
    const router = inject(Router)

    console.log("platform is: ", platform.is('android') || platform.is('ios'))

    if((platform.is('android') || platform.is('ios'))){
        router.navigate(['signIn-mobile']);
        return false
    }
    return true
}