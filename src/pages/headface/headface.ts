import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
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
  lastImage:string = null;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    public actionSheet: ActionSheetController,
    private camera: Camera,
    private file: File,
    public platform: Platform,
    private transfer: FileTransfer,
    private filePath:FilePath
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
  choiceImage(){
    const actionSheet = this.actionSheet.create({
      title:'选择图片...',
      buttons:[
        {
          text: '相册中选择',
          handler: () => {

          }
        },
        {
          text: '相机',
          handler:() => {

          }
        },
        {
          text: '取消',
          role: 'cancel'
        }
      ],
    });
    actionSheet.present();
  }
  takePicture(sourceType){
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    this.camera.getPicture(options).then((imagePath) => {
      //适配安卓
      if(this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY){
        this.filePath.resolveNativePath(imagePath)
        .then(filepath=>{ 
          //获取正确路径
          let correctPath = filepath.substr(0,filepath.lastIndexOf('/')+ 1);
          //获取文件名
          let currentName = imagePath.substring(imagePath.lastIndexOf('/'),imagePath.lastIndexOf('?'));
          this.copyFileToLocalDir(correctPath.)
        });
      }
    });
  }


}
