import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

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

  api1 = 'http://localhost:3000/mobile/google_auth';
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

  testPost() {
    let accessToken = 'aya29.GlxtBa_Fw6qwpfgtaZ4k3hrBffLnIsdO-k4zrZdBpfWM26PQh64tfGrctQQoNCPQdLdckoR7fTI74uvsVqunchZ9kbPqVv2aXQD22HSPTotJg5AfuGsOPRp84JMlYA';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };

    console.log(this.http.post(this.api1, {'id_token': accessToken}, httpOptions).subscribe(ok => console.log(ok), err => console.log(err)));
  }

  login() {

    this.googlePlus.login({ 'webClientId': '895788023800-b70c1q46ae1c3f9dtfi025dkb5cdml9r.apps.googleusercontent.com',
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

        const httpOptions = {
          headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*'
          }),
        };
        console.log(this.http.post(this.api2, { 'id_token': res.idToken } , httpOptions).subscribe(ok => console.log(ok)));
      })
      .catch(err => console.log(err));
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
        // https://rails-api-seed.herokuapp.com/auth/:provider/callback
      })
      .catch(err => console.log(err));
  }
}
