import { Component } from '@angular/core';
import { AddSeller } from '../../models/seller';
import { SellerService } from '../../services/seller.service';
import { response } from 'express';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addseller',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './addseller.component.html',
  styleUrl: './addseller.component.css'
})
export class AddsellerComponent {
  addseller:AddSeller=new AddSeller();

  constructor(private sellerServices:SellerService){}

  add(){
    this.sellerServices.AddSeller(this.addseller).subscribe(response=>{
      console.log("added succeffly",response);
    },error=>{
      console.log("error when added",error);
    })
  }

}
