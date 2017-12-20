import { ProgressBarComponent } from './../components/progress-bar/progress-bar';
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

import { CapitalizePipe } from './../pipes/capitalize.pipe';
import { ChatPage } from './../pages/chat/chat';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SigninPage } from './../pages/signin/signin';
import { SignupPage } from './../pages/signup/signup';

import { AuthProvider } from '../providers/auth.service';

import { UserProvider } from '../providers/user.service';
import { ChatProvider } from '../providers/chat.service';
import { UserProfilePage } from './../pages/user-profile/user-profile';

import { UserInfoComponent } from './../components/user-info/user-info.component';

import { MessageBoxComponent } from './../components/message-box/message-box.component';
import { MessageProvider } from '../providers/message.service';
import { CustomLoggedHeaderComponent } from './../components/custom-logged-header/custom-logged-header';
import { UserMenuComponent } from '../components/user-menu/user-menu';

const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyBtyC2q3dqLuUSny1kuzzCfaZ7n2rA3nho",
  authDomain: "webgoias-chat.firebaseapp.com",
  databaseURL: "https://webgoias-chat.firebaseio.com",
  projectId: "webgoias-chat",
  storageBucket: "webgoias-chat.appspot.com",
  messagingSenderId: "960409567813"
};


@NgModule({
  declarations: [
    CapitalizePipe,
    ChatPage,
    CustomLoggedHeaderComponent,
    HomePage,
    MessageBoxComponent,
    MyApp,
    ProgressBarComponent,
    SigninPage,
    SignupPage,
    UserInfoComponent,
    UserMenuComponent,
    UserProfilePage
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
    ChatPage,
    HomePage,
    MyApp,
    SigninPage,
    SignupPage,
    UserProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ChatProvider,
    MessageProvider,
    UserProvider
  ]
})
export class AppModule {}
