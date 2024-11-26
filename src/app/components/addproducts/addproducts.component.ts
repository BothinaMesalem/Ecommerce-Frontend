import { Component, OnInit } from '@angular/core';
import { CreateProduct } from '../../models/create-product';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { clear } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproducts',
  standalone: true,
  imports: [FormsModule, CommonModule,NavComponent],
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css'] 
})
export class AddproductsComponent implements OnInit {
  product: CreateProduct = new CreateProduct();
  newSize: string = "";

  constructor(private productservices: ProductService,private router:Router) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.product.UserId = parseInt(userId, 10);  
    } else {
      console.error('User ID not found in local storage');
    }
    this.product.Size = [];
  }
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
     this.clearForm();
     this.router.navigate(['/allproductseller'])

    }, error => {
      console.error('Error adding product', error);
      console.error('Full error response:', JSON.stringify(error, null, 2))
    });
  }
  clearForm() {
   
    this.product = new CreateProduct();
    this.newSize = "";
  
   
  
  }
}
