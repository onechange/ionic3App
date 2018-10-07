import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, ToastController, LoadingController, ViewController, normalizeURL} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
//要导入的四个ionic-native库
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';

declare var cordova: any; //导入第三方库

@IonicPage()
@Component({
  selector: 'page-headface',
  templateUrl: 'headface.html',
})
export class HeadfacePage extends BaseUI {
  userId: string;
  errorMessage: string;
  lastImage: string = null;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public actionSheet: ActionSheetController,
    private camera: Camera,
    private file: File,
    public platform: Platform,
    private transfer: FileTransfer,
    private filePath: FilePath,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private vc: ViewController
  ) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HeadfacePage');
  }

  ionViewDidEnter() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        this.userId = val;
      }
    });
  }
  choiceImage() {
    const actionSheet = this.actionSheet.create({
      title: '选择图片...',
      buttons: [
        {
          text: '相册中选择',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: '相机',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
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
  takePicture(sourceType) {
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    this.camera.getPicture(options).then((imagePath) => {
      //适配安卓
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filepath => {
            //获取正确路径
            let correctPath = filepath.substr(0, filepath.lastIndexOf('/') + 1);
            //获取文件名
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        //获取正确路径
        let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        //获取文件名
        let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    },
      (error) => {
        super.presentToast(this.toastCtrl, "选择图片错误,请检查相关权限");

      });
  }

  copyFileToLocalDir(namePath, currentName, newFilename) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFilename).then((success) => {
      this.lastImage = newFilename;

    },
      (error) => {
        super.presentToast(this.toastCtrl, "存储图片到本地图库出现错误");
      }
    );
  }
  //为文件生成一个新文件名
  createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFilename = n + '.jpg';
    return newFilename
  }
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      // console.log('original:'+cordova.file.dataDirectory);
      if (this.platform.is('ios')) {
        return (cordova.file.dataDirectory + img).substring(6 + 1);
      } else {
        return normalizeURL(cordova.file.dataDirectory + img);
      }
    }
  }
  //模板中加载图片专用
  public pathForImageToSrc(img) {
    if (img === null) {
      return '';
    } else {
        console.log('xianshitupian:'+ normalizeURL(cordova.file.dataDirectory + img));
        return normalizeURL(cordova.file.dataDirectory + img);
    }
  }
  uploadImage() {
    var url = 'https://imoocqa.gugujiankong.com/api/account/uploadheadface';

    var targetPath = this.pathForImage(this.lastImage);
    console.log('targetPath:' + targetPath);
    var filename = this.userId + ".jpg";
    var options = {
      fileKey: 'file',
      fileName: filename,
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      params: { 'fileName': filename, 'userid': this.userId }
    };
    const fileTransfer: FileTransferObject = this.transfer.create();
    var loading = super.showLoading(this.loadingCtrl, "上传中...");
    console.log(targetPath);
    //开始正式上传
    fileTransfer.upload(targetPath, url, options).then((data) => {
      loading.dismiss();
      super.presentToast(this.toastCtrl, "图片上传成功");
      setTimeout(() => {
        this.vc.dismiss();
      }, 3000);
    },
      (error) => {
        console.log(error.code);
        loading.dismiss();
        super.presentToast(this.toastCtrl, "上传错误,请重试");
      }
    );

  }

}
