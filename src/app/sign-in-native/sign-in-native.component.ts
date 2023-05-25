import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '../services/firebaseAuth.service';

@Component({
  selector: 'sign-in-native-proiect',
  templateUrl: './sign-in-native.component.html',
  styleUrls: ['./sign-in-native.component.scss'],
})
export class SignInNativeComponent{

  constructor(
    private firebaseAuthService: FirebaseAuthService,
    private router: Router
  ) { }

  signIn(userDetails: any){
    this.firebaseAuthService.AuthLoginNative(userDetails.email,userDetails.password)
    this.router.navigate(['home'])
  }

  goLogin(){
    this.router.navigate(['login-mobile'])
  }

}
