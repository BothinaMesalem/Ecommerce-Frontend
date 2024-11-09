import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { AddproductsComponent } from './components/addproducts/addproducts.component';
import { AllproductsellerComponent } from './components/allproductseller/allproductseller.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { EditproductComponent } from './components/editproduct/editproduct.component';
import { AllsellerComponent } from './components/allseller/allseller.component';
import { AddsellerComponent } from './components/addseller/addseller.component';
import { AllproductwithsellernameComponent } from './components/allproductwithsellername/allproductwithsellername.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { FproductComponent } from './components/fproduct/fproduct.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { EditSprofileComponent } from './components/edit-sprofile/edit-sprofile.component';
import { EditCprofileComponent } from './components/edit-cprofile/edit-cprofile.component';

export const routes: Routes = [
    {path:"products",component:ProductsComponent},
    {path:"allproductseller/addproduct",component:AddproductsComponent},
    {path:"allproductseller",component:AllproductsellerComponent},
    {path:"products/productdetails/:id",component:ProductdetailsComponent},
    {path:"allproductseller/editproduct/:id",component:EditproductComponent},
    {path:"allseller",component:AllsellerComponent},
    {path:"allseller/addseller",component:AddsellerComponent},
    {path:"allproductwithsellername",component:AllproductwithsellernameComponent},
    {path:"Home",component:HomeComponent},
    {path:"shoppingcart",component:CartComponent},
    {path:"fproduct",component:FproductComponent},
    {path:"Home/productdetails/:id",component:ProductdetailsComponent},
    {path:"shoppingcart/checkout",component:CheckoutComponent},
    {path:"editsprofile/:id",component:EditSprofileComponent},
    {path:"editcprofile/:id",component:EditCprofileComponent},
    {path:"",component:HomeComponent},
];

