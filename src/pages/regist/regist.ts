import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ViewController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest'
import { BaseUI } from '../../common/baseui';


@IonicPage()
@Component({
  selector: 'page-regist',
  templateUrl: 'regist.html',
})
export class RegistPage extends BaseUI {
  mobile: any;
  nickname: any;
  password: any;
  checkpassword: any;
  errorMessage: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rest: RestProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public vc: ViewController
  ) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistPage');
  }

  reigst() {
    if (!(/^1[34578]\d{9}$/.test(this.mobile))){
      super.presentToast(this.toastCtrl, "您的手机号码格式不正确。");
    } else if (this.nickname.length < 3 || this.nickname.length > 10) {
      super.presentToast(this.toastCtrl, "昵称的长度应该在 3 ~ 10 位之间。");
    } else if (this.password.length < 6 || this.password.length > 20
      || this.checkpassword.length < 6 || this.checkpassword.length > 20) {
      super.presentToast(this.toastCtrl, "密码的长度应该在 6 ~ 20 位之间。");
    } else if (this.password != this.checkpassword) {
      super.presentToast(this.toastCtrl, "两次输入的密码不匹配。");
    } else {
      var loading = super.showLoading(this.loadingCtrl,"注册中...");
      this.rest.regist(this.mobile, this.nickname, this.password)
        .subscribe(
          f => {
            if (f["Status"] == "OK") {
                loading.dismiss();
                super.presentToast(this.toastCtrl,"注册成功!");
                this.dismiss();
            } else {
              loading.dismiss();
              console.log("注册不成功");
              super.presentToast(this.toastCtrl, f["StatusContent"]);
            }
          },
          error => this.errorMessage = <any>error );
    }

  } 
  dismiss() {
    this.vc.dismiss();
  }
}
