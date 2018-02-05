import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/bindNodeCallback';

import { AngularFireAuth } from "angularfire2/auth";

import { BaseProvider } from "./base.service";

import * as firebase from 'firebase/app';


@Injectable()
export class AuthProvider extends BaseProvider  {

  constructor(
    public afAuth: AngularFireAuth,
    public http: Http
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
