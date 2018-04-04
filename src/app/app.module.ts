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
// import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';

import { LPage}  from '../pages/l/l'
import { MessagePage} from '../pages/message/message';

import {MenuPage} from '../pages/menu/menu';
import {Camera, CameraOptions} from "@ionic-native/camera"

import { StatusBar } from '@ionic-native/status-bar';
import {CategoryPage} from '../pages/category/category';
import { ServiceguyPage } from '../pages/serviceguy/serviceguy';
import {  FirebaseListObservable } from "angularfire2/database-deprecated";
import { Service2Page } from '../pages/service2/service2';
import { IonicStorageModule } from '@ionic/storage';
import { UploadPage  } from "../pages/upload/upload";

import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { File } from '@ionic-native/File';


import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

const firebaseauth = {
  apiKey: "AIzaSyCnBowMx7-E0Vuh3lUJNUikPqC1BzaqT94",
  authDomain: "bae-855d5.firebaseapp.com",
  databaseURL: "https://bae-855d5.firebaseio.com",
  projectId: "bae-855d5",
  storageBucket: "gs://bae-855d5.appspot.com/",
  messagingSenderId: "878816445628"
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    SettingsPage,
    LoginPage,
    
    Service2Page,
    LPage,
    RegisterPage,
    ServiceguyPage,
    UploadPage,
    ViewPage,
    ContactPage,
    MenuPage,
    MessagePage,
    CategoryPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseauth),
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MessagePage,
    AboutPage,
    Service2Page,
    ContactPage,
    HomePage,
    LPage,
    MenuPage,
    ServiceguyPage,
    UploadPage,
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
    // AngularFireStorage,
    File,
    AngularFireDatabaseModule,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
