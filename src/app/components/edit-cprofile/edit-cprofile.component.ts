import { Component, OnInit } from '@angular/core';
import { EditCustomer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-edit-cprofile',
  standalone: true,
  imports: [FormsModule,CommonModule,NavComponent],
  templateUrl: './edit-cprofile.component.html',
  styleUrl: './edit-cprofile.component.css'
})
export class EditCprofileComponent implements OnInit {
  upCustomer:EditCustomer= new EditCustomer();
  CustomerId:number=0;
  constructor(private customerServices:CustomerService,private route:ActivatedRoute){}
 
  ngOnInit(): void {
    const storedCustomerId = localStorage.getItem('userId'); 
    if (storedCustomerId) {
      this.CustomerId = parseInt(storedCustomerId, 10); 
      
    } else {
      console.error("Seller ID not found in localStorage");
    }
    this.LoadCustomerData(this.CustomerId);

  }
  LoadCustomerData(id:number){
    this.customerServices.getbyId(id).subscribe(response=>{
      this.upCustomer=response;
      console.log("Get SuccessFully",response);
    },error=>{
      console.log("error when get",error);
    })
  }
  EditProfile(){
   if(this.upCustomer){
    this.customerServices.Update(this.upCustomer,this.CustomerId).subscribe(response=>{
      console.log("Update SuccessFully",response);
    },error=>{
      console.log("error when Update",error);
    })
   }
   else{
    console.log("error when get data of Customer")
   }
  }

}
