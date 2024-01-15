import {
  Component,
  DoCheck,
  Input,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { CartService } from 'app/components/cart/services/cart.service';
import { deliveryData } from '@configs/delivery-data';
import { Subscription, map, tap } from 'rxjs';
import { Orders } from '@interfaces/user.interface';
import { FormsModule } from '@angular/forms';
import { DeliveryService } from '@shared/services/interaction/delivery.service';
import { TransformPricePipe } from '@shared/pipes/transform-price.pipe';

@Component({
  selector: 'app-orders-counter',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent, TransformPricePipe],
  templateUrl: './orders-counter.component.html',
  styleUrls: ['./orders-counter.component.scss'],
})
export class OrdersCounterComponent implements OnInit, OnDestroy, DoCheck {
  @Input() order!: Orders;
  private readonly cartService = inject(CartService);
  private readonly deliveryService = inject(DeliveryService);
  private readonly unSub = new Subscription();
  public minQuantity: number = 1;
  public maxQuantity: number = 100;

  ngOnInit(): void {
    this.getCartOrders();
  }

  ngDoCheck(): void {}

  increase(id: string | undefined, quantity: number) {
    if (id && quantity) {
      this.makeCartOrders(id, quantity + 1);
    }
  }

  decrease(id: string | undefined, quantity: number) {
    if (id && quantity) {
      this.makeCartOrders(id, quantity - 1);
    }
  }

  private makeCartOrders(id: string, quantity: number) {
    this.unSub.add(
      this.cartService
        .makeOrder(id, quantity)
        .pipe(
          tap((res: any) => {
            res.payload.items.forEach((item: any) => {
              if (this.order._id === item._id) {
                this.order = item;
              }
            });
            this.getCartOrders();
          })
        )
        .subscribe()
    );
  }

  private getCartOrders() {
    this.unSub.add(
      this.cartService
        .getCart()
        .pipe(
          map((res: any) => {
            if (!deliveryData[1].isClosed) {
              this.deliveryService.countOrder(
                res.payload.totalPrice + deliveryData[1].price
              );
            } else {
              this.deliveryService.countOrder(res.payload.totalPrice);
            }

            return res;
          }),
          map((res: any) => {
            res.payload.items.forEach((item: any) => {
              console.log(this.order._id == item._id);
              if (item._id == this.order._id) {
                this.order = item;
              }
            });
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.unSub.unsubscribe();
  }
}
