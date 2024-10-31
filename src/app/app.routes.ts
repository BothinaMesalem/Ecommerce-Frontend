import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { AddproductsComponent } from './components/addproducts/addproducts.component';
import { AllproductsellerComponent } from './components/allproductseller/allproductseller.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { EditproductComponent } from './components/editproduct/editproduct.component';

export const routes: Routes = [
    {path:"products",component:ProductsComponent},
    {path:"addproduct",component:AddproductsComponent},
    {path:"allproductseller",component:AllproductsellerComponent},
    {path:"products/productdetails/:id",component:ProductdetailsComponent},
    {path:"allproductseller/editproduct/:id",component:EditproductComponent}
];
