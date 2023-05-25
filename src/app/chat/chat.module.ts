import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../components/shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ChatComponent],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ChatComponent,
        pathMatch: 'full'
      }
    ])
  ]
})
export class ChatModule { }
