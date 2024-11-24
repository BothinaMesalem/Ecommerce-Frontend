import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AddOrderService } from '../../services/add-order.service';
import { Order } from '../../models/order';
import { response } from 'express';
import { error } from 'console';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogoutComponent } from '../logout/logout.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule,LogoutComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit  {
   order:Order[]=[];
   userid: number = 0;
   orderCount: number = 0;
   username:string="";

  constructor(private orderservices:AddOrderService, public authService: AuthService){}
  ngOnInit(): void {
    const storedUserId = localStorage.getItem('userId'); 
    if (storedUserId) {
      this.userid = parseInt(storedUserId, 10); 
      this.getall();
      
    } else {
      console.error("User ID not found in localStorage");
    }

    const storedUserName=localStorage.getItem('name');
    if(storedUserName){
      this.username=storedUserName;
    }
    else{
      console.error("User Name not found in localStorage");
    }
  
  }
  getall(){
    this.orderservices.getAll(this.userid).subscribe((data: Order[]) => {
      this.order = data.map(order => ({
        ...order,
        orderDetail: order.orderDetail.map(od => ({
          ...od,
          image: this.convertImage(od.image)
        }))
      }));
    });
   this.getcount();
  }

  convertImage(base64Image: string): string {
    return `data:image/png;base64,${base64Image}`;
  }

  getcount(){
    this.orderservices.GetCount(this.userid).subscribe((count: number) => {
      this.orderCount = count;
    });


  }
  

}
