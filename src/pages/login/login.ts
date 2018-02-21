import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Angular2TokenService } from 'angular2-token-ionic3';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  output: any = {};

  constructor(public navCtrl  : NavController, public toastCtrl : ToastController, 
              public navParams: NavParams, private _tokenService: Angular2TokenService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onSubmit() {
    this.output = {};
    this._tokenService.signInOAuth('google').subscribe(
      res =>      this.showToastWithCloseButton(res.name),
      error =>    console.log(error)
    );
  }

  showToastWithCloseButton(name: string) {
    const toast = this.toastCtrl.create({
      message: `${name} has logged in`,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

}
