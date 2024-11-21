import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashadminService {
   private Cproduct="https://localhost:7100/api/Product/GetCountOfProducts";
   private Corders="https://localhost:7100/api/Order/GetCountofOrders"
   private Ccustomers="https://localhost:7100/api/Customer/GetCountofCustomer";
   private Cseller="https://localhost:7100/api/Seller/GetCountofSellers";
   private Cordershipped="https://localhost:7100/api/Order/GetCountOrderShipped";
   private Corderdeliverd="https://localhost:7100/api/Order/GetCountOrderDelivered";
   private Corderpending="https://localhost:7100/api/Order/GetCountOrderPending";

  constructor(private httpclient:HttpClient) { }

  GetProducts(){
    return this.httpclient.get<number>(this.Cproduct);
  }
  GetOrders(){
    return this.httpclient.get<number>(this.Corders);
  }
  GetCustomers(){
    return this.httpclient.get<number>(this.Ccustomers);
  }
  GetSellers(){
    return this.httpclient.get<number>(this.Cseller);
  }
  GetOrderShipped(){
    return this.httpclient.get<number>(this.Cordershipped);
  }
  GetOrderDelivered(){
    return this.httpclient.get<number>(this.Corderdeliverd);
  }
  GetOrderPending(){
    return this.httpclient.get<number>(this.Corderpending);
  }


  
}
