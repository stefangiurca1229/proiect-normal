import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewGroupPageRoutingModule } from './add-new-group-routing.module';

import { AddNewGroupPage } from './add-new-group.page';
import { SharedModule } from '../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AddNewGroupPageRoutingModule
  ],
  declarations: [AddNewGroupPage],
})
export class AddNewGroupPageModule {}
