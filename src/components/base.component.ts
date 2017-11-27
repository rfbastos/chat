import { SigninPage } from './../pages/signin/signin';
import { AuthProvider } from './../providers/auth.service';
import { NavController, AlertController, App, MenuController } from 'ionic-angular';
import { OnInit } from '@angular/core';

export abstract class BaseComponent implements OnInit {
    
    protected navCtrl: NavController;
    
    constructor(
        public alertCtrl: AlertController,
        public authProvider: AuthProvider,
        public app: App,
        public menuCtrl: MenuController
    ) { }

    ngOnInit(): void {
        this.navCtrl = this.app.getActiveNav();
    }

    onLogout(): void{
        this.alertCtrl.create({
            message: 'Tem certeza que deseja sair?',
            buttons: [
                {
                    text: 'Sim',
                    handler: () => {
                        this.authProvider.logout()
                        .then(
                            () => {
                                this.navCtrl.setRoot(SigninPage);
                            }
                        )
                    }
                },
                {
                    text: 'Não, quero ficar mais'
                }
            ]
        }).present(); // aprsenta o alerta
    }
}