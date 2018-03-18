import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import { FirebaseListObservable } from "angularfire2/database-deprecated";
import { TabsPage } from '../tabs/tabs'
import { Service2Page } from '../service2/service2'
import { Storage } from '@ionic/storage';
import { MessagePage } from "../message/message";

import { ViewPage } from '../view/view'
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { listitems } from '../../models/listitems.interface'
import { Observable } from 'rxjs/Observable'; 

/**
 * Generated class for the LPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-l',
  templateUrl: 'l.html',
})

export class LPage {

  s;

  constructor(public database:AngularFireDatabase,public navCtrl: NavController,private storage: Storage, public navParams: NavParams,public fire:AngularFireAuth) {
     this.s = this.database.list('/chat/'+this.fire.auth.currentUser.uid).valueChanges()
    // this.message = this.navParams.get('message');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LPage');
  }

  next(x){
    this.navCtrl.push(MessagePage, {
      data:  x
    })
  }

}
