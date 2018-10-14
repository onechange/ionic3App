import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import {Storage} from '@ionic/storage'
import { BaseUI } from '../../common/baseui';
/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage extends BaseUI {
  id:string;
  userId:string;
  question:string[];
  answers:string[];
  errorMessage:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public storage: Storage,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController) {
      super();
  }

  ionViewDidLoad() {
    this.id = this.navParams.get('id');
    this.loadQuestion(this.id);
  }

  loadQuestion(id){
    this.storage.get('UserId').then(val => {
        if (val!=null){
          this.userId = val;
        }
    });
  }
}
