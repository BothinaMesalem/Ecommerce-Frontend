import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { response } from 'express';
import { error } from 'console';
import { RouterLink } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-allproductseller',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink,NavComponent],
  templateUrl: './allproductseller.component.html',
  styleUrl: './allproductseller.component.css'
})
export class AllproductsellerComponent implements OnInit {
  products:Product[]=[];
  SellerId:number=0;
  constructor(private productservice:ProductService){}
  
  ngOnInit(): void {
    const storedSellerId = localStorage.getItem('userId'); 
    if (storedSellerId) {
      this.SellerId = parseInt(storedSellerId, 10); 
      console.log("SellerId",storedSellerId)
      this.getall();
      
    } else {
      console.error("Seller ID not found in localStorage");
    }
   
  }

  getall() {
    this.productservice.getAllBySellerId(this.SellerId).subscribe(
      (data: Product[]) => {
        this.products = data.map(product => ({
          ...product,
          image: this.convertImage(product.image)
        }));
        
        // Log the products array to the console
        console.log("Products:", this.products);
      },
      error => {
        console.error("Error fetching products", error);
      }
    );
  }
  
  convertImage(base64Image: string): string {
    return `data:image/png;base64,${base64Image}`;
  }
  deleteproduct(id: number) {
    console.log("Deleting product with ID:", id);
    this.productservice.Delte(id).subscribe(
      response => {
        console.log("Deleted successfully", response);
        this.products = this.products.filter(product => product.productId !== id);
        Swal.fire(
          'Deleted!',
          'The Product has been deleted.',
          'success'
        );
      },
      error => {
        console.log("Can't delete", error);
        Swal.fire(
          'Error!',
          'There was an issue deleting the product.',
          'error'
        );
      }
    );
  }
  

}
