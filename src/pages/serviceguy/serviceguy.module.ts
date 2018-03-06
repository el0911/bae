import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceguyPage } from './serviceguy';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';

@NgModule({
  declarations: [
    ServiceguyPage,
  ],providers: [
     AngularFireDatabase,
   ],
  imports: [
    IonicPageModule.forChild(ServiceguyPage),
  ],
})
export class ServiceguyPageModule {}
