import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import {  FirebaseListObservable } from "angularfire2/database-deprecated";
import { TabsPage} from '../tabs/tabs'
import { ViewPage} from '../view/view'
import { Storage } from '@ionic/storage';

import { ActionSheetController } from 'ionic-angular'

import {  AngularFireDatabaseModule,AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import {listitems}  from '../../models/listitems.interface'
import { Observable } from 'rxjs/Observable';
import { MessagePage } from "../message/message";

import { LPage}  from '../l/l'

 
/**
 * Generated class for the Service2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-service2',
  templateUrl: 'service2.html',
})
export class Service2Page {

  items$: Observable<any[]>;
  user:any;
  ifer:any

  constructor(public actionSheetCtrl: ActionSheetController,private database: AngularFireDatabase,public navParams: NavParams,public navCtrl: NavController,private auth:AngularFireAuth,private storage: Storage) {
     var vawr =''
    //  alert(navParams.get('data'))
    this.ifer=false
    if (navParams.get('data')) {
          //  vawr=navParams.get('data')
          // alert(navParams.get('data').name)
           this.items$ = this.database.list('categories/',ref=>ref.orderByChild('person').equalTo(navParams.get('data').name)).valueChanges();;
            this.user = navParams.get('data')
   }
    else{
      vawr=this.auth.auth.currentUser.uid
      this.ifer=true
      this.items$ = this.database.list('categories/',ref=>ref.orderByChild('personID').equalTo(vawr)).valueChanges();;
      this.user =this.database.object('/profile/'+vawr).valueChanges();
    }
       
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CategoryPage');
  }

  next(x){
    this.navCtrl.push(ViewPage,{
      data:x
    })
}
  
moveto(x){
  this.navCtrl.push(ViewPage,{
    data:x
  })
}



gotomessage(x) {
  // alert
  this.storage.get('name').then((val) => {
  if (val=='not') {
    this.navCtrl.push(MessagePage, {
      data:  this.navParams.get('data')
    })

  }
  else{
    this.navCtrl.push(LPage, {
      s:  this.navParams.get('data')
    })
  }
  });
  
}


presentActionSheet(x) {
  let actionSheet = this.actionSheetCtrl.create({
    title: x.name,
    buttons: [
      {
        text: 'delete',
         handler: () => {
           alert(x.key)
          this.database.list('categories/'+x.key).remove()
        }
      },
      {
        text: 'view',
        handler: () => {
          this.moveto(x)
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
  });

  actionSheet.present();
}


}
