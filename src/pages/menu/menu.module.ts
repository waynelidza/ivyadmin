import {ErrorHandler, NgModule} from '@angular/core';
import {IonicErrorHandler, IonicPageModule} from 'ionic-angular';
import { MenuPage } from './menu';
import {LocalStorageService} from "angular-2-local-storage";


@NgModule({
  declarations: [
    MenuPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuPage),
  ],
  providers: [

    {provide: ErrorHandler, useClass: IonicErrorHandler},

  ]
})
export class MenuPageModule {}
