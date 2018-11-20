import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChatdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chatdetails',
  templateUrl: 'chatdetails.html',
})
export class ChatdetailsPage {
  chatUserName: string;
  isOpenEmojiPicker = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.chatUserName = navParams.get('username')
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatdetailsPage');
  }
  switchEmojiPicker() {
    this.isOpenEmojiPicker = !this.isOpenEmojiPicker;
  }
}