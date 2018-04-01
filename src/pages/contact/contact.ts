import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import { FirebaseListObservable } from "angularfire2/database-deprecated";
import { TabsPage } from '../tabs/tabs'
import { ViewPage } from '../view/view'
import { Storage } from '@ionic/storage';

// import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';

import { normalizeURL } from 'ionic-angular';
import { Camera, CameraOptions } from "@ionic-native/camera"

import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { listitems } from '../../models/listitems.interface'
import { Observable } from 'rxjs/Observable';
import { MessagePage } from "../message/message";
import { AlertController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import firebase from 'firebase';

import { File } from '@ionic-native/File';


import { storage } from 'firebase'

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

  constructor(private file: File,public platform:Platform,public afA: AngularFireAuth,private camera: Camera, public alertCtrl: AlertController, public navctrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, public storage: Storage, public fire: AngularFireAuth){}


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

buf(x){
  this.file.readAsArrayBuffer(x,'name').then( async (buffer)=>{
      await this.uo(buffer,name)
  })
}

async uo(buffer,name){
  let blob =new Blob([buffer],{type:'type/jpeg'})
  let store = firebase.storage();
  store.ref('image/'+name).put(blob).then((d)=>{
    alert('done')
  }).then(()=>{
    
  })
}

takePicture() {

  const options: CameraOptions = {
    quality: 100,
    destinationType: this.platform.is('ios') ? this.camera.DestinationType.FILE_URI : this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {

    let base64Image = null;

    //get photo from the camera based on platform type
    if (this.platform.is('ios'))
      base64Image = normalizeURL(imageData);
    else
      base64Image = "data:image/jpeg;base64," + imageData;

        alert(base64Image)
        alert('new')

        let storageRef = firebase.storage().ref();
        // Create a timestamp as filename
        const filename = Math.floor(Date.now() / 1000);
    
        // Create a reference to 'images/todays-date.jpg'
        const imageRef = storageRef.child(`images/${filename}.jpg`);

        imageRef.putString(base64Image, firebase.storage.StringFormat.DATA_URL)
        .then((snapshot)=> {
          this.database.object('profile/'+this.afA.auth.currentUser.uid).update({
            img:snapshot
          }).then(()=>{
            this.showSuccesfulUploadAlert();
          })
     });
    
    //add photo to the array of photos
    // this.addPhoto(base64Image);

  }, (error) => {
    console.debug("Unable to obtain picture: " + error, "app");
    console.log(error);
  });
}

showSuccesfulUploadAlert() {
  let alert = this.alertCtrl.create({
    title: 'Uploaded!',
    subTitle: 'Profile changed',
    buttons: ['OK']
  });
  alert.present();
  // clear the previous photo data in the variable
  
}

openGallery() {
  let base64Image =null
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
    base64Image = normalizeURL(file_uri)
    this.buf(base64Image)

  }, (error) => {
    console.debug("Unable to obtain picture: " + error, "app");
    console.log(error);
  });
}

async takephoto() {

  // try {

  //   const options: CameraOptions = {
  //     quality: 50,
  //     targetHeight: 600,
  //     targetWidth: 600,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   }

  //   this.camera.getPicture(options).then((imageData) => {

  //     this.image = 'data:image/jpeg;base64,' + imageData;
  //     alert(this.image)
  //     let parseUpload = this.sstorage.ref('filePath').putString(this.image, 'data_url');
  //     parseUpload.downloadURL
  //     alert(parseUpload.downloadURL)

  //     this.database.object(`profile/` + this.afA.auth.currentUser.uid).update({
  //       img:parseUpload.downloadURL
  //     }).then(res => {
  //       console.log(res)
  //     })
  //     this.uploadimg =parseUpload.downloadURL

  //   }, (err) => {
  //     alert(err)
  //   });

  // } catch (error) {
  //   alert(error)
  // }


}

getimage() {
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

}
