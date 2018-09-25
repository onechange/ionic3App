import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { UserPage } from '../user/user';
/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage extends BaseUI{
  //判断用户是否登录标志位
  public isLogin: boolean = false;
  headface:any;
  userinfo:string[];
  nickname:any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    ) {
      super();
  }

  loginModal() {
    const modal = this.modalCtrl.create(LoginPage);
    modal.onDidDismiss(()=>{
      this.loadUserPage();
    });
    modal.present();
  }
  ionViewDidEnter() {
    this.loadUserPage();
  }
  loadUserPage(){
    this.storage.get('UserId').then((val) => {
      if(val!=null){
        // 加载用户数据
        // var loading = super.showLoading(this.loadingCtrl,"加载中...");
        this.rest.getUserInfo(val)
        .subscribe(
          userinfo => {
            this.userinfo = userinfo;
            this.headface = userinfo["UserHeadface"] + "?" +(new Date()).valueOf();
            this.nickname = userinfo["UserNickName"];
            this.isLogin = true;
            // loading.dismiss();
          }
        );
        this.isLogin = true;
      }else{
        this.isLogin = false;
      }
    });
  }
  gotoUserPage() {
    this.navCtrl.push(UserPage);
  }
}
