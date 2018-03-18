import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {  AngularFireDatabaseModule,AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth'
import { Service2Page} from '../service2/service2'
import { Observable } from 'rxjs/Observable';
import {CategoryPage} from '../category/category'
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {

  profiledata:any
  item: Observable<any>;

  constructor(private fire:AngularFireAuth,private af:AngularFireDatabase,public navCtrl: NavController,private storage: Storage) {

      // console.log('/profile/' +this.fire.auth.currentUser.uid)
      // this.item =this.af.object('/profile/'+this.fire.auth.currentUser.uid).valueChanges();
      //   console.log(this.profiledata)
      // if (this.profiledata.category) {
      //   // service provider
      //   this.navCtrl.setRoot(Service2Page)
      // } 

      storage.set('name', 'not');


      var g= this.af.object('profile/'+this.fire.auth.currentUser.uid)
      this.item =  g.valueChanges();
      
      g.snapshotChanges().subscribe(action => {
        console.log(action.type);
        console.log(action.key)
        console.log(action.payload.val())
        storage.set('username',action.payload.val().name );
        if (action.payload.val().category) {
          //seller direct to uploag
          if (action.payload.val().category.length>0) {
            //seller direct to uploag
            storage.set('name', 'provider');
           
                    this.navCtrl.setRoot(Service2Page)
          }
        }

      });


  }

  moveto(x){
        this.navCtrl.push(CategoryPage,{
          data:x
        })
  }


}
