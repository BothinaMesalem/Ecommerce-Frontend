import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { RouterLink } from '@angular/router';
import { AddOrderService } from '../../services/add-order.service';
import { AddOrder } from '../../models/add-order';

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

  // addtocart(): void {
  //   if (this.selectedProduct) {
  //     const orprice = this.selectedProduct.price;
  //     const neworder:AddOrder = {
  //       OrderPrice: orprice,
  //       ProductId: this.selectedProduct.productId,
  //       Quantity: this.quantity,
  //       Size: this.selectedSize,
  //       OrderId:2
  //       // Remove OrderId if it's not needed in the request payload
  //     };
      
  //     this.addorderservices.addOrder(neworder).subscribe(
  //       response => {
  //         console.log("Order added successfully", response);
  //       },
  //       error => {
  //         console.error("Error adding order", error);
  //       }
  //     );
  //   } else {
  //     console.log("No product selected.");
  //   }
  // }
  // selectandadd(product: Product){
   
  //   this.selectProduct(product);
  //   this.addtocart();
  // }
  


}
