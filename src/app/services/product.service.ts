import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { CreateProduct, Updateproduct } from '../models/create-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

 private baseurl="https://localhost:7100/api/Product/GetAllProduct";
 private createurl="https://localhost:7100/api/Product/CreateProduct";
 private getbyseller="https://localhost:7100/api/Product/GetAllProductBySellerId/3"
 private productId="https://localhost:7100/api/Product/GetProductbyId";
 private EditQuantity="https://localhost:7100/api/Product/EditQuantity";
 private DelteProduct="https://localhost:7100/api/Product/DeleteProduct"
  constructor(private httpclient:HttpClient) {}

  getAll()
  {
     return this.httpclient.get<Product[]>(this.baseurl);
  }
  getAllBySellerId(){
    return this.httpclient.get<Product[]>(this.getbyseller);
  }
  getbyproductId(id:number){
    return this.httpclient.get<Product>(`${this.productId}/${id}`);
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
  update(addproduct:Updateproduct,id:number){
    return this.httpclient.put(`${this.EditQuantity}/${id}`,addproduct);
  }
  Delte(id:number){
    return this.httpclient.delete(`${this.DelteProduct}/${id}`);

  }
}
