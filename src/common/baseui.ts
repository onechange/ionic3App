import { Loading, LoadingController, Toast, ToastController } from "ionic-angular"

export abstract class BaseUI {
  constructor() {

  }
  protected showLoading(loadingCtrl: LoadingController, message: string): Loading {
    let loader = loadingCtrl.create({
      
      content: message,
      dismissOnPageChange: true
    });
    loader.present();
    return loader;
  }

  protected presentToast(toastCtrl: ToastController, message: string): Toast {
    let toast = toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
    return toast;
  }
}
