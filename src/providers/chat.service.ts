import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators/map';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject, AngularFireAction, DatabaseSnapshot } from 'angularfire2/database';

import { BaseProvider } from './base.service';

import { Chat } from './../models/chat.model';

import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class ChatProvider extends BaseProvider {

  chats: AngularFireList<Chat>;
  
  constructor(
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public http: HttpClient
  ) {
    super();
    this.setChats();
    console.log('Hello ChatProvider Provider');
  }

  private setChats(): void {
    this.afAuth.authState
      .subscribe((authUser: firebase.User) => {
        if (authUser) {

          this.chats = this.db.list<Chat>(`/chats/${authUser.uid}`, 
            (ref: firebase.database.Reference) => ref.orderByChild('timestamp')
          );

        }
      });
  }

  create(chat: Chat,userId1: string, userId2: string): Promise<void> {
    return this.db.object<Chat>(`/chats/${userId1}/${userId2}`) //Usa object<Chat> pra passar o tipo de retorno que quero
    .set(chat) //seta o valor no objeto
    .catch(this.handlePromiseError); // tratamento de erro
  }

  getDeepChat(userId1: string, userId2: string): AngularFireObject<Chat> {
    return this.db.object<Chat>(`/chats/${userId1}/${userId2}`); // Pega o Valor do objeto
  }

    updatePhoto(chat: AngularFireObject<Chat>, chatPhoto: string, recipientUserPhoto: string): Promise<boolean> {
    if (chatPhoto != recipientUserPhoto) {
      return chat.update({
        photo: recipientUserPhoto
      }).then(() => {
        return true;
      }).catch(this.handlePromiseError);
    }
    return Promise.resolve(false);
  }

  
}
