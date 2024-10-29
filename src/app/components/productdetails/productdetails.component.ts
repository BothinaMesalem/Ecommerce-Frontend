import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddOrderService } from '../../services/add-order.service';
import { AddOrder, OrderDetails } from '../../models/add-order';
import { response } from 'express';
import { error } from 'console';
import { CreateProduct, Updateproduct } from '../../models/create-product';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.css'
})
export class ProductdetailsComponent  implements OnInit {
  product: Product | null = null;
  orderPrice: number = 0;
  quantity: number = 1;
  selectedSize: string = "";
  constructor(private productservice:ProductService,private route:ActivatedRoute,private addorderservices:AddOrderService){}
  
  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('id')!;
    this.productservice.getbyproductId(productId).subscribe((data: Product) => {
        console.log('Product data received:', data);
      this.product = {
        ...data,
        image: this.convertImage(data.image),
      
      };
      // this.orderPrice = data.price; 
    });
  }
  minus(){
    if(this.quantity>1){
      this.quantity--;
    }
  }
  plus(){
 
    if (this.product) {
      console.log('Current quantity:', this.quantity);
      console.log('Stack quantity:', this.product.stack_qty);

      if (this.quantity < this.product.stack_qty) {
        this.quantity++;
      } else {
        console.warn('Cannot increment: Quantity exceeds stack quantity.');
      }
    } 
  
    
  }
  
  convertImage(base64Image: string): string {
    return `data:image/png;base64,${base64Image}`;
  }
  addtoorder():void{
    if (this.product){
      const orprice=this.product.price*this.quantity;

      const orderdetails:OrderDetails={
        orderPrice:this.product.price,
        quantity:this.quantity,
        productId:this.product.productId,
        size:this.selectedSize,

      }
      const neworder :AddOrder ={
        totalamount:orprice,
        userId:3,
        order_date:new Date(),
       orderDetails:[orderdetails]
      };
    
      this.addorderservices.addOrder(neworder).subscribe(response=>{
            console.log("this added succeffly",response);
            this.editquantity();
            
      },error=>{
        console.log("error when added",error);
      });
      
     
      }
     
    }
    editquantity(){
      if(this.product){
      const updateproduct:Updateproduct={
         stack_qty:this.product.stack_qty-this.quantity,
      };
      this.productservice.update(updateproduct,this.product.productId).subscribe(response=>{
        console.log("EDit successfully")
      },error=>{
        console.log("error when edit")
      }) 
    }

    }

  }


