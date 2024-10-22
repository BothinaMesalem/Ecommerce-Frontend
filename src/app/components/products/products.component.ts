import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products:Product[]=[];

  constructor(private productservice:ProductService){}

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


}
