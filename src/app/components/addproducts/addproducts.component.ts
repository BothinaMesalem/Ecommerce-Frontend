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
  styleUrls: ['./addproducts.component.css'] 
})
export class AddproductsComponent {
  product: CreateProduct = new CreateProduct();
  newSize: string = "";

  constructor(private productservices: ProductService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.product.Image = file;
    }
  }
  addSize() {
    if (this.newSize) {
      this.product.Size.push(this.newSize);
      this.newSize = ""; 
    }
  }

  removeSize(index: number) {
    this.product.Size.splice(index, 1);
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
