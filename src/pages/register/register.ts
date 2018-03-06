import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import { TabsPage} from '../tabs/tabs'
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  @ViewChild('username') user;
  @ViewChild('password') password;

  constructor(private alertCtrl:AlertController ,private fire:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  registerUser(){
    this.fire.auth.createUserAndRetrieveDataWithEmailAndPassword( this.user.value , this.password.value ).then(
      data=>{
        console.log('logged in')
        this.alert('welcome' , 'you just logged in '+this.fire.auth.currentUser.email)
        this.navCtrl.setRoot(TabsPage)
      }
    ).catch(error=>{
      console.log('got an error')
    })
  }


  alert(title,subTitle){
    this.alertCtrl.create({
     title: title,
     subTitle: subTitle,
     buttons: ['OK']
   }).present();
   
 }

}
