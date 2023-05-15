import { inject } from "@angular/core"
import { Platform } from "@ionic/angular"

export const isMobileApp = () => {
    const platform  = inject(Platform)
    return platform.is('android') || platform.is('ios')
}