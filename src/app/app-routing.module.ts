import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { isMobileApp } from './guards/login-mobile.guard';
import { getLoginStatus, getLoginStatusForLogin } from './guards/loginStatus.guard';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [getLoginStatus],
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'addGroup',
    canActivate: [getLoginStatus],
    loadChildren: () => import('./add-new-group/add-new-group-routing.module').then( m => m.AddNewGroupPageRoutingModule )
  },
  {
     path: 'login',
     canActivate: [getLoginStatusForLogin],
     loadChildren: () => import('./login/login.module').then( m => m.LoginModule)
  },
  {
   path: 'signIn-mobile',
   canActivate: [isMobileApp],
   loadChildren: () => import('./sign-in-native/sign-in-native.module').then( m => m.SignInNativeModule)
  },
  {
  path: 'login-mobile',
  canActivate: [isMobileApp],
  loadChildren: () => import('./login-native/login-native.module').then( m => m.LoginNativeModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'add-new-group',
    loadChildren: () => import('./add-new-group/add-new-group.module').then( m => m.AddNewGroupPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
