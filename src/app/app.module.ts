import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';

// import { FirebaseAppModule } from "@angular/fire/app";
import { AngularFireModule } from "@angular/fire/compat";
import { ButtonProiectComponent } from './components/button-proiect/button-proiect.component';
import { SigninMobileProiectComponent } from './components/signin-mobile-proiect/signin-mobile-proiect.component';
import { SharedModule } from './components/shared.module';

// import { AngularFireAuthModule } from "@angular/fire/compat/auth";
// import { AngularFireDatabaseModule } from "@angular/fire/compat/database";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    SharedModule,
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule {}
