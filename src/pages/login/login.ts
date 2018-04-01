import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import { viewClassName } from '@angular/compiler';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { ServiceguyPage } from '../serviceguy/serviceguy';



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('username') user;
  @ViewChild('password') password;


  constructor(private alertCtrl:AlertController, private fire:AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signinuser(){
    this.fire.auth.signInWithEmailAndPassword( this.user.value ,this.password.value).then(
      data=>{
        console.log('user logged in ',data)
        this.alert('welcome' , 'you just logged in '+this.fire.auth.currentUser.email)
        this.navCtrl.setRoot(TabsPage)
      }
    ).catch(
      error=>{
        console.log('error',error)
        this.alert('their is a problem',error.message)
      }
    )
  }

  gotosignup(){
    this.navCtrl.setRoot(RegisterPage)
  }

  gototservice(){
    this.navCtrl.setRoot(ServiceguyPage)
  }

  alert(title,subTitle){
     this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    }).present();
    
  }

  resetPassword(email: string): Promise<void> {
    return this.fire.auth.sendPasswordResetEmail(email);
  }

  forgotpassword() {
    let alert = this.alertCtrl.create({
      title: 'forgotten password',
      inputs: [
       {
          name: 'email',
          placeholder: 'email',
         }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'reset',
          handler: data => {
            this.resetPassword(data.email)
          }
        }
      ]
    });
    alert.present();
  }

}
