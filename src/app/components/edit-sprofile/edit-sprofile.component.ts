import { Component, OnInit } from '@angular/core';
import { EditSeller } from '../../models/seller';
import { SellerService } from '../../services/seller.service';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';
import { error } from 'console';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-edit-sprofile',
  standalone: true,
  imports: [FormsModule,CommonModule,NavComponent],
  templateUrl: './edit-sprofile.component.html',
  styleUrl: './edit-sprofile.component.css'
})
export class EditSprofileComponent implements OnInit {
  upSeller:EditSeller=new EditSeller();
  SellerId:number=0;
  constructor(private sellerServices:SellerService,private route:ActivatedRoute){}
    ngOnInit(): void {
      const storedSellerId = localStorage.getItem('userId'); 
      if (storedSellerId) {
        this.SellerId = parseInt(storedSellerId, 10); // Convert sellerId to a number
        
      } else {
        console.error("Seller ID not found in localStorage");
      }
      this.loadSellerData(this.SellerId)
    }

  loadSellerData(id:number){
    this.sellerServices.getbyId(id).subscribe(response=>{
      this.upSeller=response;
      console.log("Get SuccessFully",response);
    },error=>{
      console.log("error when get",error);
    })
  }

  EditSeller(){
   if(this.upSeller){
    this.sellerServices.Update(this.upSeller,this.SellerId).subscribe(response=>{
      console.log("Update SuccessFully",response);
     },error=>{
       console.log("error when Edit",error);
     })
   }
   else{
    console.log("Can't get Data")
   }
  }
}
