import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AlertController} from "ionic-angular";
import 'rxjs/add/operator/map'
/*
  Generated class for the SystemserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SystemserviceProvider {
Localhost = "http://ec2-34-240-133-21.eu-west-1.compute.amazonaws.com:3000";
// dev ='http://ec2-34-240-133-21.eu-west-1.compute.amazonaws.com:3000/';
  constructor(public http: HttpClient,public alertCtrl: AlertController) {



    console.log('Hello SystemserviceProvider Provider');
  }

  login(username: string, password: string) {
    return this.http.post<any>(this.Localhost+'/admin/login', { username: username, password: password })
      .map(user => {
        // login successful if there's a jwt token in the response
        console.log(user.status);
        if(user.status===401){
          this.showAlert();
        }

        return user;
      });
  }


  getProducts() {
    return this.http.get<any>(this.Localhost+'/products',)
      .map(user => {
        // login successful if there's a jwt token in the response
        console.log(user.status);
        if(user.status===201){
          // this.showAlert();
        }

        return user;
      });


  }

  Prodcast(message:string) {
    return this.http.post<any>(this.Localhost+'/prodcast',{message:message})
      .map(user => {
        // login successful if there's a jwt token in the response
        console.log(user.status);
        if(user.status===201){
          // this.showAlert();
        }

        return user;
      });


  }
  getOrders() {
    return this.http.get<any>(this.Localhost+'/sell',)
      .map(user => {
        // login successful if there's a jwt token in the response
        console.log(user.status);
        if(user.status===201){
          // this.showAlert();
        }

        return user;
      });


  }
  getAllOrders() {
    return this.http.get<any>(this.Localhost+'/sellsALL',)
      .map(user => {
        // login successful if there's a jwt token in the response
        console.log(user.status);
        if(user.status===201){
          // this.showAlert();
        }

        return user;
      });


  }
  sendmessageforDevilery() {

    return this.http.get<any>(this.Localhost+'/order/gcm',)
      .map(user => {
        // login successful if there's a jwt token in the response
        if(user.status===201){
          // this.showAlert();
        }

        return user;
      });


  }


  Register(username: string, password: string,gcmID:string) {
    return this.http.post<any>(this.Localhost+'/admin', { username: username, password: password ,gcmID:gcmID })
      .map(user => {
       console.log(user.status)
return user;
      });
  }



  PostNews(description: string, DatetimeSent: string) {
    return this.http.post<any>(this.Localhost+'/news', { description: description, DatetimeSent: DatetimeSent })
      .map(user => {
        // login successful if there's a jwt token in the response
        console.log(user.status);
        if(user.status===401){
          this.showAlert();
        }

        return user;
      });
  }
  PostGcm() {
    return this.http.get<any>(this.Localhost+'/news')
      .map(user => {
        // login successful if there's a jwt token in the response
        console.log(user.status);
        if(user.status===401){
          this.showAlert();
        }

        return user;
      });
  }
  GetNews() {
    return this.http.get<any>(this.Localhost+'/adminNews')
      .map(user => {
        // login successful if there's a jwt token in the response
        console.log(user.status);
        if(user.status===401){
          this.showAlert();
        }

        return user;
      });
  }
  shopNow(Totalprice: number, CustomerName: string,cellphonenumbers:string,details:string,status:string,) {
    return this.http.post<any>(this.Localhost+'sell', { Totalprice: Totalprice, CustomerName: CustomerName ,callphonenumbers:cellphonenumbers,details:details,status:status, })
      .map(user => {
        // login successful if there's a jwt token in the response
        console.log(user.status);
        if(user.status===401){
          this.showAlert();
        }

        return user;
      });
  }

  addProduct(name: string, description: string,price:string,imageUrl:string) {

    return this.http.post<any>(this.Localhost+'/product', { name: name, description: description ,price:price,ImageUrl:imageUrl })
      .map(user => {
        // login successful if there's a jwt token in the response
       console.log(user);
        return user;
      });
  }

  logout() {
    // remove user from local storage to log user out

  }
  showAlert() {
    let alert = this.alertCtrl.create({
      subTitle: 'Incorrect Username or Password',
      buttons: ['OK']
    });
    alert.present();
  }

  public handleError(error: Response) {

  }
  approve(userId: string,accountStatus:string) {
    return this.http.put<any>(this.Localhost+`/usersEdit/${userId}`, {accountStatus:accountStatus})
      .map(user => {
        // login successful if there's a jwt token in the response
        console.log(user.status);
        if(user.status===201){
          // this.showAlert();
        }

        return user;
      });
  }

  DeleteNews(Id: string) {
    return this.http.post<any>(this.Localhost+`/newsDelete`, {_id:Id})
      .map(user => {
        // login successful if there's a jwt token in the response
        console.log(user.status);
        if(user.status===201){
          // this.showAlert();
        }

        return user;
      });
  }

  DeleteProduct(Id: string) {
    return this.http.post<any>(this.Localhost+`/products`, {_id:Id})
      .map(user => {
        // login successful if there's a jwt token in the response
        console.log(user.status);
        if(user.status===201){
          // this.showAlert();
        }

        return user;
      });
  }
  getallUsers() {
    return this.http.get<any>(this.Localhost+'/ivy/users',)
      .map(user => {
        // login successful if there's a jwt token in the response
        console.log(user.status);
        if(user.status===201){
          // this.showAlert();
        }

        return user;
      });


  }



}
