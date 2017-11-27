import { HomePage } from './../home/home';
import { AuthProvider } from './../../providers/auth.service';
import { SignupPage } from './../signup/signup';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, AlertController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  signinForm: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {

    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    
        this.signinForm = this.formBuilder.group({
          email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
          password: ['', [Validators.required, Validators.minLength(6)]],
        });
  }

  onSubmit(): void {
   
     let loading = this.showLoading();

    this.authProvider.signinWithEmail(this.signinForm.value)
    .then((islogged:boolean) => {
       if(islogged) {
         this.navCtrl.setRoot(HomePage);
         loading.dismiss();
       }
    }).catch((error: any) => {
       console.log(error);
       loading.dismiss();
       this.showAlert(error);
    });
  }

  onSignup(): void {
    this.navCtrl.push(SignupPage);
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Por favor aguarde...'
    });

    loading.present();

    return loading;
  }

  onHomePage(): void {
    this.navCtrl.push(HomePage);
  }
  

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();
  }

}
