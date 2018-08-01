import {Component, ViewChild} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FCM } from '@ionic-native/fcm';
import { TabsPage } from '../pages/tabs/tabs';
import {ContactPage} from "../pages/contact/contact";
import {MenuPage} from "../pages/menu/menu";
import {ShopPage} from "../pages/shop/shop";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
   rootPage: any = MenuPage;
  @ViewChild('myNav') navCtrl: NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public fcm: FCM) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

    });
  }


}
