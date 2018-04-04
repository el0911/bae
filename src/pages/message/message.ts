import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import { FirebaseListObservable } from "angularfire2/database-deprecated";
import { TabsPage } from '../tabs/tabs'
import { Service2Page } from '../service2/service2'
import { Storage } from '@ionic/storage';

import { ViewPage } from '../view/view'
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { listitems } from '../../models/listitems.interface'
import { Observable } from 'rxjs/Observable'; 

/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

  @ViewChild('message') m
  username:   String=''
  s;

  constructor(public database:AngularFireDatabase,public navCtrl: NavController,private storage: Storage, public navParams: NavParams,public fire:AngularFireAuth) {
       this.username = this.navParams.get('data');
        
    this.storage.get('name').then((val) => {
      this.storage.get('username').then((val2) => {

      if (val=='not') //normal user
      {
        this.s = this.database.list('/chat/'+this.username+'/'+val2).valueChanges()

      }

      else{//provider
        this.s = this.database.list('/chat/'+this.fire.auth.currentUser.uid+'/'+navParams.get('data')).valueChanges()
      }
    })

  })

    
    // this.username = this.navParams.get('data');
    // this.s = this.database.list('/chat/'+this.fire.auth.currentUser.uid+'/'+navParams.get('data'),ref=>ref.orderByChild('username').equalTo(this.fire.auth.currentUser.uid)).valueChanges()
    // this.message = this.navParams.get('message');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
    // this.database.list('/chat').push({
    //   username:this.fire.auth.currentUser.uid,
    //   message:this.message.value
    // })
  }


  send(){
        this.username = this.navParams.get('data');

    this.storage.get('name').then((val) => {

      this.storage.get('username').then((val2) => {
        alert(val2)
        if (val=='not') //normal user
        {
          this.database.list('/chat/'+this.username+'/'+val2).push({
            username:this.fire.auth.currentUser.uid,
            message:this.m.value
          })
          // .then(()=>{
            this.m.value='' 
          // })


          this.database.object('/chat/'+this.username+'/'+val2).update({
             uid:val2
          })
  
        }
  
        else{//provider
       
          this.database.list('/chat/'+this.fire.auth.currentUser.uid+'/'+this.navParams.get('data')).push({
            username:this.fire.auth.currentUser.uid,
            message:this.m.value
          })
          // .then(()=>{
            this.m.value='' 
          // })
        }
      })

   

  })
    

  }

}
