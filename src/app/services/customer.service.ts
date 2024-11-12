import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer, EditCustomer } from '../models/customer';
import { Signup } from '../models/signup';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
   private getcustomer="https://localhost:7100/api/Customer/GetCustomerdatabyId";
   private upcustomer="https://localhost:7100/api/Customer/EditCustomerProfile";
   private sign="https://localhost:7100/api/Customer/UserSignUP";
  constructor(private httpclient:HttpClient) { }

  getbyId(id:number){
    return this.httpclient.get<Customer>(`${this.getcustomer}/${id}`);
  }
  Update(editcustomer:EditCustomer,id:number){
   return this.httpclient.put(`${this.upcustomer}/${id}`,editcustomer);
  }
  Createuser(signup:Signup){
    return this.httpclient.post(this.sign,signup);

  }
}
