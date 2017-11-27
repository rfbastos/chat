import { CustomLoggedHeaderComponent } from './../components/custom-logged-header/custom-logged-header';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { CapitalizePipe } from './../pipes/capitalize.pipe';
import { HomePage } from '../pages/home/home';
import { SigninPage } from './../pages/signin/signin';
import { SignupPage } from './../pages/signup/signup';

import { AuthProvider } from '../providers/auth.service';
import { BaseProvider } from '../providers/base.service';
import { UserProvider } from '../providers/user.service';




const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyBtyC2q3dqLuUSny1kuzzCfaZ7n2rA3nho",
  authDomain: "webgoias-chat.firebaseapp.com",
  databaseURL: "https://webgoias-chat.firebaseio.com",
  projectId: "webgoias-chat",
  storageBucket: "webgoias-chat.appspot.com",
  messagingSenderId: "960409567813"
}


@NgModule({
  declarations: [
    HomePage,
    CapitalizePipe,
    CustomLoggedHeaderComponent,
    MyApp,
    SigninPage,
    SignupPage
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseAppConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    BaseProvider,
    UserProvider
  ]
})
export class AppModule {}
