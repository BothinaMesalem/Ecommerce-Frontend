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
import { GetallordertosellerComponent } from './components/getallordertoseller/getallordertoseller.component';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/productdetails/:id', component: ProductdetailsComponent },
  {path:"about",component:AboutComponent},
  {path:"contact",component:ContactComponent},
  
  // For Customer
  { path: 'shoppingcart', component: CartComponent, canActivate: [authGuard], data: { role: 'Customer' }},
  { path: 'shoppingcart/checkout', component: CheckoutComponent, canActivate: [authGuard], data: { role: 'Customer' }},
  { path: 'editcprofile/:id', component: EditCprofileComponent, canActivate: [authGuard], data: { role: 'Customer' }},
  
  // For Seller
  { path: 'products', component: ProductsComponent, canActivate: [authGuard], data: { role: 'Seller' }},
  { path: 'allproductseller', component: AllproductsellerComponent, canActivate: [authGuard], data: { role: 'Seller' }},
  { path: 'allproductseller/addproduct', component: AddproductsComponent, canActivate: [authGuard], data: { role: 'Seller' }},
  { path: 'allproductseller/editproduct/:id', component: EditproductComponent, canActivate: [authGuard], data: { role: 'Seller' }},
  { path: 'allordertoseller/:id', component: GetallordertosellerComponent, canActivate: [authGuard], data: { role: 'Seller' }},
  { path: 'editsprofile/:id', component: EditSprofileComponent, canActivate: [authGuard], data: { role: 'Seller' }},
  
  // For Admin
  { path: 'allseller', component: AllsellerComponent, canActivate: [authGuard], data: { role: 'Admin' }},
  { path: 'allproductwithsellername', component: AllproductwithsellernameComponent, canActivate: [authGuard], data: { role: 'Admin' }},
  
  // General
  { path: 'login', component: LoginComponent },
  { path:'signup',component:SignupComponent}
];
