import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {SystemserviceProvider} from "../../providers/systemservice/systemservice";
import {MyApp} from "../../app/app.component";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the ShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {
  products: any;
  totalPrice :number;
  numberofProducts : number
  News: any;
  priceperItem:number;
  User = {Message: '', DatetimeSent: new Date().toLocaleDateString()};
  alertmessage = '';
  toastmeassage="";
  imageURI:any;
  imageFileName:any
  constructor(public navCtrl: NavController, public navParams: NavParams,public service:SystemserviceProvider,public alertCtrl: AlertController,public loadingCtrl: LoadingController,private toastCtrl: ToastController,
  private transfer: FileTransfer, private file: File ,private camera: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');

  }

  ionViewDidEnter(){
   this.Getnews();
  }


  sendPromo(){
    if(this.User.Message==''){
      this.toastmeassage= "Please enter your message ";
      this.presentToast();
    }else {
      this.service.PostNews( this.User.Message,this.User.DatetimeSent)

        .subscribe(
          data => {
            if(data.message=='sent'){
              this.sendAll(this.User.Message);
              this.toastmeassage = 'Delivered'
              this.presentToast();
              this.User.Message = '';
              this.ionViewDidEnter();
            }
           else {
              this.sendMessage();
            }

          },
          error => {
            if(error.status===409){

            }
            if (error.status === 0) {
              this.alertmessage = "not internet connection or server is down";
              this.showAlert();
            }
          });
    }



  }


  sendMessage(){


    this.presentToast();
    let loader = this.loadingCtrl.create({
      content: 'sending .....',
    });
    this.alertmessage = "Successfuly sent to all customers";
    this.showAlert();
    loader.present().then(() => {
      this.service.PostGcm()
        .subscribe(
          data => {



          },
          error => {
            if(error.status===409){

            }
            if (error.status === 0) {
              this.alertmessage = "not internet connection or server is down";
              this.showAlert();
            }

          });
      loader.dismiss();
    });
  }
  showAlert() {

    let alert = this.alertCtrl.create({
      subTitle: this.alertmessage,
      buttons: ['OK']
    });
    alert.present();
  }
  presentToast() {
    console.log('ALERT');
    let toast = this.toastCtrl.create({
      message: this.toastmeassage,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  Getnews(){


    this.presentToast();
    let loader = this.loadingCtrl.create({
      content: 'sending .....',
    });
     loader.present().then(() => {
      this.service.GetNews()
        .subscribe(
          data => {

                this.News = data;

          },
          error => {
            if(error.status===409){

            }
            if (error.status === 0) {
              this.alertmessage = "not internet connection or server is down";
              this.showAlert();
            }

          });
      loader.dismiss();
    });
  }


  sendAll(message:string){


    this.presentToast();
    let loader = this.loadingCtrl.create({
      content: 'sending .....',
    });
    loader.present().then(() => {
      this.service.Prodcast(message)
        .subscribe(
          data => {

            this.News = data;

          },
          error => {
            if(error.status===409){

            }
            if (error.status === 0) {
              this.alertmessage = "not internet connection or server is down";
              this.showAlert();
            }

          });
      loader.dismiss();
    });
  }



  DeleteNews(id){
    let prompt = this.alertCtrl.create({
      message: "Are you sure you want to delete the message",

      buttons: [
        {
          text: 'No',
          handler: data => {

          }
        },
        {
          text: 'Yes',
          handler: data => {

           this.deleteNews(id)
          }
        }
      ]
    });
    prompt.present();
  }

deleteNews(id:string){

  let loader = this.loadingCtrl.create({
    content: 'sending .....',
  });
  this.alertmessage = "Successfuly deleted";

  loader.present().then(() => {
    this.service.DeleteNews(id)
      .subscribe(
        data => {

          this.toastmeassage = 'Deleted'
          this.presentToast();
          this.ionViewDidEnter();
        },
        error => {
          if(error.status===409){

          }
          if (error.status === 0) {
            this.alertmessage = "not internet connection or server is down";
            this.showAlert();
          }

        });
    loader.dismiss();
  });
}
  uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'ionicfile',
      fileName: 'ionicfile',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }

    fileTransfer.upload(this.imageURI, 'http://22.247.15.115:3000/Upload/', options)
      .then((data) => {
        console.log(data + " Uploaded Successfully");

        loader.dismiss();
        this.presentToaster("Image uploaded successfully");
      }, (err) => {
        console.log(err);
        loader.dismiss();
        this.presentToaster(err);
      });

  }



  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
    }, (err) => {
      console.log(err);
      this.presentToaster(err);
    });
  }
  presentToaster(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
