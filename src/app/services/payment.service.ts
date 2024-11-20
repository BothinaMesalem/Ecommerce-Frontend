import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'https://localhost:7100/api/Payment/create-checkout-session';

  constructor(private http: HttpClient) {}

  createCheckoutSession(paymentData: { amount: number; userId: number }): Observable<any> {
    return this.http.post(this.apiUrl, paymentData);
  }
}