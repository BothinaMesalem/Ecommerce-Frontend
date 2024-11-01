import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddSeller, Seller } from '../models/seller';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private geAll="https://localhost:7100/api/Seller/GetAllSeller";
  private adseller="https://localhost:7100/api/Seller/AddSeller";
  private removeseller="https://localhost:7100/api/Seller/DeleteSeller"



  constructor(private httpclient:HttpClient) { }

  getAll(){
    return this.httpclient.get<Seller[]>(this.geAll);
  }
  AddSeller(addseller:AddSeller){
    return this.httpclient.post(this.adseller,addseller,{ responseType: 'text' as 'json' });
  }
  Delete(id:number){
    return this.httpclient.delete(`${this.removeseller}/${id}`)
  }

}
