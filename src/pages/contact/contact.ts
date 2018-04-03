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
import { File } from '@ionic-native/File';

declare var window: any;

import * as firebase from 'firebase/app';
import 'firebase/storage';


import { storage } from 'firebase'

import { LPage } from '../l/l'

import { LoginPage } from '../login/login'



@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  image: any
  uploadimg: any
  shower:boolean
  img: any
  private basePath: string = '/avatarPicture';

  parseUpload: any
  @ViewChild('password') pass

  constructor(private file: File, public platform: Platform, public afA: AngularFireAuth, private camera: Camera, public alertCtrl: AlertController, public navctrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, public storage: Storage, public fire: AngularFireAuth) { 

      this.shower=false

      this.storage.get('name').then((val) => {
        if (val!='not') {
         this.shower=true
        }
        else{
        //  this.checker2=true
        }
       
      })
 

  }


  logout() {
    this.afA.auth.signOut().then(() => {
      alert('logged out')
      window.location.reload();

    });
  }

  change() {

    this.afA.auth.currentUser.updatePassword(this.pass.value).then(function () {
      alert('sucess changes password')
    }).catch(function (error) {
      alert(error.message)
    });
  }

  buf(x) {
    this.file.readAsArrayBuffer(x, 'name').then(async (buffer) => {
      await this.uo(buffer, name)
    }).then((err) => {
      alert(JSON.stringify(err))
      alert(err)
    })
  }

  async uo(buffer, name) {
    alert(name)
    let blob = new Blob([buffer], { type: 'type/jpeg' })
    let store = firebase.storage();
    store.ref('image/' + name).put(blob).then((d) => {
      alert('done')
    }).then(() => {

    }).then((err) => {
      alert(JSON.stringify(err))
      alert(err)
    })
  }

  takePicture() {
    alert('please wait')
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
      // alert('file uploaded successfully  ' + uploadSnapshot.downloadURL);
      this.savetofirebase(uploadSnapshot.downloadURL);//store reference to storage in database
    }).then((_uploadSnapshot: any) => {
      alert('file saved to asset catalog successfully  ');
    }, (_error) => {
      alert('Error ' + (_error.message || _error));
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
    alert('please wait')
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
        // alert('file uploaded successfully  ' + uploadSnapshot.downloadURL);
        this.savetofirebase(uploadSnapshot.downloadURL);//store reference to storage in database


      }).then((_uploadSnapshot: any) => {
        alert('file saved to asset catalog successfully  ');
      }, (_error) => {
        alert('Error ' + (_error.message || _error));
      });

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


  savetofirebase(imgg) {
    
    this.database.object(`profile/` + this.afA.auth.currentUser.uid).update({
      img: imgg
    })

  }

}
