import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';

import 'rxjs/add/operator/first';

import { AuthProvider } from './../../providers/auth.service';
import { HomePage } from './../home/home';
import { UserProvider } from './../../providers/user.service';

import * as firebase from 'firebase/app';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  signupForm: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthProvider,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserProvider
  ) {

    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

  }

  onSubmit(): void {

    let loading: Loading = this.showLoading();
    let formUser = this.signupForm.value;
    let username: string = formUser.username;

    this.userService.userExists(username)
      .first()
      .subscribe((userExists: boolean) => {

        if (!userExists) {
          console.log("Usuário válido");

          this.authService.createAuthUser({
            email: formUser.email,
            password: formUser.password
          }).then((authUser: firebase.User) => { //authUser = objeto de retorno depois que cria o usuario na autenticacao 
            console.log("Usuário criado para autenticação, criando no banco...");

            delete formUser.password; // deletando o atributo de password do usuario
            let uuid: string = authUser.uid; //Setando o ID do usuario igual ao ID do usuario na autenticação

            this.userService.create(formUser, uuid)
              .then(() => {
                console.log('Usuario cadastrado!');
                this.navCtrl.setRoot(HomePage); //Após cadastrar redireciona para a HomePage
                loading.dismiss(); // Fechando o Loading
              }).catch((error: any) => {
                console.log(error);
                loading.dismiss(); // Fechando o Loading
                this.showAlert(error); //Abre a mensagem de erro
              });

          }).catch((error: any) => { //se der erro ao criar usuario de autenticacao
            console.log(error);
            loading.dismiss(); // Fechando o Loading
            this.showAlert(error);  //Abre a mensagem de erro
          });

        } else {

          this.showAlert(`O username ${username} já está sendo usado em outra conta!`);
          loading.dismiss();

        }

      });

  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Por favor aguarde...'
    });

    loading.present();

    return loading;
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();
  }

}