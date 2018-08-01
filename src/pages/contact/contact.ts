import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController, ToastController} from 'ionic-angular';
import {SystemserviceProvider} from "../../providers/systemservice/systemservice";
import {MyApp} from "../../app/app.component";
import {File} from "@ionic-native/file";
import {Camera, CameraOptions} from "@ionic-native/camera";

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  Admin = {name: '', description: '',price:'',ImageUrl:''};
  alertmessage='';
  varcounterrorLogin =0;
  toastmeassage="";
  productsData:any
  productID:any
  imageURI:any;
  imageFileName:any
  Urlupload ="";
  constructor(public navCtrl: NavController,public service:SystemserviceProvider,public alertCtrl: AlertController,private toastCtrl: ToastController,public loadingCtrl: LoadingController, private transfer: FileTransfer, private file: File ,private camera: Camera) {
    this.imageFileName = "http://22.247.15.115/uploads/8a9e5a050dfd807548582bc3c4fff08d"

  }
  ionViewDidLoad() {


  }

  ionViewDidEnter(){
    this.getall();
  }

  addProduct(){
    this.varcounterrorLogin=0;
    if(this.imageURI===''){
      this.varcounterrorLogin++;
      console.log("password empty");
      console.log("password "+ this.varcounterrorLogin);
    }
    if(this.Admin.name===''){
      this.varcounterrorLogin++;

    }
    if(this.Admin.description===''){
      this.varcounterrorLogin++;
      console.log("username"+ this.varcounterrorLogin);
    }

    if(this.Admin.price===''){
      this.varcounterrorLogin++;
      console.log("username"+ this.varcounterrorLogin);
    }
    if(this.varcounterrorLogin>0){
      this.alertmessage ="enter all fields";
      this.showAlert();
    }else {


    this.uploadFile();
    }
    }

    recordNow(){
      let loader = this.loadingCtrl.create({
        content: 'loading .....',
      });
      this.service.addProduct(this.Admin.name,this.Admin.description,this.Admin.price,this.Urlupload)
        .subscribe(
          data => {
            if(data.message==="created"){
              this.toastmeassage = 'Successfully created'
              this. presentToast();
              this.ionViewDidEnter();

            }

            this.ionViewDidEnter();

          },
          error => {
            if(error.status===409){

              this.showAlert();
            }

          });
      loader.dismissAll();
    }
  showPrompt(id,name,description ,price) {
    let prompt = this.alertCtrl.create({
      title: name,
      inputs: [


        {
          name: price,
          placeholder: 'price'
        },
        {
          name: description,
          placeholder: 'description'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }


  showPromptDelete(id) {
    let prompt = this.alertCtrl.create({
      message: "Are sure you want to delete this products",

      buttons: [
        {
          text: 'Yes',
          handler: data => {
            this.geleteProduct(id)
          }
        },
        {
          text: 'No',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }


  showAlert() {
    let alert = this.alertCtrl.create({
      subTitle: this.alertmessage,
      buttons: ['OK']
    });
    alert.present();
  }

  getall(){
    this.service.getProducts()
      .subscribe(
        data => {
          this.productsData = data

           console.log(JSON.stringify(data));

        },
        error => {


        });
  }



  geleteProduct(id:string){
    console.log(id);
    this.service.DeleteProduct(id)
      .subscribe(
        data => {

             if(data.message==='deleted'){
               this.toastmeassage = 'deleted'
               this.presentToast();
             }
          console.log("hy");

        },
        error => {


        });
  }
  presentToast() {

    console.log('ALERT');
    let toast = this.toastCtrl.create({
      message: this.toastmeassage,
      duration: 5000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
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

    fileTransfer.upload(this.imageURI, 'http://ec2-34-240-133-21.eu-west-1.compute.amazonaws.com:3000/Upload', options)
      .then((data:any) => {
                   this.Urlupload= data.response.toString();
                   if(this.Urlupload==''){

                   }else {
                     this.recordNow();

                   }


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
