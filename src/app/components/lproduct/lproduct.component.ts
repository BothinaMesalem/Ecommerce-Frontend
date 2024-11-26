import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { AddOrderService } from '../../services/add-order.service';
import { AddOrder, OrderDetails } from '../../models/add-order';
import { Updateproduct } from '../../models/create-product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lproduct',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './lproduct.component.html',
  styleUrl: './lproduct.component.css'
})
export class LproductComponent implements OnInit {
  products:Product[]=[];
  selectedProduct ?:Product;
  orderPrice: number = 0;
  quantity: number = 1;
  selectedSize: string = "";
  UserId:number|null=null;
  
  constructor(private productServices:ProductService,private addorderservices:AddOrderService,private router:Router,private snackBar: MatSnackBar){}
  
  ngOnInit(): void {
    const storedUserId=localStorage.getItem("userId");
    if(storedUserId){
      this.UserId=parseInt(storedUserId,10);
    }
    this.productServices.getLastproduct().subscribe((data:Product [])=>
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
  selectSize(size: string): void {
    if (size) {
      this.selectedSize = size;
      console.log("Size selected:", this.selectedSize);
    } else {
      console.log("Please select a size.");
    }
  }
  
  addtocart(): void {
    if (this.UserId) {
      if (this.selectedProduct) {
        if (!this.selectedSize) {
          this.snackBar.open('Please select a size before adding to the cart.', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          return;
        }
  
        const orprice = this.selectedProduct.price * this.quantity;
  
        const orderdetails: OrderDetails = {
          orderPrice: this.selectedProduct.price,
          quantity: this.quantity,
          productId: this.selectedProduct.productId,
          size: this.selectedSize,
        };
  
        const neworder: AddOrder = {
          totalamount: orprice,
          userId: this.UserId,
          order_date: new Date(),
          orderDetails: [orderdetails],
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
    } else {
      console.log("No user logged in.");
      this.router.navigate(['/login']);
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
    this.productServices.update(updateproduct,this.selectedProduct.productId).subscribe(response=>{
      console.log("EDit successfully")
    },error=>{
      console.log("error when edit")
    }) 
  }
  
  }
  
}
