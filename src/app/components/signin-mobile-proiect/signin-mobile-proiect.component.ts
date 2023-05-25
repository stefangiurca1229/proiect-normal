import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseAuthService } from 'src/app/services/firebaseAuth.service';

@Component({
  selector: 'signin-mobile-proiect',
  templateUrl: './signin-mobile-proiect.component.html',
  styleUrls: ['./signin-mobile-proiect.component.scss'],
})
export class SigninMobileProiectComponent {

  @Output() public authUser: EventEmitter<any> = new EventEmitter<any>();

  public email: string = ""
  public password: string = ""

  constructor(
    private firebaseAuthService: FirebaseAuthService
  ) { }

  // submit(){
  //   this.firebaseAuthService.AuthLoginNative("giurcastefan21@gmail.com","12345678")
  // }

  // registerUser(){
  //   this.firebaseAuthService.registerNewUserWithEmailAndPwd("giurcastefan21@gmail.com","12345678")
  // }

  submit(){
    this.authUser.emit({
      email: this.email,
      password: this.password
    })
  }

  checkStatus(){
    this.firebaseAuthService.getLoginStatus()
                            .subscribe(
                              res => console.log(res)
                            )
  }

}
