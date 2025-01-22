import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Orders } from '@interfaces/user.interface';
import { TransformPricePipe } from '@shared/pipes/transform-price.pipe';
import { OrderService } from '@shared/services/order.service';
import { Subscription, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, TransformPricePipe],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  private readonly orderService = inject(OrderService);
  public orders: Orders[] = [];
  private unSub = new Subscription();

  ngOnInit(): void {
    this.unSub.add(
      this.orderService
        .getOrderHistory()
        .pipe(
          tap((res) => {
            this.orders = res;
          })
        )
        .subscribe()
    );
  }

  completeAction(id: string) {
    this.unSub.add(
      this.orderService
        .deleteOrder(id)
        .pipe(
          switchMap(() =>
            this.orderService
              .getOrderHistory()
              .pipe(tap((res) => (this.orders = res)))
          )
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.unSub.unsubscribe();
  }
}
