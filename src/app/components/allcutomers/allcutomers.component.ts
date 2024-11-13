import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { response } from 'express';
import { error } from 'console';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-allcutomers',
  standalone: true,
  imports: [FormsModule,CommonModule,NavComponent],
  templateUrl: './allcutomers.component.html',
  styleUrl: './allcutomers.component.css'
})
export class AllcutomersComponent implements OnInit { 
  customers:Customer[]=[];
  filteredCustomers:Customer[]=[];
  searchQuery:string="";
  constructor(private cutomerservices:CustomerService){}
 ngOnInit(): void {
   this.cutomerservices.getall().subscribe(response=>{
    this.customers=response;
    console.log("All Customer",response);
    this.filteredCustomers=this.customers;
  
   },
   error=>{
    console.log("Can't load Data ")
   }
  )

 }

 Delete(id:number){
  this.cutomerservices.Delete(id).subscribe(response=>{
    console.log("Delete",response);
    this.customers = this.customers.filter(customer => customer.userId !== id);
    Swal.fire(
      'Deleted!',
      'The User has been deleted.',
      'success'
    );
  },
  error => {
    console.log("Can't delete", error);
    Swal.fire(
      'Error!',
      'Can t Delete this User because this has orders',
      'error'
    );
  }
);
 }
 onSearchChange(): void {
   
  this.filteredCustomers= this.customers.filter((seller) =>
    seller.userName.toLowerCase().includes(this.searchQuery.toLowerCase())
  );
}

}
