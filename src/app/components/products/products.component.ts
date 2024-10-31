import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { RouterLink } from '@angular/router';
import { AddOrderService } from '../../services/add-order.service';
import { AddOrder, OrderDetails } from '../../models/add-order';
import { Updateproduct } from '../../models/create-product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule,CommonModule,NavComponent,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products:Product[]=[];
  selectedProduct ?:Product;
  orderPrice: number = 0;
  quantity: number = 1;
  selectedSize: string = "";

  constructor(private productservice:ProductService,private addorderservices:AddOrderService){}

  ngOnInit(): void {
    this.productservice.getAll().subscribe((data:Product [])=>
      this.products = data.map(product => ({
        ...product,
        image: this.convertImage(product.image)
      
        
      }))
     
    )
   
  }
  convertImage(base64Image: string): string {
    return `data:image/png;base64,${base64Image}`;
  }

  selectProduct(product: Product): void {
    this.selectedProduct = product;
    console.log("this is selected");
  }

  addtocart(): void {
    if (this.selectedProduct) {
      const orprice=this.selectedProduct.price*this.quantity;

      const orderdetails:OrderDetails={
        orderPrice:this.selectedProduct.price,
        quantity:this.quantity,
        productId:this.selectedProduct.productId,
        size:this.selectedSize,

      }
      const neworder :AddOrder ={
        totalamount:orprice,
        userId:3,
        order_date:new Date(),
       orderDetails:[orderdetails]
      };
      
      this.addorderservices.addOrder(neworder).subscribe(
        response => {
          console.log("Order added successfully", response);
          this.editquantity();
        },
        error => {
          console.error("Error adding order", error);
        }
      );
    } else {
      console.log("No product selected.");
    }
  }
  selectandadd(product: Product){
   
    this.selectProduct(product);
    this.addtocart();
  }
  
  editquantity(){
    if(this.selectedProduct){
    const updateproduct:Updateproduct={
       stack_qty:this.selectedProduct.stack_qty-this.quantity,
    };
    this.productservice.update(updateproduct,this.selectedProduct.productId).subscribe(response=>{
      console.log("EDit successfully")
    },error=>{
      console.log("error when edit")
    }) 
  }

  }


}