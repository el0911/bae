import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import { FirebaseListObservable } from "angularfire2/database-deprecated";
import { TabsPage } from '../tabs/tabs'
import { ViewPage } from '../view/view'
import { Storage } from '@ionic/storage';

import { Camera, CameraOptions } from "@ionic-native/camera"
import { storage } from 'firebase'

import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { listitems } from '../../models/listitems.interface'
import { Observable } from 'rxjs/Observable';
import { MessagePage } from "../message/message";
import { AlertController } from 'ionic-angular';

import { LPage } from '../l/l'

import {LoginPage} from '../login/login'

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  image: any
  uploadimg: any
  parseUpload: any
  @ViewChild('password') pass

  constructor(public afA: AngularFireAuth,private camera: Camera, public alertCtrl: AlertController, public navctrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, public storage: Storage, public fire: AngularFireAuth){}


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


async takephoto() {

  try {

    const options: CameraOptions = {
      quality: 50,
      targetHeight: 600,
      targetWidth: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {

      this.image = 'data:image/jpeg;base64,' + imageData;
      const picture = storage().ref('pictures')
      let parseUpload = picture.putString(this.image, 'data_url')

      alert(parseUpload.snapshot)

      this.database.object(`profile/` + this.afA.auth.currentUser.uid).update({
        img: parseUpload.snapshot
      }).then(res => {
        console.log(res)
      })
      this.uploadimg = parseUpload.snapshot

    }, (err) => {
      alert
    });

  } catch (error) {

  }


}

}
