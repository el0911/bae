


import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import { FirebaseListObservable } from "angularfire2/database-deprecated";

import 'rxjs/add/operator/take'

import { TabsPage } from '../tabs/tabs'
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { listitems } from '../../models/listitems.interface'
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




  rating:any
  item: any;
  constructor(public auth: AngularFireAuth, private database: AngularFireDatabase, public navParams: NavParams, public navCtrl: NavController) {
    // var g= this.database.object('profile/'+navParams.get('data'))
    // this.item =  g.valueChanges();

    // g.snapshotChanges().subscribe(action => {
    //   console.log(action.type);
    //   console.log(action.key)
    //   console.log(action.payload.val())
    // });


    this.item = navParams.get('data')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewPage');
  }


  highfive(x) {
 
    var g = this.database.list('/like/' + x.key,ref=>ref.orderByChild('likers').equalTo(this.auth.auth.currentUser.uid))
    //  this.item =  g.valueChanges();

    g.snapshotChanges().subscribe(action => {
        
       console.log(action)
       if (action.length==0) {
        this.database.object(`categories/` + x.key).update({
          clap: x.clap + 1
        }).then(res => {
          console.log(res)
        })

      // this.database.object(`profile/` + x.personID).snapshotChanges().subscribe(action => {
          
      //     this.rating=action.payload.val().rating

      // })


      this.add(x) 
       }
       else{
        // this.database.object(`categories/` + x.key).update({
        //   clap: x.clap - 1
        // }).then(res => {
        //   console.log(res)
        // })
        // this.sub(x)
       }
      
    });

  }


  sub(x){

  }

  add(x) {

    // this.database.object(`profile/` + x.personID).update({
    //   rating: this.rating + 1
    // }).then(res => {
     
    // })



    this.item.clap = this.item.clap + 1
    let key =      this.database.list('/like/' + x.key).push({
    
      'likers': this.auth.auth.currentUser.uid,
      // 'like__':x.key
      

    }).key

    // alert(key)
  }





}
