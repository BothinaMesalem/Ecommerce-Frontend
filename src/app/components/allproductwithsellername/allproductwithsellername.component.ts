import { Component, OnInit } from '@angular/core';
import { AllProductWithSeller } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-allproductwithsellername',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './allproductwithsellername.component.html',
  styleUrl: './allproductwithsellername.component.css'
})
export class AllproductwithsellernameComponent implements OnInit {
   allproducts:AllProductWithSeller[]=[];
   constructor(private productServices:ProductService){}

   ngOnInit(): void {
     this.productServices.getallproductwithseller().subscribe((data:AllProductWithSeller[])=>{
      this.allproducts=data.map(product=>({
        ...product,
        image:this.convertImage(product.image)
      }))
     })
   }
   convertImage(base64Image: string): string {
    return `data:image/png;base64,${base64Image}`;
  }

}
