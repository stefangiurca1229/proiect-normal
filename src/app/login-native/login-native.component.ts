import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '../services/firebaseAuth.service';

@Component({
  selector: 'app-login-native',
  templateUrl: './login-native.component.html',
  styleUrls: ['./login-native.component.scss'],
})
export class LoginNativeComponent  implements OnInit {

  constructor(
    private firebaseAuthService: FirebaseAuthService,
    private router: Router
  ) { }

  ngOnInit() {}

  login(userDetails: any){
    this.firebaseAuthService.registerNewUserWithEmailAndPwd(userDetails.email,userDetails.password)
    this.router.navigate(['home'])
  }

}
