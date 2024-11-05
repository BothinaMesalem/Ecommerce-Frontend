import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { FproductComponent } from '../fproduct/fproduct.component';
import { LproductComponent } from '../lproduct/lproduct.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavComponent,FooterComponent,RouterLink,FproductComponent,LproductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
