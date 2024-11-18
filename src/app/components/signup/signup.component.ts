import { Component } from '@angular/core';
import { Signup } from '../../models/signup';
import { CustomerService } from '../../services/customer.service';
import { response } from 'express';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
signup:Signup=new Signup();
signupForm: FormGroup;
constructor(private customerservices:CustomerService,private fb: FormBuilder,private router:Router)
{
  this.signupForm = this.fb.group({
    userName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    
  });
}


get passwordMatchError() {
  return this.signupForm.get('password')?.value !== this.signupForm.get('confirmPassword')?.value;
}

Add(){
  this.customerservices.Createuser(this.signup).subscribe(response=>{
    this.router.navigate(['/login']);
  },error=>{
    console.log("Error when Signup",error)
  })
}
}
