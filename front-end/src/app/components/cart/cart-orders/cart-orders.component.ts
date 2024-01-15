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
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription, map, tap } from 'rxjs';

import { Orders } from '@interfaces/user.interface';
import { TransformPricePipe } from '@shared/pipes/transform-price.pipe';
import { CartService } from '../services/cart.service';
import { InfoFormComponent } from '@shared/components/info-form/info-form.component';
import { IconComponent } from '@shared/components/icon/icon.component';
import { AuthService } from 'app/components/user/services/signin-flow/auth.service';
import { OrdersCounterComponent } from '@shared/components/orders-counter/orders-counter.component';
import { DeliveryService } from '@shared/services/interaction/delivery.service';
import { SpinnerService } from '@shared/services/interaction/spinner.service';

@Component({
  selector: 'app-cart-orders',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    TransformPricePipe,
    RouterLink,
    InfoFormComponent,
    IconComponent,
    OrdersCounterComponent,
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
  private readonly authService = inject(AuthService);
  private readonly deliveryService = inject(DeliveryService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly spinnerService = inject(SpinnerService);
  private unSub = new Subscription();

  private timeoutID!: any;
  public total!: number;

  public isComplete = true;
  public isCart = true;
  public isValid = false;
  public isLoading = false;
  public orders!: Orders[];

  ngOnInit(): void {
    this.unSub.add(
      this.deliveryService.orderCounter$.subscribe((total) => {
        this.total = total;
      })
    );
    this.getCartOrders();
    this.isCart = true;
    this.unSub.add(
      this.spinnerService.spinner$.subscribe((b) => (this.isLoading = b))
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

  private getCartOrders() {
    this.unSub.add(
      this.cartService
        .getCart()
        .pipe(
          map((res: any) => {
            this.total = res.payload.totalPrice;
            this.orders = res.payload.items.filter(
              (item: Orders) => item.quantity
            );

            if (!this.orders?.length) {
              this.advertisement.emit(false);
            }
            if (this.orders?.length) {
              this.advertisement.emit(true);
            }
          })
        )
        .subscribe()
    );
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
    if (this.authService.isAuth() && !this.authService.isAnonym()) {
      this.close();
      this.router.navigate(['/order']);
    } else {
      this.isComplete = false;
      this.advertisement.emit(false);
    }
  }

  backToCart() {
    this.isComplete = true;
    this.advertisement.emit(true);
  }

  ngOnDestroy(): void {
    this.unSub.unsubscribe();
    if (this.timeoutID) {
      clearTimeout(this.timeoutID);
    }
  }
}
