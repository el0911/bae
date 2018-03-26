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


/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

  @ViewChild('name') name
  @ViewChild('price') price
  image: any
  uploadimg: any
  parseUpload: any
  @ViewChild('category') category
  @ViewChild('short') short

  constructor(private camera: Camera, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, public storage: Storage, public fire: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
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
        this.uploadimg = parseUpload.snapshot

      }, (err) => {
        alert
      });

    } catch (error) {

    }


  }

  up() {
    this.storage.get('username').then((val) => {

      this.database.list('/categories/').push({

        'clap': 0,
        "name": this.name.value,
        'cat': this.category.value,
        'person': val,
        // 'img': 'https://firebasestorage.googleapis.com/v0/b/bae-855d5.appspot.com/o/f4c80b96-a7c7-40d6-9921-0993e64225c9_1.4a3830f6dfd8c36c0b21b2d1fdad2261.jpeg?alt=media&token=0766664e-ccc3-475e-9ebb-cbb979e4a99f',
        'personID': this.fire.auth.currentUser.uid,
        'price': this.price.value,
        'short': this.short.value

      })


      let alert = this.alertCtrl.create({
        title: 'New post uploaded',
        subTitle: 'Now can be seen in timeline',
        buttons: ['OK']
      });
      alert.present();
    
    })
  }

}
