import { Component } from '@angular/core';
import { Account } from '../../models/account';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  accountDto: Account = { email: '', password: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.accountDto).subscribe({
      next: () => this.router.navigate(['/Home']),
       error: (err) => {
      this.errorMessage = err.message || 'An unknown error occurred. Please try again.';
    }
    });
  }
}
