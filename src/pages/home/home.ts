import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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
    public userProvider: UserProvider
  ) {

  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authProvider.authenticated;
  }

  ionViewDidLoad() {

    this.users = this.userProvider.users;
    console.log("this.users " +this.users);

   
  }

  // onSignUp(): void{
  //   this.navCtrl.push(SignupPage);
  // }
  onSignUp(): void {
    console.log('Abrindo a pagina Sign Up');
    this.navCtrl.push(SignupPage);
  }

}
