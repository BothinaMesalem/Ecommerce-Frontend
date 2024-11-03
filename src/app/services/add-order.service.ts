import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddOrder, OrderDetails } from '../models/add-order';
import { Order, OrderDeatailquantity, OrderQuantityDto } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class AddOrderService {
  private baseurl="https://localhost:7100/api/Order/CreateOrder";
  private geturl="https://localhost:7100/api/Order/GetOrderByUserId";
  private editqty="https://localhost:7100/api/Order/EditQuantity"
  constructor(private httpclient:HttpClient) { }
  addOrder(addorder:AddOrder){

    return this.httpclient.post(this.baseurl, addorder, { headers: { 'Content-Type': 'application/json' }, responseType: 'text' as 'json' });
  }
  getAll(id:number){
    return this.httpclient.get<Order[]>(`${this.geturl}/${id}`);
  }
  updateqty(orderId: number, orderQuantityDto:OrderQuantityDto) {
  
    return this.httpclient.put(`${this.editqty}/${orderId}`, orderQuantityDto, { headers: { 'Content-Type': 'application/json' }, responseType: 'text' as 'json' });
  }
  
}
