import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import { FirebaseListObservable } from "angularfire2/database-deprecated";
import { TabsPage } from '../tabs/tabs'
import { Service2Page } from '../service2/service2'

import { ViewPage } from '../view/view'
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { listitems } from '../../models/listitems.interface'
import { Observable } from 'rxjs/Observable';

/**
 * 
 */
@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})

export class CategoryPage {

  shoppingListRef$: Observable<any[]>;
  catstuff:any

  constructor(private database: AngularFireDatabase, public navParams: NavParams, public navCtrl: NavController) {
    this.catstuff=navParams.get('data')
    // alert(this.catstuff)
    this.shoppingListRef$ = this.database.list('profile/', ref => ref.orderByChild('cat').equalTo(this.catstuff)).valueChanges();;
    console.log(this.shoppingListRef$)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }

  next(x) {
    this.navCtrl.push(Service2Page, {
      data: x
    })
  }


}
