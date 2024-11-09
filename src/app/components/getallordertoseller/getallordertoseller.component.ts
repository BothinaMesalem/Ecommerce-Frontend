import { Component, OnInit } from '@angular/core';
import { Order, OrderSeller } from '../../models/order';
import { AddOrderService } from '../../services/add-order.service';
import { response } from 'express';
import { error } from 'console';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-getallordertoseller',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './getallordertoseller.component.html',
  styleUrl: './getallordertoseller.component.css'
})
export class GetallordertosellerComponent implements OnInit {
  orders:OrderSeller[]=[];
  sellerId:number=3;
  constructor(private orderservices:AddOrderService){}
  ngOnInit(): void {
    this.orderservices.GetAllOrder(this.sellerId).subscribe(response=>{
      this.orders=response;
      console.log("Data get Successfully",response)
    },error=>{
      console.log("Error when get data",error)
    })
  }
}
