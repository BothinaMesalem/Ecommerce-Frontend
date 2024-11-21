import { Component, OnInit } from '@angular/core';
import { DashadminService } from '../../services/dashadmin.service';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartData, ChartType } from 'chart.js';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NgChartsModule, CommonModule, FormsModule,NavComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'], 
})
export class AdminDashboardComponent implements OnInit {
  productsCount!: number;
  ordersCount!: number;
  customersCount!: number;
  sellersCount!: number;
  orderShippedCount!: number;
  orderDeliveredCount!: number;
  orderPendingCount!: number;

  // Data for charts
  userDistributionData!: ChartData<'doughnut'>;
  orderStatusData!: ChartData<'bar'>;

  constructor(private dashService: DashadminService) {}

  ngOnInit(): void {
    // Fetch data for statistics
    this.dashService.GetProducts().subscribe(data => (this.productsCount = data));
    this.dashService.GetOrders().subscribe(data => (this.ordersCount = data));
    this.dashService.GetCustomers().subscribe(data => {
      this.customersCount = data;
      this.updateUserDistributionChart(); // Update chart after fetching customers
    });
    this.dashService.GetSellers().subscribe(data => {
      this.sellersCount = data;
      this.updateUserDistributionChart(); // Update chart after fetching sellers
    });

    // Fetch order status counts
    this.dashService.GetOrderShipped().subscribe(data => (this.orderShippedCount = data));
    this.dashService.GetOrderDelivered().subscribe(data => (this.orderDeliveredCount = data));
    this.dashService.GetOrderPending().subscribe(data => {
      this.orderPendingCount = data;
      this.updateOrderStatusChart(); // Update chart after fetching order statuses
    });
  }

  updateUserDistributionChart(): void {
    this.userDistributionData = {
      labels: ['Sellers', 'Customers'],
      datasets: [
        {
          data: [this.sellersCount, this.customersCount],
          backgroundColor: ['#FF6384', '#36A2EB'], // Optional: Add colors
        },
      ],
    };
  }

  updateOrderStatusChart(): void {
    this.orderStatusData = {
      labels: ['Pending', 'Shipped', 'Delivered'],
      datasets: [
        {
          data: [this.orderPendingCount, this.orderShippedCount, this.orderDeliveredCount],
          backgroundColor: ['#FFCE56', '#4BC0C0', '#FF6384'], // Optional: Add colors
        },
      ],
    };
  }
}
