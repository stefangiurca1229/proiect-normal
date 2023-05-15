import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginNativeComponent } from './login-native.component';
import { SigninMobileProiectComponent } from '../components/signin-mobile-proiect/signin-mobile-proiect.component';
import { ButtonProiectComponent } from '../components/button-proiect/button-proiect.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../components/shared.module';



@NgModule({
  declarations: [
    LoginNativeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginNativeComponent,
        pathMatch: 'full'
      }
    ])
  ]
})
export class LoginNativeModule { }
