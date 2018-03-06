import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import {LoginPage} from '../login/login'

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {


  @ViewChild('password') pass

  constructor(public afA: AngularFireAuth,private navctrl:NavController){}


  logout(){
    this.afA.auth.signOut().then(() => {
       alert('logged out')
       this.navctrl.setRoot(LoginPage);
    });
}

change(){
 
  this.afA.auth.currentUser.updatePassword(this.pass.value).then(function () {
    alert('sucess changes password')
  }).catch(function(error) {
      alert(error.message)  
  });
}


}
