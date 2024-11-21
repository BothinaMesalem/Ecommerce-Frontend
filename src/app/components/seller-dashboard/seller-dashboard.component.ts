import { Component, OnInit } from '@angular/core';
import { DashsellerService } from '../../services/dashseller.service';
import { ChartData, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-seller-dashboard',
  standalone:true,
  imports: [NgChartsModule, CommonModule, FormsModule,NavComponent],
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css']
})
export class SellerDashboardComponent implements OnInit {
  productsInStock!: number;
  productsOutStock!: number;
  ordersPending!: number;
  ordersShipped!: number;
  ordersDelivered!: number;
  productsCount!: number;
  ordersCount!: number;

  userId: number = parseInt(localStorage.getItem('userId') || '0', 10); 

  // Chart data
  productStockChartData!: ChartData<'doughnut'>;
  orderStatusChartData!: ChartData<'bar'>;

  constructor(private dashsellerService: DashsellerService) {}

  ngOnInit(): void {
    this.dashsellerService.GetProducts(this.userId).subscribe(data => (this.productsCount = data));
    this.dashsellerService.GetOrders(this.userId).subscribe(data => (this.ordersCount = data));
    // Fetch data for products
    this.dashsellerService.GetProductInStock(this.userId).subscribe(data => {
      this.productsInStock = data;
      this.updateProductStockChart(); // Update chart
    });

    this.dashsellerService.GetProductOutStock(this.userId).subscribe(data => {
      this.productsOutStock = data;
      this.updateProductStockChart(); // Update chart
    });

    // Fetch data for orders
    this.dashsellerService.GetOrderPending(this.userId).subscribe(data => {
      this.ordersPending = data;
      this.updateOrderStatusChart(); // Update chart
    });

    this.dashsellerService.GetOrderShipped(this.userId).subscribe(data => {
      this.ordersShipped = data;
      this.updateOrderStatusChart(); // Update chart
    });

    this.dashsellerService.GetOrderDelivered(this.userId).subscribe(data => {
      this.ordersDelivered = data;
      this.updateOrderStatusChart(); // Update chart
    });
  }

  // Update product stock chart
  updateProductStockChart(): void {
    this.productStockChartData = {
      labels: ['In Stock', 'Out of Stock'],
      datasets: [
        {
          data: [this.productsInStock, this.productsOutStock],
          backgroundColor: ['#36A2EB', '#FF6384'] // Colors for the chart
        }
      ]
    };
  }

  // Update order status chart
  updateOrderStatusChart(): void {
    this.orderStatusChartData = {
      labels: ['Pending', 'Shipped', 'Delivered'],
      datasets: [
        {
          label: 'Order Status',
          data: [this.ordersPending, this.ordersShipped, this.ordersDelivered],
          backgroundColor: ['#FFCE56', '#4BC0C0', '#FF6384'] // Colors for the chart
        }
      ]
    };
  }
}
