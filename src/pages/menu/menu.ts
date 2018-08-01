import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {SystemserviceProvider} from "../../providers/systemservice/systemservice";
import {FCM} from "@ionic-native/fcm";
import {MyApp} from "../../app/app.component";
import {TabsPage} from "../tabs/tabs";
import {AboutPage} from "../about/about";
import {NativeStorage} from "@ionic-native/native-storage";
import {LocalStorageService} from "angular-2-local-storage";

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  Admin = {username: '', password: '',gcmID:''};
  Adminlogin = {username: '', password: ''};
  alertmessage='';
  varcounterrorLogin =0;
  toastmeassage="";
  error :any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public service:SystemserviceProvider,public alertCtrl: AlertController,public fcm: FCM,private toastCtrl: ToastController,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {

    this.setupGcm();
  }
  registerMe(){

    this.varcounterrorLogin=0;
    if(this.Admin.password===''){

    }
    if(this.Admin.username===''){
      this.varcounterrorLogin++;
      console.log("username"+ this.varcounterrorLogin);
    }
    if(this.varcounterrorLogin>0){
      this.alertmessage =" enter username and password";
      this.showAlert();
    }
    this.presentToast();
    let loader = this.loadingCtrl.create({
      content: 'loading .....',
    });
   this.service.Register(this.Admin.username,this.Admin.password,this.Admin.gcmID)
      .subscribe(
        data => {
          console.log(data.message);
                if(data.message==="created"){
                  this.toastmeassage = 'Successfully register please login'
                  this. presentToast();

                }

         // this.navCtrl.push(TabsPage);

            },
        error => {
          if(error.status===409){
            this.alertmessage ="username you have entered exist";
            this.showAlert();
          }

        });
    loader.dismiss();

  }

  letsLogin(){
this.varcounterrorLogin =0;
    if(this.Adminlogin.password===''){
      this.varcounterrorLogin++;

      console.log("password "+ this.varcounterrorLogin);
    }
    if(this.Adminlogin.username===''){
      this.varcounterrorLogin++;
      console.log("username"+ this.varcounterrorLogin);
    }
  if(this.varcounterrorLogin>0){
    this.alertmessage =" enter username and password";
    this.showAlert();
  }

    else {
        let loader = this.loadingCtrl.create({
      content: 'loading .....',
    });
      this.service.login(this.Adminlogin.username,this.Adminlogin.password)
        .subscribe(
          data => {

            if(!data){

            }else {

               this.navCtrl.push(TabsPage);


            }

          },
          error => {
            if(error.status===401){
              this.alertmessage ="Incorrect Username or Password'";
              this.showAlert();

            }

            if(error.status===0){
              this.alertmessage ="not internet connection";
              this.showAlert();
            }

          });
    loader.dismiss();
    }

  }
  setMessage(statuscode:string){
    alert(statuscode);
//     switch(statuscode){
//       case "409":
//            this.alertmessage ="Phonenumber you have entered exist";
//     console.log('iniseide');
//             break;
//     }

    if(statuscode==='409'){
      alert('if');
      this.alertmessage ="Phonenumber you have entered exist";
      this.showAlert();
    }
  }
  showAlert() {

    console.log("aletr");
    let alert = this.alertCtrl.create({
      subTitle: this.alertmessage,
      buttons: ['OK']
    });
    alert.present();
  }
  setupGcm() {
    this.fcm.getToken().then(token => {
      // Your best bet is to here store the token on the user's profile on the
      // Firebase database, so that when you want to send notifications to this
      // specific user you can do it from Cloud Functions.
        this.Admin.gcmID =token;

      console.log("data token");
    });


    this.fcm.onNotification().subscribe(data => {
      if (data.wasTapped) {
        //Notification was received on device tray and tapped by the user.
        console.log(JSON.stringify(data));
        console.log("data if");
        this.navCtrl.push('AboutPage');

      } else {
        //Notification was received in foreground. Maybe the user needs to be notified.
        console.log(JSON.stringify(data));

        console.log("data else");
        this.navCtrl.push('ContactPage', { profileId: data.profileId });
      }

    });
  }
  presentToast() {

    console.log('ALERT');
    let toast = this.toastCtrl.create({
      message: this.toastmeassage,
      duration: 6000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Low battery',
      subTitle: '10% of battery remaining',
      buttons: ['Dismiss']
    });
    alert.present();
  }
}
