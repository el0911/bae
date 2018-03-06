import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import {  FirebaseListObservable } from "angularfire2/database-deprecated";
import { TabsPage} from '../tabs/tabs'
import { ViewPage} from '../view/view'
import {  AngularFireDatabaseModule,AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import {listitems}  from '../../models/listitems.interface'
import { Observable } from 'rxjs/Observable';
 
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
  user: Observable<any>;

  constructor(private database: AngularFireDatabase,public navParams: NavParams,public navCtrl: NavController) {
       this.items$ = this.database.list('categories/',ref=>ref.orderByChild('personID').equalTo('0LOImiwaBPZvRJua0Me5sKTUWeS2')).valueChanges();;
          this.user =this.database.object('/profile/'+navParams.get('data')).valueChanges();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CategoryPage');
  }

  next(x){
    this.navCtrl.push(ViewPage,{
      data:x
    })
}
  
 
}