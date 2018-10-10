import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the QuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage extends BaseUI{
  title: any;
  content:any;
  errorMessage:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public storage: Storage,
    private loadingCtrl: LoadingController,
    private rest:RestProvider,
    private toastCtrl: ToastController
    ){
      super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionPage');
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }
  submitQuestion(){
    this.storage.get('UserId').then((val) => {
      var loading = super.showLoading(this.loadingCtrl,"发表中....");
      this.rest.saveQuestion(val,this.title,this.content)
        .subscribe( f => {
          if (f["Status"] == "OK"){
            loading.dismissAll();
            this.dismiss();
          }
          else{
            loading.dismissAll();
            super.presentToast(this.toastCtrl,f["StatusContent"]);
          }
        },
        error => this.errorMessage = <any>error);
    });
  }
}
