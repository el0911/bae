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

  img:any
  private basePath: string = '/avatarPicture';

  @ViewChild('password') pass

  constructor(private camera: Camera, public platform:Platform,public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, public storage: Storage, public fire: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }


 
}
