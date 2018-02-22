import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [ GooglePlus ]
})
export class LoginPage {

  displayName: any;
  email: any;
  familyName: any;
  givenName: any;
  userId: any;
  imageUrl: any;
  idToken: any;

  isLoggedIn: boolean = false;

  constructor(public toastCtrl: ToastController, private googlePlus: GooglePlus) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  showToastWithCloseButton(message: string) {
    const toast = this.toastCtrl.create({
      message: `${message}`,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

  login() {

    this.googlePlus.login({ 'webClientId': '90948732076-13m77u4c9r3o2kdrvoqqo6cqrr4qaueu.apps.googleusercontent.com',
                            'offline': true })
      .then(res => {
        this.displayName = res.displayName;
        this.email = res.email;
        this.familyName = res.familyName;
        this.givenName = res.givenName;
        this.userId = res.userId;
        this.imageUrl = res.imageUrl;
        this.idToken = res.idToken;

        this.isLoggedIn = true;
      })
      .catch(err => this.showToastWithCloseButton(JSON.stringify(err)));
  }

  logout() {
    this.googlePlus.logout()
      .then(res => {
        this.showToastWithCloseButton(JSON.stringify(res));
        this.displayName = "";
        this.email = "";
        this.familyName = "";
        this.givenName = "";
        this.userId = "";
        this.imageUrl = "";

        this.isLoggedIn = false;
      })
      .catch(err => this.showToastWithCloseButton(JSON.stringify(err)));
  }
}
