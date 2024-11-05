import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Checkout } from '../models/checkout';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
 private addinfo="https://localhost:7100/api/Checkout/AddUserInfo";
  constructor(private httpclient:HttpClient) { }

  Add(checkout:Checkout){
   return this.httpclient.post(this.addinfo,checkout, { responseType: 'text' })
  }
}
