import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { ViewChild } from '@angular/core'
import { Nav } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
 // import this, duh
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {CategoryPage} from '../pages/category/category';
import {Service2Page} from '../pages/service2/service2';

import { TabsPage } from '../pages/tabs/tabs';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import  {MenuPage}  from '../pages/menu/menu';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;
  user:any
  name:String
  email:String
  number:String

  constructor(public platform: Platform, private fire:AngularFireAuth, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an e xample of ngFor and navigation
    this.pages = [
      { title: 'Home', component: TabsPage },
      { title: 'List', component: TabsPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
