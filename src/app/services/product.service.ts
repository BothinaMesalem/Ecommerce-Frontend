import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { CreateProduct } from '../models/create-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

 private baseurl="https://localhost:7100/api/Product/GetAllProduct";
 private createurl="https://localhost:7100/api/Product/CreateProduct"
  constructor(private httpclient:HttpClient) {}

  getAll()
  {
     return this.httpclient.get<Product[]>(this.baseurl);
  }
  add(addproduct:CreateProduct){
    const formdata=new FormData();
    formdata.append("ProductName",addproduct.ProductName);
    formdata.append("ProductDescription",addproduct.ProductDescription);
    formdata.append("Price",addproduct.Price.toString());
    formdata.append("Stack_qty",addproduct.Stack_qty.toString());
    formdata.append("size",addproduct.size);
    formdata.append("UserId",addproduct.UserId.toString());
    if(addproduct.Image){
      formdata.append("Image",addproduct.Image);
    }
    formdata.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });


    return this.httpclient.post(this.createurl, formdata, { responseType: 'text' as 'json' });
  }
}
