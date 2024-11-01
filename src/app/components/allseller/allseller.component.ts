import { Component, OnInit } from '@angular/core';
import { Seller } from '../../models/seller';
import { SellerService } from '../../services/seller.service';
import { OnReadOpts } from 'net';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { response } from 'express';
import { error } from 'console';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-allseller',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './allseller.component.html',
  styleUrl: './allseller.component.css'
})
export class AllsellerComponent implements OnInit {
  allseller:Seller[]=[];
  constructor(private sellerServices:SellerService){}

  ngOnInit(): void {
    this.sellerServices.getAll().subscribe((data:Seller[])=>{
      this.allseller=data.map(seller=>
       ({
        ...seller
       })
      )
    })
  }

  delete(id:number){
    this.sellerServices.Delete(id).subscribe(response=>{
      console.log("Deleted Successfully",response);
      this.allseller=this.allseller.filter(s=>s.userId !=id);
    },error=>{
      console.log("Can't Deleted",error);
    })
  }



}
