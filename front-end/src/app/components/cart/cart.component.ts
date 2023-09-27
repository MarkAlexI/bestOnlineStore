import { Component, inject } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from './services/cart.service';
import { CartOrdersComponent } from './cart-orders/cart-orders.component';
import { CartAdComponent } from './cart-ad/cart-ad.component';
import { Orders } from '@interfaces/user.interface';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartOrdersComponent, CartAdComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [{ provide: CartService }],
})
export class CartComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);


  close() {
    this.router.navigate([{ outlets: { cart: null } }], {
      relativeTo: this.route.parent,
    });
  }
  submit( ) {
    this.cartService.getCart();
  }
}
