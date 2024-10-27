import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.css'
})
export class ProductdetailsComponent  implements OnInit {
  product: Product | null = null;
  constructor(private productservice:ProductService,private route:ActivatedRoute){}
  
  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('id')!;
    this.productservice.getbyproductId(productId).subscribe((data: Product) => {
      this.product = {
        ...data,
        image: this.convertImage(data.image)
      };
    });
  }
  
  convertImage(base64Image: string): string {
    return `data:image/png;base64,${base64Image}`;
  }

}
