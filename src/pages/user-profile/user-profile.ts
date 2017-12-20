import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth.service';
import { Component } from '@angular/core';
import { UserProvider } from './../../providers/user.service';
import { User } from '../../models/user.model';

import * as firebase from 'firebase/app';

@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  currentUser: User;
  canEdit: boolean = false;
  uploadProgress: number;
  private filePhoto: File;

  constructor(
    public authProvider: AuthProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userProvider: UserProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authProvider.authenticated;
  }

  ionViewDidLoad() {
    this.userProvider.currentUser.valueChanges().subscribe((user: User) => {
      this.currentUser = user; 
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    
    if (this.filePhoto) {

      let uploadTask = this.userProvider.uploadPhoto(this.filePhoto, this.currentUser.$key);
      this.presentToastorAlert('Upload da Foto','Aguarde enquanto estamos enviado a foto','toast');
      uploadTask.on('state_changed', (snapshot: firebase.storage.UploadTaskSnapshot) => {
        
          this.uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        
       }, (error: Error) => {
         // catch error
         this.presentToastorAlert('Upload da Foto','Erro ao enviar a foto','alert');

       });

       uploadTask.then((UploadTaskSnapshot: firebase.storage.UploadTaskSnapshot) => {
         this.editUser(uploadTask.snapshot.downloadURL);
         this.presentToastorAlert('Upload da Foto','Foto enviada','toast',2000);
      });

    } else {
      this.editUser();
    }

  }

  onPhoto(event): void {  
    this.filePhoto = event.target.files[0];
  }

  private editUser(photoUrl?: string): void {
    this.userProvider
      .edit({
        name: this.currentUser.name,
        username: this.currentUser.username,
        photo: photoUrl || this.currentUser.photo || ''
      }).then(() => {
        this.canEdit = false;
        this.filePhoto = undefined;
        this.uploadProgress = 0;
      });
  }

  presentToastorAlert( title: string, msg: string,type: string, tempoToast: number = 3000) {
    if(type=='toast') {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: tempoToast,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();

  } else if(type=="alert") {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['OK']
    });

    alert.present();

  }

  
  }

}
