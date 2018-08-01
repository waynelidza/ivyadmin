import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController, ToastController} from 'ionic-angular';
import {SystemserviceProvider} from "../../providers/systemservice/systemservice";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  alertmessage = '';
  toastmeassage="";
  orders:any;
  allOrders;any;
  constructor(public navCtrl: NavController,public service:SystemserviceProvider,public alertCtrl: AlertController,public loadingCtrl: LoadingController,private toastCtrl: ToastController) {

  }

  ionViewDidEnter(){
    this.GetOrders();
    this.GetallOrders();
  }
  GetOrders(){


    this.presentToast();
    let loader = this.loadingCtrl.create({
      content: 'loading .....',
    });
    loader.present().then(() => {
      this.service.getOrders()
        .subscribe(
          data => {

            console.log(data)

            if  ( data.length ===0){

            }else{
              this.orders = data;
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
      loader.dismiss();
    });
  }

  GetallOrders(){


    this.presentToast();
    let loader = this.loadingCtrl.create({
      content: 'loading .....',
    });
    loader.present().then(() => {
      this.service.getAllOrders()
        .subscribe(
          data => {

            this.allOrders = data;



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
}
