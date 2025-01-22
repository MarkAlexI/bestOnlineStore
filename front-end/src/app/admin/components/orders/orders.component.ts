import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderService } from '@shared/services/order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  private readonly orderService = inject(OrderService);

  ngOnInit(): void {
    this.orderService.getOrders();
    this.orderService.getOrderHistory();
  }
}
