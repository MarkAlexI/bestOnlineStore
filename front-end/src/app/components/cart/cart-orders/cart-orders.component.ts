import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';

import { Orders } from '@interfaces/user.interface';
import { TransformPricePipe } from '@shared/pipes/transform-price.pipe';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';
import { InfoComponent } from 'app/components/user/components/info/info.component';
import { InfoFormComponent } from '@shared/components/info-form/info-form.component';
import { Observable, Subscription, concatMap, map, tap } from 'rxjs';
import { OrderService } from '@shared/services/order.service';
import { IconComponent } from '@shared/components/icon/icon.component';

@Component({
  selector: 'app-cart-orders',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    AsyncPipe,
    JsonPipe,
    TransformPricePipe,
    FormsModule,
    RouterLink,
    InfoComponent,
    InfoFormComponent,
    IconComponent,
  ],
  templateUrl: './cart-orders.component.html',
  styleUrls: ['./cart-orders.component.scss'],
})
export class CartOrdersComponent
  implements OnInit, AfterViewChecked, OnDestroy
{
  @Output() advertisement = new EventEmitter<boolean>();
  @ViewChild(InfoFormComponent) infoForm!: InfoFormComponent;

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);
  private readonly orderService = inject(OrderService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private unSub = new Subscription();
  public maxQuantity = 100;
  public minQuantity = 1;
  public total!: number;

  public isComplete = true;
  public isCart = true;
  public isValid = false;

  public orders!: Orders[];

  ngOnInit(): void {
    this.getCartOrders();
    this.isCart = true;
  }

  getCartOrders() {
    this.unSub.add(
      this.cartService
        .getCart()
        .pipe(
          map((res: any) => {
            this.total = res.payload.totalPrice;
            this.orders = res.payload.items;

            if (!this.orders?.length) {
              this.advertisement.emit(false);
            }
          })
        )
        .subscribe()
    );
  }

  ngAfterViewChecked(): void {
    if (!this.isComplete) {
      this.infoForm.infoForm.get('password')?.setErrors(null);

      this.isValid = this.infoForm.infoForm.valid;
      this.isCart = true;
      this.changeDetectorRef.detectChanges();
    }
  }

  increase(id: string | undefined, quantity: number) {
    if (id && quantity) {
      this.unSub.add(
        this.cartService
          .makeOrder(id, quantity + 1)
          .pipe(
            tap(() => {
              this.getCartOrders();
            })
          )
          .subscribe()
      );
    }
  }

  decrease(id: string | undefined, quantity: number) {
    if (id && quantity) {
      this.unSub.add(
        this.cartService
          .makeOrder(id, quantity - 1)
          .pipe(
            tap(() => {
              this.getCartOrders();
            })
          )
          .subscribe()
      );
    }
  }

  delete(id: string) {
    if (id) {
      this.unSub.add(
        this.cartService
          .makeOrder(id, 0)
          .pipe(
            tap(() => {
              this.getCartOrders();
            })
          )
          .subscribe()
      );
    }
  }

  close() {
    this.router.navigate([{ outlets: { cart: null } }], {
      relativeTo: this.route.parent,
    });
  }

  completeOrder() {
    this.isComplete = false;
    this.advertisement.emit(false);
  }

  backToCart() {
    this.isComplete = true;
    this.advertisement.emit(true);
  }

  submit() {
    this.orderService.makeOrder(JSON.parse(localStorage.getItem('user')!)._id);
  }

  ngOnDestroy(): void {
    this.unSub.unsubscribe();
  }
}
