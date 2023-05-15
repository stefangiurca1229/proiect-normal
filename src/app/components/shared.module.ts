import { NgModule } from "@angular/core";
import { ButtonProiectComponent } from "./button-proiect/button-proiect.component";
import { SigninMobileProiectComponent } from "./signin-mobile-proiect/signin-mobile-proiect.component";

@NgModule({
    declarations: [
        SigninMobileProiectComponent,
        ButtonProiectComponent
    ],
    exports: [
        SigninMobileProiectComponent,
        ButtonProiectComponent
    ]
})
export class SharedModule{}