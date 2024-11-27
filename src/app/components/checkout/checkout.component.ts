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
import { PaymentComponent } from '../payment/payment.component';
import { PaymentService } from '../../services/payment.service'; 
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, CommonModule, FooterComponent, FproductComponent, NavComponent, PaymentComponent,RouterLink],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkout: Checkout = new Checkout();
  Countries = Countries;
  orders: Order[] = [];
  userid: number = 0;
  stripe: Stripe | null = null;
  paymentMethod: string = '';

  constructor(
    private checkoutService: CheckoutService,
    private orderServices: AddOrderService,
    private paymentService: PaymentService ,
    private router :Router
  ) {}

  async ngOnInit():  Promise<void> {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userid = parseInt(storedUserId, 10);
      this.getall();
    } else {
      console.error("Seller ID not found in localStorage");
    }
    this.stripe = await loadStripe('pk_test_51PbmIRG7HzCkDzBkCN3clnAqNFVQ9vXGQm1BssWXqaFeNDVRuptL9RcLnbUMNkdaTg6d3oyQTB3HuJ4vmbv7Qszk00PIpVLPsC');
    if (!this.stripe) {
      console.error('Stripe failed to load');
    }
  }

  getall() {
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

  
  handlePayment() {
    const amount = this.getAllOrdersTotal();
    const paymentData = {
      amount: amount * 100, 
      userId: this.userid,
    };

    
        this.paymentService.createCheckoutSession(paymentData).subscribe({
          next: async (response) => {
            const sessionId = response.sessionId;
    
            if (this.stripe) {
              this.stripe.redirectToCheckout({ sessionId })
                .then(result => {
                  if (result.error) {
                    console.error('Error redirecting to checkout:', result.error.message);
                  }
                });
            }
          },
          error: (err) => {
            console.error('Error creating payment session:', err);
          },
        });
  }

  
  Add() {
    this.checkout.country = Number(this.checkout.country);
    this.checkoutService.Add(this.checkout).subscribe({
      next: (response) => {
        console.log("Checkout data added successfully", response);
        this.UpdateStatus();
      },
      error: (error) => {
        console.error("Error adding checkout data:", error);
      }
    });
  }

  getCountryKeys() {
    return Object.keys(Countries).filter(key => !isNaN(Number(key))).map(key => Number(key));
  }

  getCountryValue(countryKey: number) {
    return Countries[countryKey as unknown as keyof typeof Countries];
  }
  UpdateStatus(){
    this.orderServices.EditStatus(this.userid).subscribe(response=>{
      console.log("Succeed",response)
    },error=>{
      console.log("ERROR",error)
    })
  }

  AddandPayment(){
    this.handlePayment();
    this.Add();
    this.UpdateStatus();
  }

  onFormSubmit() {
    if (this.paymentMethod === 'payNow') {
      this.AddandPayment();
    } else if (this.paymentMethod === 'onDelivery') {
      this.Add();
      Swal.fire({
        icon: 'success',
        title: 'Data Saved Successfully',
        text: 'Your checkout details have been added.',
        showConfirmButton: true,
        timer: 2000
      }).then(() => {
        this.router.navigate(['/Home']);
        this.UpdateStatus();
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong. Please try again.',
        showConfirmButton: true
      });
    }
  }
}
