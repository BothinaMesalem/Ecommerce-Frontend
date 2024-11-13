import { Component, OnInit } from '@angular/core';
import { OrderSeller, OrderStatus } from '../../models/order';
import { AddOrderService } from '../../services/add-order.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderStatusPipe } from '../../pipes/order-status.pipe';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-orders-admin',
  standalone: true,
  imports: [FormsModule, CommonModule, OrderStatusPipe, NavComponent],
  templateUrl: './orders-admin.component.html',
  styleUrls: ['./orders-admin.component.css']
})
export class OrdersAdminComponent implements OnInit {
  orders: OrderSeller[] = [];
  filteredOrders: OrderSeller[] = [];
  searchOrderDate: string = ''; 
  selectedStatus: string = '';  

  constructor(private orderServices: AddOrderService) { }

  ngOnInit(): void {
    this.orderServices.GetOrders().subscribe(
      response => {
        this.orders = response;
        this.filteredOrders = [...this.orders];
        console.log('Orders');
      },
      error => {
        console.log("Can't get Orders", error);
      }
    );
  }

  
  DeleteOrder(id: number) {
    this.orderServices.ASDeleteOrder(id).subscribe(
      response => {
        console.log("Deleted successfully");
        this.orders = this.orders.filter(od => od.orderId !== id);
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
