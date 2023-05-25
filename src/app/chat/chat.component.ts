import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IMessage } from '../interfaces/IMessage';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent  implements OnInit {

  public groupName: string = ""
  public message: string = ""
  public userName: string | undefined;
  public chatMessages: IMessage[] | undefined
  public newUser: string = ""

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService
  ) { }

  submit(){
    console.log(this.message)
    this.chatService.publishMessage(this.message)
    this.message=""
  }

  ngOnInit() {

    

    this.route.queryParams
              .subscribe(
                (chat: any) =>{
                  // console.log(chat)
                  this.groupName = chat.groupName
                  this.chatService.getChatUid(chat.groupName)
                  // this.chatService.groupChatUid
                  //                 .subscribe(
                  //                   (chatUid: string | undefined) =>{
                  //                     console.log(chatUid)
                  //                     if(chatUid){
                  //                       this.chatService.getChatMessages(chatUid)
                  //                                     .pipe(take(1))
                  //                                     .subscribe(
                  //                                       (chat) =>{
                  //                                         console.log(chat)
                  //                                       }
                  //                                     )
                  //                     }else{
                  //                       this.groupName = "you don't have access to this group"
                  //                       console.log(undefined)
                  //                     }
                  //                   }
                  //                 )
                }
              )
  this.chatService.messages
                      .subscribe(
                        (messages: IMessage[] | undefined) => {
                          this.chatMessages = messages
                        }
                      )

  this.chatService.userName
                          .subscribe(
                            (userName: string | undefined) => {
                              this.userName = userName
                            }
                          )
  }

  addNewUser(){
    this.chatService.addUserToGroup(this.newUser,this.groupName)
    this.newUser = ""
  }

}
