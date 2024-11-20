import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Order } from '../../models/order';
import { AddOrderService } from '../../services/add-order.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  useriid: number = 0;
  stripe: Stripe | null = null;
  orders: Order[] = [];

  constructor(private paymentService: PaymentService, private orderSerives: AddOrderService) {}

  async ngOnInit(): Promise<void> {
    const storeduserId = localStorage.getItem('userId');
    if (storeduserId) {
      this.useriid = parseInt(storeduserId, 10);
      console.log("SellerId", storeduserId);
    }

    this.getall();
    this.stripe = await loadStripe('pk_test_51PbmIRG7HzCkDzBkCN3clnAqNFVQ9vXGQm1BssWXqaFeNDVRuptL9RcLnbUMNkdaTg6d3oyQTB3HuJ4vmbv7Qszk00PIpVLPsC');
    if (!this.stripe) {
      console.error('Stripe failed to load');
    }
  }

  async handlePayment() {
    const amount = this.getAllOrdersTotal();
    const paymentData = {
      amount: amount * 100,
      userId: this.useriid,
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

  getall() {
    this.orderSerives.getAll(this.useriid).subscribe((data: Order[]) => {
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
}
