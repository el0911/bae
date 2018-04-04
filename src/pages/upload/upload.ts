import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import { FirebaseListObservable } from "angularfire2/database-deprecated";
import { TabsPage } from '../tabs/tabs'
import { ViewPage } from '../view/view'
import { Storage } from '@ionic/storage';

import { Camera, CameraOptions } from "@ionic-native/camera"
import { storage } from 'firebase'
import { Platform } from 'ionic-angular';

import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { listitems } from '../../models/listitems.interface'
import { Observable } from 'rxjs/Observable';
import { MessagePage } from "../message/message";
import { AlertController } from 'ionic-angular';

import { LPage } from '../l/l'

declare var window: any;

import * as firebase from 'firebase/app';
import 'firebase/storage';

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

  img: any
  private basePath: string = '/avatarPicture';

  @ViewChild('password') pass

  constructor(private camera: Camera, public platform: Platform, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, public storage: Storage, public fire: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }


  up() {
    // this.image = 'dd'
    if (this.image) {
      if (this.image.length > 0) {
        this.storage.get('username').then((val) => {

          let key = this.database.list('/categories/').push({

            'clap': 0,
            "name": this.name.value,
            'cat': this.category.value,
            'person': val,
            'img': this.image,
            'personID': this.fire.auth.currentUser.uid,
            'price': this.price.value,
            'short': this.short.value

          }).key

          this.database.object('/categories/' + key).update({
            'key': key
          }).then(() => {
            let alert = this.alertCtrl.create({
              title: 'New post uploaded',
              subTitle: 'Now can be seen in timeline',
              buttons: ['OK']
            });
            alert.present();
            this.name.value = ''
            this.category.value = ''
            this.image = ''
            this.price.value = ''
            this.short.value = ''
          })



        })
      }
      else {
        alert('pick image first')
      }
    }
    else {
      alert('pick image first')
    }

  }

  takephoto() {

    let alert = this.alertCtrl.create({
      title: 'choose ',
      message: 'Do you want to use camera or gallery?',
      buttons: [
        {
          text: 'camera',
          handler: () => {
            this.takePicture()
          }
        },
        {
          text: 'gallery',
          handler: () => {
            this.openGallery()
          }
        }
      ]
    });
    alert.present();


  }


  openGallery() {
    let base64Image = null
    let cameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    }

    this.camera.getPicture(cameraOptions).then((file_uri) => {

      //add photo to the array of photos
      base64Image = file_uri
      this.img = base64Image
      this.makeFileIntoBlob(base64Image).then((imageBlob) => {
        // alert('got image blob ' + imageBlob);
        return this.uploadToFirebase(imageBlob);//upload the blob
      }).then((uploadSnapshot: any) => {
        alert('file uploaded successfully  ' + uploadSnapshot.downloadURL);
        //  this.savetofirebase(uploadSnapshot.downloadURL);//store reference to storage in database
        this.image = uploadSnapshot.downloadURL

      }).then((_uploadSnapshot: any) => {
        // alert('file saved to asset catalog successfully  ');
      }, (_error) => {
        alert('Error ' + (_error.message || _error));
      });

    }, (error) => {
      console.debug("Unable to obtain picture: " + error, "app");
      console.log(error);
    });
  }



  takePicture() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.platform.is('ios') ? this.camera.DestinationType.FILE_URI : this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imagePath) => {
      // alert('got image path ' + imagePath);
      return this.makeFileIntoBlob(imagePath);//convert picture to blob
    }).then((imageBlob) => {
      // alert('got image blob ' + imageBlob);
      return this.uploadToFirebase(imageBlob);//upload the blob
    }).then((uploadSnapshot: any) => {
      alert('file uploaded successfully  ' + uploadSnapshot.downloadURL);
      this.image = uploadSnapshot.downloadURL;//store reference to storage in database
    }).then((_uploadSnapshot: any) => {
      // alert('file saved to asset catalog successfully  ');
    }, (_error) => {
      alert('Error ' + (_error.message || _error));
    });

  }


  uploadToFirebase(imgBlob: any) {
    var randomNumber = Math.floor(Math.random() * 256);
    console.log('Random number : ' + randomNumber);
    return new Promise((resolve, reject) => {
      let storageRef = firebase.storage().ref(this.basePath + randomNumber + '.jpg');//Firebase storage main path
      let metadata: firebase.storage.UploadMetadata = {
        contentType: 'image/jpeg',
      };

      let uploadTask = storageRef.put(imgBlob, metadata);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          // upload in progress
          // let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          // console.log(progress);
        },
        (error) => {
          // upload failed
          console.log(error);
          reject(error);
        },
        () => {
          // upload success
          let url = uploadTask.snapshot.downloadURL
          console.log('Saved picture url', url);
          resolve(uploadTask.snapshot);
        });
    });
  }


  makeFileIntoBlob(_imagePath) {
    return new Promise((resolve, reject) => {
      window.resolveLocalFileSystemURL(_imagePath, (fileEntry) => {
        this.img = _imagePath
        fileEntry.file((resFile) => {

          var reader = new FileReader();
          reader.onloadend = (evt: any) => {
            var imgBlob: any = new Blob([evt.target.result], { type: 'image/jpeg' });
            imgBlob.name = 'sample.jpg';
            resolve(imgBlob);
          };

          reader.onerror = (e) => {
            console.log('Failed file read: ' + e.toString());
            reject(e);
          };

          reader.readAsArrayBuffer(resFile);
        });
      });
    });
  }

  // savetofirebase(imgg){
  //   alert(imgg)
  //   alert( this.afA.auth.currentUser.uid)
  //   this.database.object(`profile/`+this.afA.auth.currentUser.uid).update({
  //     img:imgg
  //   })

  // }

}
