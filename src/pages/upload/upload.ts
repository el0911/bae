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
 
        if(1==1){
          if (1==1) {
            this.storage.get('username').then((val) => {

              let key =      this.database.list('/categories/').push({
        
                'clap': 0,
                "name": this.name.value,
                'cat': this.category.value,
                'person': val,
                // 'img': this.uploadimg,
                'personID': this.fire.auth.currentUser.uid,
                'price': this.price.value,
                'short': this.short.value
        
              }).key
        
              this.database.object('/categories/'+key).update({
                'key':key
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

  }

}
