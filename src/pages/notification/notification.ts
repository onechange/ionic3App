import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage} from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../common/baseui';
import { DetailsPage } from '../details/details';

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage extends BaseUI {
  notificationList:string[];
  errorMessage: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    public rest: RestProvider,
    public loading:LoadingController
    ) {
      super();
  }

  ionViewDidLoad() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        var loading = super.showLoading(this.loading,"loading....");
        this.rest.getUserNotifications(val)
          .subscribe(
          n => {
            this.notificationList = n;
            loading.dismissAll();
          },
          error => this.errorMessage = <any>error);
      }
    });
  }
  gotoDetails(questionId){
    this.navCtrl.push(DetailsPage,{id:questionId});
  }
}
