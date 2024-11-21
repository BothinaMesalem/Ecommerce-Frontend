import { Component, OnInit } from '@angular/core';
import { EditSeller } from '../../models/seller';
import { SellerService } from '../../services/seller.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-edit-aprofile',
  standalone: true,
  imports: [CommonModule,FormsModule,NavComponent],
  templateUrl: './edit-aprofile.component.html',
  styleUrl: './edit-aprofile.component.css'
})
export class EditAprofileComponent implements OnInit {
  upSeller:EditSeller=new EditSeller();
  SellerId:number=0;
  constructor(private adminservices:SellerService,private route:ActivatedRoute){}
    ngOnInit(): void {
      const storedSellerId = localStorage.getItem('userId'); 
      if (storedSellerId) {
        this.SellerId = parseInt(storedSellerId, 10);
        
      } else {
        console.error("Seller ID not found in localStorage");
      }
      this.loadSellerData(this.SellerId)
    }

  loadSellerData(id:number){
    this.adminservices.getbyadminId(id).subscribe(response=>{
      this.upSeller=response;
      console.log("Get SuccessFully",response);
    },error=>{
      console.log("error when get",error);
    })
  }

  EditSeller(){
   if(this.upSeller){
    this.adminservices.UpdateAdmin(this.upSeller,this.SellerId).subscribe(response=>{
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
