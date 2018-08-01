import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController, ToastController} from 'ionic-angular';
import {SystemserviceProvider} from "../../providers/systemservice/systemservice";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  usersData: any;
  usersNumber: any;
  accountStatus ='1';
  alertmessage = '';
  toastmeassage="";
  selectedId = {_id: ''};
  constructor(public alertCtrl: AlertController,public navCtrl: NavController,public service:SystemserviceProvider,private toastCtrl: ToastController,public loadingCtrl: LoadingController) {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');


  }

  ionViewDidEnter(){
    this.getall();
  }
  getall() {
    this.service.getallUsers()
      .subscribe(
        data => {
          console.log(data.length);
          this.usersData = data





        },
        error => {


        });
  }



  selectedUser(userID){

    this.presentToast();
    let loader = this.loadingCtrl.create({
      content: 'sending .....',
    });
    this.alertmessage = "Successfuly approved";

    this.service.approve(userID,this.accountStatus)
      .subscribe(
        data => {
        if(data.message=='activated'){
          this.toastmeassage ='approved'
          this.presentToast();
          this.ionViewDidEnter();
          this.getall();
        }

        },
        error => {
        if(error==201){

        }

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
      duration: 1000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
