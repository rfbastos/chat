import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import { User } from './../models/user.model';

import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';

import { BaseProvider } from './base.service';

import * as firebase from 'firebase/app';

@Injectable()
export class AuthProvider extends BaseProvider  {

  constructor(
    public afAuth: AngularFireAuth,
    public http: HttpClient
  ) {
    super();
    console.log('Hello AuthProvider Provider');
  }

  createAuthUser(user: {email: string, password: string}): Promise<firebase.User> {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .catch(this.handlePromiseError);
  }

  signinWithEmail(user: {email: string, password: string}): Promise<boolean> {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then((authUser: firebase.User) => {
          return authUser != null; //verifica se for diferente de null o usuario foi logado com sucesso!
      }).catch(this.handlePromiseError);
  }

  logout(): Promise<void> {
    return this.afAuth.auth.signOut();
    
  }

  get authenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.afAuth
        .authState
        .first()
        .subscribe((authUser: firebase.User) => {
          (authUser) ? resolve(true) : reject(false);
        });
    });
  }


}