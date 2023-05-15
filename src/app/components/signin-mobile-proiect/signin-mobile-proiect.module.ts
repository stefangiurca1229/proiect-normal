import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ButtonProiectComponent } from "../button-proiect/button-proiect.component";
import { SigninMobileProiectComponent } from "./signin-mobile-proiect.component";

@NgModule({
    declarations: [
        SigninMobileProiectComponent,
        ButtonProiectComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: "",
                component: SigninMobileProiectComponent,
                pathMatch: 'full'
            }
        ])
    ]
})
export class SignInMobileProiectModule{
    
}