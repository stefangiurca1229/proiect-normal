import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from 'src/app/services/firebaseAuth.service';

@Component({
  selector: 'signin-mobile-proiect',
  templateUrl: './signin-mobile-proiect.component.html',
  styleUrls: ['./signin-mobile-proiect.component.scss'],
})
export class SigninMobileProiectComponent  implements OnInit {

  constructor(
    private firebaseAuthService: FirebaseAuthService
  ) { }

  ngOnInit() {}

  submit(){
    this.firebaseAuthService.AuthLoginNative("giurcastefan21@gmail.com","12345678")
  }

  registerUser(){
    this.firebaseAuthService.registerNewUserWithEmailAndPwd("giurcastefan21@gmail.com","12345678")
  }

  checkStatus(){
    this.firebaseAuthService.getLoginStatus()
                            .subscribe(
                              res => console.log(res)
                            )
  }

}
