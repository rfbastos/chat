import { Component } from '@angular/core';
import { NavController, ToastController, MenuController } from 'ionic-angular';

import { ChatPage } from './../chat/chat';
import { SignupPage } from './../signup/signup';

import { AuthProvider } from './../../providers/auth.service';
import { ChatProvider } from './../../providers/chat.service';
import { UserProvider } from './../../providers/user.service';

import { Chat } from './../../models/chat.model';
import { User } from '../../models/user.model';

import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  chats: Observable<Chat[]>;
  users: Observable<User[]>;
  view: string = 'chats';


  constructor(
    public authProvider: AuthProvider,
    public chatProvider: ChatProvider,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public userProvider: UserProvider,
    public toastCtrl: ToastController
  ) {

  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authProvider.authenticated;
  }

  ionViewDidLoad() {
    this.chats = this.chatProvider.mapListKeys<Chat>(this.chatProvider.chats)
      .map((chats: Chat[]) => chats.reverse());

    this.users = this.userProvider.users;
    console.log("this.users " + this.users);

    this.menuCtrl.enable(true, 'user-menu');

  }

  onSignUp(): void {
    console.log('Abrindo a pagina Sign Up');
    this.navCtrl.push(SignupPage);
  }

  filterItems(event: any): void {
    let searchTerm: string = event.target.value;

    this.chats = this.chatProvider.mapListKeys<Chat>(this.chatProvider.chats)
      .map((chats: Chat[]) => chats.reverse());
    this.users = this.userProvider.users;

    if (searchTerm) {

      switch(this.view) {

        case 'chats':
          this.chats = this.chats
            .map((chats: Chat[]) => chats.filter((chat: Chat) => (chat.title && chat.title.toLowerCase().indexOf(searchTerm.toLocaleLowerCase()) > -1)));
          break;
          
        case 'users':
          this.users = this.users
            .map((users: User[]) => users.filter((user: User) => (user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)));
          break;

      }

    }
    
  }

  onChatCreate(recipientUser): void {
    console.log("Abrindo o Chat com " + recipientUser.name);
    

    this.userProvider
      .mapObjectKey<User>(this.userProvider.currentUser)
      .first()
      .subscribe((currentUser: User) => {

        this.chatProvider
          .mapObjectKey<Chat>(this.chatProvider.getDeepChat(currentUser.$key, recipientUser.$key))
          .first()
          .subscribe((chat: Chat) => {

            if (!chat.title) {

              console.log('Subscribe!');


              let timestamp: Object = firebase.database.ServerValue.TIMESTAMP; //pega o timestamp do banco
              //cria o chat do usuario logado com o outro usuario
              let chat1 = new Chat('', timestamp, recipientUser.name, (recipientUser.photo || ''));
              this.chatProvider.create(chat1, currentUser.$key, recipientUser.$key);
              //criar o chat do outro usuario com o usuario logado
              let chat2 = new Chat('', timestamp, currentUser.name, (currentUser.photo || ''));
              this.chatProvider.create(chat2, recipientUser.$key, currentUser.$key);

            }

          });

        this.navCtrl.push(ChatPage, {
          recipientUser: recipientUser
        });

      });


    this.navCtrl.push(ChatPage, {
      recipientUser: recipientUser
    });
  }

  onChatOpen(chat: Chat): void {

    let recipientUserId: string = chat.$key;

    this.userProvider.mapObjectKey<User>(
      this.userProvider.get(recipientUserId)
    )
      .first()
      .subscribe((user: User) => {

        this.navCtrl.push(ChatPage, {
          recipientUser: user
        });

      });


  }

}
