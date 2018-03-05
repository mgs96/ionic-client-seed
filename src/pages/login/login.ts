import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  api1 = 'http://192.168.0.11:3000/mobile/google_auth';
  api2 = 'https://rails-api-seed.herokuapp.com/mobile/google_auth';

  isLoggedIn: boolean = false;

  constructor(public toastCtrl: ToastController, private googlePlus: GooglePlus, private http: HttpClient) {
    
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

    this.googlePlus.login({ 'webClientId': '330236784490-oe7knrlk32mkpdha2oim5dk8asdqoler.apps.googleusercontent.com',
                            'offline': true })
      .then(res => {
        console.log(JSON.stringify(res));
        this.displayName = res.displayName;
        this.email = res.email;
        this.familyName = res.familyName;
        this.givenName = res.givenName;
        this.userId = res.userId;
        this.imageUrl = res.imageUrl;
        this.idToken = res.idToken;

        this.isLoggedIn = true;

        const httpOptions = {
          headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*'
          }),
          params: {
            'id_token': res.idToken,
            'redirect_uri': ''
          }
        };
        this.http.post(this.api1, {} , httpOptions)
          .subscribe(ok => console.log(JSON.stringify(ok), err => console.log(JSON.stringify(err))));
      })
      .catch(err => console.log(JSON.stringify(err)));
  }

  logout() {
    this.googlePlus.logout()
      .then(res => {
        console.log(res);
        this.displayName = "";
        this.email = "";
        this.familyName = "";
        this.givenName = "";
        this.userId = "";
        this.imageUrl = "";

        this.isLoggedIn = false;

        console.log(res);
        
      })
      .catch(err => console.log(err));
  }
}
