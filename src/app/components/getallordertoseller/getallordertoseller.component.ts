import { Component, OnInit } from '@angular/core';
import { Order, OrderSeller, OrderStatus } from '../../models/order';
import { AddOrderService } from '../../services/add-order.service';
import { response } from 'express';
import { error } from 'console';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { OrderStatusPipe } from '../../pipes/order-status.pipe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-getallordertoseller',
  standalone: true,
  imports: [FormsModule,CommonModule,NavComponent,OrderStatusPipe],
  templateUrl: './getallordertoseller.component.html',
  styleUrl: './getallordertoseller.component.css'
})
export class GetallordertosellerComponent implements OnInit {
  orders:OrderSeller[]=[];
  sellerId:number|null=null;
  filteredOrders: OrderSeller[] = [];
  searchOrderDate: string = ''; 
  selectedStatus: string = '';
  constructor(private orderservices:AddOrderService){}
  ngOnInit(): void {
    const storedSellerId = localStorage.getItem('userId'); 
    if (storedSellerId) {
      this.sellerId = parseInt(storedSellerId, 10); 
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
        this.filteredOrders = [...this.orders];
      },
      error => {
        console.log("Error retrieving data", error);
      }
    );
  }
}
DeleteOrder(id:number){
  this.orderservices.ASDeleteOrder(id).subscribe(response=>{
    console.log("Deleted succefflly");
    this.orders=this.orders.filter(od=>od.orderId !==id);
    this.applyFilters();
    Swal.fire(
      'Deleted!',
      'The order has been deleted.',
      'success'
    );
  },
  error => {
    console.log("Can't delete", error);
    Swal.fire(
      'Error!',
      'There was an issue deleting the order.',
      'error'
    );
  }
);

}
applyFilters() {
  this.filteredOrders = this.orders.filter(order => {
    let matchesDate = true;
    let matchesStatus = true;

   
    if (this.searchOrderDate) {
      const orderDate = new Date(order.order_date).toISOString().split('T')[0]; 
      matchesDate = orderDate.includes(this.searchOrderDate); 
    }

  
    if (this.selectedStatus) {
      matchesStatus = order.status === OrderStatus[this.selectedStatus as keyof typeof OrderStatus];
    }

    return matchesDate && matchesStatus;
  });
}

}
