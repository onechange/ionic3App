import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
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
export class MorePage {
  //判断用户是否登录标志位
  public isLogin: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private storage: Storage
    ) {

  }

  loginModal() {
    const modal = this.modalCtrl.create(LoginPage);
    modal.present();
  }
  ionViewDidEnter() {
    this.loadUserPage();
  }
  loadUserPage(){
    this.storage.get('UserId').then((val) => {
      if(val!=null){
        
      }else{

      }
    });
  }
}
