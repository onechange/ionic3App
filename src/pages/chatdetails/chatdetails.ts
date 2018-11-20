import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatserviceProvider, ChatMessage } from '../../providers/chatservice/chatservice';

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
  messageList: ChatMessage[] = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private chatService: ChatserviceProvider
  ) {
    this.chatUserName = navParams.get('username')
  }
  getMessage() {
    return this.chatService.getMessageList()
      .then((result) => {
        this.messageList = result;
      }).catch((err) => {
        console.error(err);
      });
  }
  ionViewDidEnter() {
    this.getMessage()
    .then(() => {
      this.scrollToBottom();
    });
  }
  scrollToBottom(): any {

  }
  switchEmojiPicker() {
    this.isOpenEmojiPicker = !this.isOpenEmojiPicker;
  }
}
