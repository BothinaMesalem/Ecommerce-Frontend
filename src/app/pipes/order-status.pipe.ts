import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatus } from '../models/order';

@Pipe({
  name: 'orderStatus',
  standalone: true
})
export class OrderStatusPipe implements PipeTransform {

  transform(value: OrderStatus): string {
    switch (value) {
      case OrderStatus.Pending:
        return 'Pending';
      case OrderStatus.Shipped:
        return 'Shipped';
      case OrderStatus.Delivered:
        return 'Delivered';
      default:
        return 'Unknown';
    }
  }

}
