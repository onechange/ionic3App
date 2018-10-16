import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ModalController,ToastController,ViewController} from 'ionic-angular';
import {Storage} from '@ionic/storage'
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the AnswerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-answer',
  templateUrl: 'answer.html',
})
export class AnswerPage extends BaseUI{
  errorMessage:any;
  content: string;
  id: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public storage: Storage,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController) {
      super();
  }

  ionViewDidLoad() {  

  }
  dismiss(){
    this.viewCtrl.dismiss();
  }

  submit(){
    this.storage.get('UserId').then(val => {
      if (val!=null){
        var loading = super.showLoading(this.loadingCtrl,"发表中...");
        this.rest.answer(val,this.id,this.content)
          .subscribe(f => {
            if (f["Status"] == "OK"){
              loading.dismissAll();
              this.dismiss();
            }else{
              loading.dismissAll();
              super.presentToast(this.toastCtrl,f["StatusContent"]);
            }
          },
          error => this.errorMessage = <any>error 
          );
      }else {
        super.presentToast(this.toastCtrl,"请登录后发布回答...");
      }
  });
  }
}
