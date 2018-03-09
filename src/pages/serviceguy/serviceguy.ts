import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import { TabsPage} from '../tabs/tabs'
import {  AngularFireDatabaseModule,AngularFireDatabase} from 'angularfire2/database';

/**
 * Generated class for the ServiceguyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-serviceguy',
  templateUrl: 'serviceguy.html',
})
export class ServiceguyPage {

  @ViewChild('email')  email;
  @ViewChild('password')  password;
  @ViewChild('name') name;
  @ViewChild('category') category
  @ViewChild('short') short
  @ViewChild('number') number

  constructor(private af:AngularFireDatabase,private alertCtrl:AlertController ,private fire:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceguyPage');
  }



  registerUser(){
    console.log(this.email.value)
    console.log(this.password.value)
    console.log(this.name.value)
    console.log(this.category.value)
    console.log(this.short.value)
    this.fire.auth.createUserAndRetrieveDataWithEmailAndPassword( this.email.value , this.password.value ).then(
      data=>{
        console.log('logged in')
        console.log(data)
        this.updateuser(data.user)
      }
    ).catch(error=>{
      alert(error.message)
      console.log('got an error',error)
    })
  }


  alert(title,subTitle){
    this.alertCtrl.create({
     title: title,
     subTitle: subTitle,
     buttons: ['OK']
   }).present();
   
 }


 updateuser(user){
  var userId = user.uid;
  this.fire.auth.currentUser.updateProfile({
    displayName:this.name.value,
    photoURL:'08039965865'
  })
  this.af.object('profile/'+user.uid).set({
    category:this.category.value,
    short:this.short.value, 
    name:this.name.value,
    email:this.email.value,
    number:this.number.value,
    rating:0
  }).
  then(()=>{
    console.log('logged in')
    this.alert('welcome' , 'you just logged in '+this.fire.auth.currentUser.email)
    this.navCtrl.setRoot(TabsPage)
  })
 }

}
