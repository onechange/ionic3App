import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

//聊天信息的属性
export class ChatMessage {
  messageId: string;
  userId: string;
  username: string;
  userImgUrl: string;
  toUserId: string;//发送给谁
  time: number | string;
  message: string;
  status: string;
}
export class UserInfo {
  userId: string;
  userName: string;
  userImgUrl: string;
}

@Injectable()
export class ChatserviceProvider {

  constructor(public http: Http,
              public event: Events
    ) {
      
  }

  getMessageList(): Promise<ChatMessage[]> {
    const url = '../../assets/mock/msg-list.json';
    return this.http.get(url)
          .toPromise()
          .then(res => res.json().array as ChatMessage[])
          .catch(error => Promise.reject(error || '错误信息')
          );

  }
  sendMessage(message: ChatMessage) {
    return new Promise(resolve => setTimeout(() => {
      resolve(message)
    },Math.random() * 1000))
      .then(() => {
        this.mockNewMessage(message);
        });
  }

  mockNewMessage(message: any) {
    const id = Date.now().toString();
    let messageSend: ChatMessage = {
      messageId: id,
      userId: '123321',
      username: 'ykt客服',
      userImgUrl: 'http://img.mukewang.com/user/57a322f00001e4ae02560256-40-40.jpg',
      toUserId: message.userId,
      time: Date.now(),
      message: '你是不是刚才给我发送了「' + message.message + '」？',
      status: 'success'
    }
    //消息发布
    setTimeout(() => {
      this.event.publish('chat.received',messageSend,Date.now())
    },Math.random() * 1000)
  }
}
