import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { LoginPage} from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ViewPage} from '../pages/view/view';

import {MenuPage} from '../pages/menu/menu';
import { StatusBar } from '@ionic-native/status-bar';
import {CategoryPage} from '../pages/category/category';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ServiceguyPage } from '../pages/serviceguy/serviceguy';
import {  FirebaseListObservable } from "angularfire2/database-deprecated";
import { Service2Page } from '../pages/service2/service2';

import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';


import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

const firebaseauth = {
  apiKey: "AIzaSyCnBowMx7-E0Vuh3lUJNUikPqC1BzaqT94",
  authDomain: "bae-855d5.firebaseapp.com",
  databaseURL: "https://bae-855d5.firebaseio.com",
  projectId: "bae-855d5",
  storageBucket: "",
  messagingSenderId: "878816445628"
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    SettingsPage,
    LoginPage,
    Service2Page,
    RegisterPage,
    ServiceguyPage,
    ViewPage,
    ContactPage,
    MenuPage,
    CategoryPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseauth),
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    Service2Page,
    ContactPage,
    HomePage,
    MenuPage,
    ServiceguyPage,
    CategoryPage,
    SettingsPage,
    ViewPage,
    LoginPage,
    RegisterPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    AngularFireDatabase,
    AngularFireDatabaseModule,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
