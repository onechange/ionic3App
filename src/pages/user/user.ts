import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../common/baseui';
import { Storage } from '@ionic/storage';
import { HeadfacePage } from '../headface/headface';
/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage extends BaseUI {
  nickname: any;
  headface: string;
  errorMessage: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController
  ) {
    super();
  }

  ionViewDidLoad() {
    this.loadUserPage();
  }
  loadUserPage() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        // 加载用户数据
        // var loading = super.showLoading(this.loadingCtrl,"加载中...");
        this.rest.getUserInfo(val)
          .subscribe(
            userinfo => {
              this.headface = userinfo["UserHeadface"] + "?" + (new Date()).valueOf();
              this.nickname = userinfo["UserNickName"];
              // loading.dismiss();
            },
            error => this.errorMessage = <any>error);
      }
    });
  }
  updateNickname() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        var loading = super.showLoading(this.loadingCtrl, "修改中...");
        this.rest.updateUserNickname(val, this.nickname)
          .subscribe(
            f => {
              if (f["Status"] == "OK") {
                loading.dismiss();
                super.presentToast(this.toastCtrl, "昵称修改成功");
              } else {
                loading.dismiss();
                super.presentToast(this.toastCtrl, f["StatusContent"]);
              }
            },
            error => this.errorMessage = <any>error);
      }
    }
    );
  }
  signout() {
    this.storage.remove('UserId');
    this.viewCtrl.dismiss();
  }
  gotoHeadFace(){
    this.navCtrl.push(HeadfacePage);
  }
}
