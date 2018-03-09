import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import {  FirebaseListObservable } from "angularfire2/database-deprecated";
import { TabsPage} from '../tabs/tabs'
import {Service2Page} from '../service2/service2'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { ViewPage} from '../view/view'
import {  AngularFireDatabaseModule,AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import {listitems}  from '../../models/listitems.interface'
import { Observable } from 'rxjs/Observable';
 
/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()  
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export interface Item { name: string; }

export class CategoryPage {

  shoppingListRef$: Observable<any[]>;
  private itemsCollection: AngularFirestoreCollection<any>;
    items: Observable<Item[]>;

  constructor(private database: AngularFireDatabase,public navParams: NavParams,public navCtrl: NavController,private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>('items');
    this.items = this.itemsCollection.valueChanges();
       this.shoppingListRef$ = this.database.list('categories/',ref=>ref.orderByChild('cat').equalTo(navParams.get('data'))).valueChanges();;
        
      }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }

  next(x){
    this.navCtrl.push(Service2Page,{
      data:x
    })
}


highfive(x){

this.database.object(`categories/`+x.name).update({
    clap:x.claps+1}).then(res => {
    console.log(res)
})
}

  
 
}
