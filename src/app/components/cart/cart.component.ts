import { Component, OnInit } from '@angular/core';
import { Order, OrderDeatailquantity, OrderDetail, OrderQuantityDto } from '../../models/order';
import { AddOrderService } from '../../services/add-order.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { response } from 'express';
import { error } from 'console';
import Swal from 'sweetalert2'
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterLink,FooterComponent,NavComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  orders: Order[] = [];
  userid: number = 0;

  constructor(private orderServices: AddOrderService) {}

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
  

  updateQuantity(orderId: number, orderDetailId: number, newQuantity: number, orderDetail: OrderDetail) {
    const orderDetailQty: OrderDeatailquantity = { orderDetailId: orderDetailId, quantity: newQuantity };

    
    const orderQuantityDto = new OrderQuantityDto();
    orderQuantityDto.orderDetailqty = [orderDetailQty];

  
    this.orderServices.updateqty(orderId, orderQuantityDto).subscribe(response => {
      console.log("Edited successfully", response);
      orderDetail.quantity = newQuantity;  
    }, error => {
      console.log("Error when edited", error);
    });
  }

  decreaseQuantity(orderId: number, orderDetailId: number, currentQuantity: number, orderDetail: OrderDetail) {
    if (currentQuantity > 1) {
      this.updateQuantity(orderId, orderDetailId, currentQuantity - 1, orderDetail);
    }
  }

  increaseQuantity(orderId: number, orderDetailId: number, currentQuantity: number, orderDetail: OrderDetail) {
    this.updateQuantity(orderId, orderDetailId, currentQuantity + 1, orderDetail);
  }
  delete(id:number){
    this.orderServices.Delete(id).subscribe(response=>{
      console.log("remove succes",response);
      this.orders=this.orders.filter(od=>od.orderId !==id)
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
}
