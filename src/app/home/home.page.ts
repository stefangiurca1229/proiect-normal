import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ChatService } from '../services/chat.service';
import { FirebaseAuthService } from '../services/firebaseAuth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  chats: any[] = []

  constructor(
    private chatService: ChatService,
    private firebaseAuthService: FirebaseAuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.firebaseAuthService.getUserInfo()
      .pipe(take(1))
      .subscribe(
        (user: any) => {
          console.log(user)
          this.chatService.getUserChats(user.email)
            .pipe(take(1))
            .subscribe(
              (chats: any[]) =>{
                console.log(chats)
                this.chats = chats
              }
            )
        }
      )
  }

  openChat(chat: string){
    this.router.navigate(['chat'],{queryParams: {groupName: chat}})
  }

}
