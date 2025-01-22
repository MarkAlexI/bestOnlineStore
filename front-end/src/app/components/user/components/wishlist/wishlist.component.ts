import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription, forkJoin, switchMap, map } from 'rxjs';

import { WishlistService } from '@shared/services/wishlist.service';
import { ProductsService } from '@shared/services/products.service';
import { Product } from '@interfaces/product.interfaces';
import { TransformPricePipe } from '@shared/pipes/transform-price.pipe';
import { EnPathDirective } from '@shared/directives/en-path.directive';
import { IconComponent } from '@shared/components/icon/icon.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, TransformPricePipe, EnPathDirective, IconComponent],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit, OnDestroy {
  private readonly wishlistService = inject(WishlistService);
  private readonly productService = inject(ProductsService);
  private unSub = new Subscription();
  wishlists: Product[] = [];
  wishlist$!: Observable<Product[]>;

  ngOnInit(): void {
    this.unSub.add(
      this.wishlistService
        .getWishList()
        .pipe(
          switchMap((id: string[]) => {
            const observables = id.map((id) => {
              return this.productService.getProductById(id);
            });
            return forkJoin(observables);
          })
        )
        .subscribe((res) => (this.wishlists = res))
    );
  }

  delete(id: string) {
    this.unSub.add(
      this.wishlistService
        .removeFromWishList(id)
        .pipe(
          switchMap(() =>
            this.wishlistService.getWishList().pipe(
              switchMap((id: string[]) => {
                const observables = id.map((id) => {
                  return this.productService.getProductById(id);
                });
                return forkJoin(observables);
              })
            )
          )
        )
        .subscribe((res) => (this.wishlists = res))
    );
  }

  ngOnDestroy() {
    this.unSub.unsubscribe();
  }
}
