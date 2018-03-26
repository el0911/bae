import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth'
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UploadPage } from "../upload/upload";
import { SettingsPage } from '../settings/settings';
import { Storage } from '@ionic/storage';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = UploadPage;
  tab3Root = ContactPage;
  user:any
  name:String
  email:String
  number:String
  checker:any
  checker2:any


  constructor(private fire:AngularFireAuth,private naver:NavController,public storage:Storage ) {

     this.checker=false
     this.checker2=false

     this.storage.get('name').then((val) => {
       if (val!='not') {
        this.checker=true
        this.checker2=true
       }
       else{
        this.checker2=true
       }
       this.checker2=true
     })


    //  this.checker2=true


    this.user=fire.auth.currentUser
  
   if ((this.user)) {
    this.name =this.user.name
    this.email = this.user.email
    this.number = this.user.number
   }
  }

  u(){
    this.naver.push(UploadPage)
  }
}
