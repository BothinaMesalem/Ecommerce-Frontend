import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-allproductseller',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './allproductseller.component.html',
  styleUrl: './allproductseller.component.css'
})
export class AllproductsellerComponent implements OnInit {
  products:Product[]=[];
  constructor(private productservice:ProductService){}
  
  ngOnInit(): void {
    this.productservice.getAllBySellerId().subscribe((data:Product [])=>
      this.products = data.map(product => ({
        ...product,
        image: this.convertImage(product.image)
      
        
      }))
     
    )
   
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
      },
      error => {
        console.error("Can't delete", error);
      }
    );
  }
  

}
