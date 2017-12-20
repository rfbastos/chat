import { User } from './../../models/user.model';
import { AuthProvider } from './../../providers/auth.service';
import { AlertController, App, MenuController } from 'ionic-angular';

import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base.component';


@Component({
  selector: 'custom-logged-header',
  templateUrl: 'custom-logged-header.html'
})

export class CustomLoggedHeaderComponent extends BaseComponent {
  
    @Input() title: string;
    @Input() user: User;
    
  
    constructor(
      public alertCtrl: AlertController,
      public authProvider: AuthProvider,
      public app: App,
      public menuCtrl: MenuController
    ) {
      super(alertCtrl, authProvider, app, menuCtrl);
    }
  
  }
