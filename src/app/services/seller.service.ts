import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddSeller, EditSeller, Seller } from '../models/seller';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private geAll="https://localhost:7100/api/Seller/GetAllSeller";
  private adseller="https://localhost:7100/api/Seller/AddSeller";
  private removeseller="https://localhost:7100/api/Seller/DeleteSeller";
  private getseller="https://localhost:7100/api/Seller/GetSellerbyId"
  private upseller="https://localhost:7100/api/Seller/EditSellerProfile"



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
  getbyId(id:number){
    return this.httpclient.get<Seller>(`${this.getseller}/${id}`)
  }
  Update(editseller:EditSeller,id:number){
    return this.httpclient.put(`${this.upseller}/${id}`,editseller);
  }


}
