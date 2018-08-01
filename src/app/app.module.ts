import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { FCM } from '@ionic-native/fcm';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {MenuPageModule} from "../pages/menu/menu.module";
import { SystemserviceProvider } from '../providers/systemservice/systemservice';
import {HttpClientModule} from "@angular/common/http";
import {LocalStorageService} from "angular-2-local-storage";
import {ShopPageModule} from "../pages/shop/shop.module";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    MenuPageModule,
    ShopPageModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,

    FCM,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SystemserviceProvider,
    FileTransfer,
    FileTransferObject,
    File,
    Camera

  ]
})
export class AppModule {}
