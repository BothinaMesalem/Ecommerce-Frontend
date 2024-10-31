import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EditProduct, Product } from '../models/product';
import { CreateProduct, Updateproduct } from '../models/create-product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

 private baseurl="https://localhost:7100/api/Product/GetAllProduct";
 private createurl="https://localhost:7100/api/Product/CreateProduct";
 private getbyseller="https://localhost:7100/api/Product/GetAllProductBySellerId/3"
 private productId="https://localhost:7100/api/Product/GetProductbyId";
 private EditQuantity="https://localhost:7100/api/Product/EditQuantity";
 private DelteProduct="https://localhost:7100/api/Product/DeleteProduct";
 private EditProduct="https://localhost:7100/api/Product/EditProduct";
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
   
    addproduct.Size.forEach((size) => {
      formdata.append("Size", size); 
    });
    formdata.append("UserId",addproduct.UserId.toString());
    if(addproduct.Image){
      formdata.append("Image",addproduct.Image);
    }
    formdata.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });


    return this.httpclient.post(this.createurl, formdata, { responseType: 'text' as 'json' });
  }
  
  Edit(upProduct:EditProduct,id:number){
     const uproduct=new FormData();
     uproduct.append("productName",upProduct.productName);
     uproduct.append("productDescription",upProduct.productDescription);
     uproduct.append("price",upProduct.price.toString());
     uproduct.append("stack_qty",upProduct.stack_qty.toString());
     
     upProduct.size.forEach((size) => {
      uproduct.append("size", size);
  });

    
    if(upProduct.image){
      uproduct.append("image",upProduct.image);
    }
    uproduct.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });


    return this.httpclient.put(`${this.EditProduct}/${id}`, uproduct, { responseType: 'text' as 'json' });
  }
  update(addproduct:Updateproduct,id:number){
    return this.httpclient.put(`${this.EditQuantity}/${id}`,addproduct);
  }
  Delte(id:number){
    return this.httpclient.delete(`${this.DelteProduct}/${id}`);

  }
  getProductById(id: number): Observable<EditProduct> {
    return this.httpclient.get<EditProduct>(`https://localhost:7100/api/Product/GetProductbyId/${id}`);
  }
  
}
