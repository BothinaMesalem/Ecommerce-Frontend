import { Component, OnInit } from '@angular/core';
import { AllProductWithSeller } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-allproductwithsellername',
  standalone: true,
  imports: [FormsModule,CommonModule,NavComponent],
  templateUrl: './allproductwithsellername.component.html',
  styleUrl: './allproductwithsellername.component.css'
})
export class AllproductwithsellernameComponent implements OnInit {
   allproducts:AllProductWithSeller[]=[];
   filteredProducts:AllProductWithSeller[]=[];
   searchQuery:string="";
   stockFilter: string = "";

   constructor(private productServices:ProductService){}

   ngOnInit(): void {
     this.productServices.getallproductwithseller().subscribe((data:AllProductWithSeller[])=>{
      this.allproducts=data.map(product=>({
        ...product,
        image:this.convertImage(product.image)
      }));
      this.filteredProducts=this.allproducts;
     })
   }
   convertImage(base64Image: string): string {
    return `data:image/png;base64,${base64Image}`;
  }
  onSearchChange(): void {
   
  this.filteredProducts = this.allproducts.filter((product) => {
      
      const matchesProductName = product.userName.toLowerCase().includes(this.searchQuery.toLowerCase());

    
      let matchesStockStatus = true;
      if (this.stockFilter === 'in-stock') {
        matchesStockStatus = product.stack_qty > 0;
      } else if (this.stockFilter === 'out-of-stock') {
        matchesStockStatus = product.stack_qty <= 0;  
      }

      return matchesProductName && matchesStockStatus;
    });
  
  }
}
