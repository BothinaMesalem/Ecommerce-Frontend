import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { AddproductsComponent } from './components/addproducts/addproducts.component';
import { AllproductsellerComponent } from './components/allproductseller/allproductseller.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';

export const routes: Routes = [
    {path:"products",component:ProductsComponent},
    {path:"addproduct",component:AddproductsComponent},
    {path:"allproductseller",component:AllproductsellerComponent},
    {path:"products/productdetails/:id",component:ProductdetailsComponent}
];
