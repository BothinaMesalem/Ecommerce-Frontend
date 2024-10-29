import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddOrder } from '../models/add-order';

@Injectable({
  providedIn: 'root'
})
export class AddOrderService {
  private baseurl="https://localhost:7100/api/Order/CreateOrder"
  constructor(private httpclient:HttpClient) { }
  addOrder(addorder:AddOrder){

    return this.httpclient.post(this.baseurl, addorder, { headers: { 'Content-Type': 'application/json' }, responseType: 'text' as 'json' });
  }
  
}
