import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService } from './services/firebaseAuth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private firebaseAuth: FirebaseAuthService,
    private router: Router
  ) {}

  createGroup(){
   this.router.navigate(['addGroup'])
  }

  goHome(){
    this.router.navigate(['home'])
  }

  signOut(){
    this.firebaseAuth.signOut()
  }
}
