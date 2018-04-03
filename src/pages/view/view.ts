


import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import {  FirebaseListObservable } from "angularfire2/database-deprecated";

import 'rxjs/add/operator/take'

import { TabsPage} from '../tabs/tabs'
import {  AngularFireDatabaseModule,AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import {listitems}  from '../../models/listitems.interface'
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the ViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
})
export class ViewPage {

  

  

  item:  any;
  constructor(public auth:AngularFireAuth,private database: AngularFireDatabase,public navParams: NavParams,public navCtrl: NavController) {
    // var g= this.database.object('profile/'+navParams.get('data'))
    // this.item =  g.valueChanges();

    // g.snapshotChanges().subscribe(action => {
    //   console.log(action.type);
    //   console.log(action.key)
    //   console.log(action.payload.val())
    // });
    

    this.item= navParams.get('data')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewPage');
  }


  highfive(x){
    alert(x.key)
     var g= this.database.list(`categories/` + x.key)
    //  this.item =  g.valueChanges();

    g.snapshotChanges().subscribe(action => {
      alert(x.name)
    //  this.add(x)
     alert(x.clap)
    console.log(x)
    this.database.object(`categories/` + x.key).update({
      clap: x.clap + 1
    }).then(res => {
      console.log(res)
    })
 
    });

  }

  add(x){
    alert(x.name)
    this.item.clap=this.item.clap+1
    var g= this.database.list(`categories/clappers`).push(this.auth.auth.currentUser)
  }

  
    


}
