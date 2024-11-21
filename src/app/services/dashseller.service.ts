import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashsellerService {

  private Cproduct="https://localhost:7100/api/Product/GetCountOfProductsbysellerid";
  private Corder="https://localhost:7100/api/Order/GetordersCounttoseller";
  private Cordershipped="https://localhost:7100/api/Order/GetCountOrderShippedbySeller";
  private Corderdeliverd="https://localhost:7100/api/Order/GetCountOrderDeliveredbySeller";
  private Corderpending="https://localhost:7100/api/Order/GetCountOrderPendingbySeller";
  private pinstock="https://localhost:7100/api/Product/GetCountProductsthatinstockbyseller";
  private Poutstock="https://localhost:7100/api/Product/GetCountProductsthatoutstockbyseller"

  constructor(private httpclient:HttpClient) { }

  GetProducts(id:number){
    return this.httpclient.get<number>(`${this.Cproduct}/${id}`);
  }
  GetOrders(id:number){
    return this.httpclient.get<number>(`${this.Corder}/${id}`);
  }
  GetOrderShipped(id:number){
    return this.httpclient.get<number>(`${this.Cordershipped}/${id}`);
  }
  GetOrderDelivered(id:number){
    return this.httpclient.get<number>(`${this.Corderdeliverd}/${id}`);
  }
  GetOrderPending(id:number){
    return this.httpclient.get<number>(`${this.Corderpending}/${id}`);
  }
  GetProductInStock(id:number){
    return this.httpclient.get<number>(`${this.pinstock}/${id}`)
  }
  GetProductOutStock(id:number){
    return this.httpclient.get<number>(`${this.Poutstock}/${id}`)
  }

}
