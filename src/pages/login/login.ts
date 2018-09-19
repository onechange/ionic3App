import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  LoadingController,
  ToastController
} from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';

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
export class LoginPage extends BaseUI {

  mobile: any;
  password: any;
  errorMessage:any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController,
    private storage: Storage
    ) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login() {
    var loading = super.showLoading(this.loadingCtrl, "登录中...");
    this.rest.login(this.mobile, this.password)
      .subscribe(
        //next
        x => {
          if (x["Status"] == "OK") {
            //处理登录逻辑
            console.log("登录成功");
            this.storage.set('UserId',x["UserId"]);
            loading.dismiss();
            this.dismiss();
            
          } else {
            console.log("登录不成功");
            loading.dismiss();
            super.presentToast(this.toastCtrl, x["StatusContent"]);
          }
        },
        //大括号可省略
        error => {
          this.errorMessage = <any>error;
        }
        
      );
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
