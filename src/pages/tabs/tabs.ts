import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth'

import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SettingsPage;
  tab3Root = ContactPage;
  user:any
  name:String
  email:String
  number:String

  constructor(private fire:AngularFireAuth, ) {

    this.user=fire.auth.currentUser
  
   if ((this.user)) {
    this.name =this.user.name
    this.email = this.user.email
    this.number = this.user.number
   }
  }
}
