import { ChangeDetectorRef, Component } from '@angular/core';
import { EditProduct } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editproduct',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editproduct.component.html',
  styleUrl: './editproduct.component.css'
})
export class EditproductComponent {
  upproduct: EditProduct = { ...new EditProduct(), size: [] }; 
  newSize: string = "";
  productId!: number; 

  constructor(
    private productservices: ProductService,
    private route: ActivatedRoute,

  ) {}

  ngOnInit() {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProductDetails(this.productId); 
    
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.upproduct.image = file;
    }
  }

  addSize() {
    if (this.newSize) {
      if (!this.upproduct.size) {
        this.upproduct.size = []; 
      }
      this.upproduct.size.push(this.newSize);
      this.newSize = ""; 
    }
  }

  removeSize(index: number) {
    this.upproduct.size.splice(index, 1);
  }

  loadProductDetails(id: number) {
    this.productservices.getProductById(id).subscribe(
      (product) => {

        this.upproduct = product; 
      
        console.log("this data",this.upproduct)
      },
      (error) => console.error('Error fetching product details', error)
    );
  }

  editProduct() {
    if (this.upproduct && this.upproduct.size) {  
        this.productservices.Edit(this.upproduct, this.productId).subscribe(
            (response) => {
                console.log('Product edited successfully', response);
            },
            (error) => {
                console.error('Error editing product', error);
            }
        );
    } else {
        console.error("Product details not loaded properly.");
    }
  }
}

