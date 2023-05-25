import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginNativeComponent } from './login-native.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../components/shared.module';
import { FormsModule } from '@angular/forms';
import { SignInNativeComponent } from '../sign-in-native/sign-in-native.component';
import { SigninMobileProiectComponent } from '../components/signin-mobile-proiect/signin-mobile-proiect.component';



@NgModule({
  declarations: [
    LoginNativeComponent,
    // SigninMobileProiectComponent
  ],
  imports: [
    FormsModule,
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
