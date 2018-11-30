import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Content, TextInput } from 'ionic-angular';
import { ChatserviceProvider, ChatMessage } from '../../providers/chatservice/chatservice';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';



@IonicPage()
@Component({
  selector: 'page-chatdetails',
  templateUrl: 'chatdetails.html',
})
export class ChatdetailsPage {
  chatUserName: string;
  chatUserId: string;
  isOpenEmojiPicker = false;
  messageList: ChatMessage[] = [];
  userId: string;
  userName: string;
  userImgUrl: string;
  errorMessage: any;
  editorMessage: string;
  @ViewChild(Content) content:Content;
  @ViewChild('chatInput') messageInput:TextInput;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private chatService: ChatserviceProvider,
    public rest: RestProvider,
    public storage: Storage,
    public event: Events,

  ) {
    this.chatUserName = navParams.get('username');
    this.chatUserId = navParams.get('userid');

  }
  getMessage() {
    return this.chatService.getMessageList()
      .then((result) => {
        this.messageList = result;
      }).catch((err) => {
        console.error(err);
      })
  }
  ionViewDidEnter() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        this.rest.getUserInfo(val)
          .subscribe(
          userinfo => {
            this.userId = '140000198202211138';
            this.userName = userinfo["UserNickName"];
            this.userImgUrl = userinfo["UserHeadface"] + "?" + (new Date()).valueOf();
          },
          error => this.errorMessage = <any>error);
      }
    });
    this.getMessage()
    .then(() => {
      this.scrollToBottom();
    });
    //听取消息的发布,订阅
    this.event.subscribe('chat.received',(msg,time) =>{
      this.messageList.push(msg);
      this.scrollToBottom();
    })

  }
  scrollToBottom(): any {
    setTimeout(() => {
      if(this.content.scrollToBottom){
        this.content.scrollToBottom();
      }
    }, 400);
  }
  switchEmojiPicker() {
    this.isOpenEmojiPicker = !this.isOpenEmojiPicker;
  }

  sendMessage(message: ChatMessage){
    if(!this.editorMessage.trim())
    return;
    const id = Date.now().toString();
    let messageSend: ChatMessage = {
      messageId: id,
      userId: this.userId,
      username: this.userName,
      userImgUrl: this.userImgUrl,
      toUserId: this.chatUserId,//发送给谁
      time: Date.now(),
      message: this.editorMessage,
      status: 'pending'
    }
    this.messageList.push(messageSend);
    this.scrollToBottom();
    this.editorMessage = '';
    if(!this.isOpenEmojiPicker){
      this.messageInput.setFocus();
    }

    this.chatService.sendMessage(messageSend)
    .then(
      () => {
        let index = this.getMessageIndex(id);
        if(index !== -1) {
          this.messageList[index].status = 'success';
        }
      }) ;
  }
  focus(){
    this.isOpenEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
  }
  getMessageIndex(id:string) {
    //e表示将messagelist里的每一项取出来循环和id比较 如果满足就返回这一项
    return this.messageList.findIndex(
      e => e.messageId === id
    );
  }
  ionViewWillLeave() {
    //消息事件取消订阅
    this.event.unsubscribe('chat.received');
  }
  
}
