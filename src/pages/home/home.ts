import { ChatPage } from './../chat/chat';
import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { SignupPage } from './../signup/signup';
import { Observable } from 'rxjs/Observable';

import { AuthProvider } from './../../providers/auth.service';
import { UserProvider } from './../../providers/user.service';

import { User } from '../../models/user.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: Observable<User[]>;
  view: string = 'chats';


  constructor(
    public authProvider: AuthProvider,
    public navCtrl: NavController,
    public userProvider: UserProvider,
    public toastCtrl: ToastController
  ) {

  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authProvider.authenticated;
  }

  ionViewDidLoad() {

    this.users = this.userProvider.users;
    console.log("this.users " +this.users);

   
  }

  onSignUp(): void {
    console.log('Abrindo a pagina Sign Up');
    this.navCtrl.push(SignupPage);
  }

  onChatCreate(user): void {
    console.log("Abrindo o Chat com "+user.name);
    this.presentToast("Você está em uma conversa com "+user.name);

    this.navCtrl.push(ChatPage,{
      recipientUser: user
    });
  }

  presentToast(msg:string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
