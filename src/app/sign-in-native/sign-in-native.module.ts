import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInNativeComponent } from './sign-in-native.component';
import { ButtonProiectComponent } from '../components/button-proiect/button-proiect.component';
import { SigninMobileProiectComponent } from '../components/signin-mobile-proiect/signin-mobile-proiect.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../components/shared.module';



@NgModule({
  declarations: [
    SignInNativeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: SignInNativeComponent,
        pathMatch: 'full'
      }
    ])
  ]
})
export class SignInNativeModule { }
