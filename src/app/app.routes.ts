import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { AddproductsComponent } from './components/addproducts/addproducts.component';

export const routes: Routes = [
    {path:"products",component:ProductsComponent},
    {path:"addproduct",component:AddproductsComponent},
];
