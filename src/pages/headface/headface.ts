import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the HeadfacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-headface',
  templateUrl: 'headface.html',
})
export class HeadfacePage {
  userId:string;
  errorMessage:string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HeadfacePage');
  }

  ionViewDidEnter() {
    this.storage.get('UserId').then((val)=>{
      if (val != null){
        this.userId = val;
      }
    });
  }
}
