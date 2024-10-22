import { Component } from '@angular/core';
import { CreateProduct } from '../../models/create-product';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addproducts',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css'] // Correct styleUrls
})
export class AddproductsComponent {
  product: CreateProduct = new CreateProduct();

  constructor(private productservices: ProductService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.product.Image = file;
    }
  }

  addProduct() {
    this.productservices.add(this.product).subscribe(response => {
      console.log('Product added successfully', response);
    }, error => {
      console.error('Error adding product', error);
      console.error('Full error response:', JSON.stringify(error, null, 2))
    });
  }
}
