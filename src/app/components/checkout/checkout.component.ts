import { Component, OnInit } from '@angular/core';
import { Checkout, Countries } from '../../models/checkout';
import { CheckoutService } from '../../services/checkout.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { FproductComponent } from "../fproduct/fproduct.component";
import { Order } from '../../models/order';
import { AddOrderService } from '../../services/add-order.service';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, CommonModule, FooterComponent, FproductComponent,NavComponent],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkout: Checkout = new Checkout();
  Countries = Countries; 
  orders: Order[] = [];
  userid: number =0;

  constructor(private checkoutService: CheckoutService,private orderServices: AddOrderService) {}
  ngOnInit(): void {
    const storedUserId = localStorage.getItem('userId'); 
    if (storedUserId) {
      this.userid = parseInt(storedUserId, 10);
      this.getall();
      
    } else {
      console.error("Seller ID not found in localStorage");
    }
   
  }
  getall(){
    this.orderServices.getAll(this.userid).subscribe((data: Order[]) => {
      this.orders = data.map(order => ({
        ...order,
        orderDetail: order.orderDetail.map(od => ({
          ...od,
          image: this.convertImage(od.image)
        }))
      }));
    });
  }

  convertImage(base64Image: string): string {
    return `data:image/png;base64,${base64Image}`;
  }

  getAllOrdersTotal(): number {
    return this.orders.reduce((totalSum, order) => {
      const orderTotal = order.orderDetail.reduce((sum, od) => sum + (od.orderPrice * od.quantity), 0);
      return totalSum + orderTotal; 
    }, 0);
  }
  

  
  Add() {
    this.checkout.country = Number(this.checkout.country);
    console.log("Sending Checkout Data:", this.checkout);
    this.checkoutService.Add(this.checkout).subscribe(response => {
      console.log("Added Successfully", response);
    }, error => {
      console.log("error", error);
    });
  }

  getCountryKeys() {
    return Object.keys(Countries).filter(key => !isNaN(Number(key))).map(key => Number(key));
  }

  getCountryValue(countryKey: number) {
    return Countries[countryKey as unknown as keyof typeof Countries]; 
}

}
