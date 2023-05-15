import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewGroupPage } from './add-new-group.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewGroupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewGroupPageRoutingModule {}
