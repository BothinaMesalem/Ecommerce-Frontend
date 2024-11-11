import { Component, OnInit } from '@angular/core';
import { Order, OrderSeller } from '../../models/order';
import { AddOrderService } from '../../services/add-order.service';
import { response } from 'express';
import { error } from 'console';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-getallordertoseller',
  standalone: true,
  imports: [FormsModule,CommonModule,NavComponent],
  templateUrl: './getallordertoseller.component.html',
  styleUrl: './getallordertoseller.component.css'
})
export class GetallordertosellerComponent implements OnInit {
  orders:OrderSeller[]=[];
  sellerId:number|null=null;
  constructor(private orderservices:AddOrderService){}
  ngOnInit(): void {
    const storedSellerId = localStorage.getItem('userId'); 
    if (storedSellerId) {
      this.sellerId = parseInt(storedSellerId, 10); // Convert sellerId to a number
      this.fetchOrders();
    } else {
      console.error("Seller ID not found in localStorage");
    }

}
fetchOrders(): void {
  if (this.sellerId !== null) {
    this.orderservices.GetAllOrder(this.sellerId).subscribe(
      response => {
        this.orders = response;
        console.log("Data retrieved successfully", response);
      },
      error => {
        console.log("Error retrieving data", error);
      }
    );
  }
}
}
