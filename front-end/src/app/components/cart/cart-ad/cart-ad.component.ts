import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NgFor } from '@angular/common';

import { TransformPricePipe } from '@shared/pipes/transform-price.pipe';
import { ProductCardComponent } from '@shared/components/product-card/product-card.component';
import { Product } from '@interfaces/product.interfaces';
import { ProductsService } from '@shared/services/products.service';
import { Subscription, tap } from 'rxjs';
import { IconComponent } from '@shared/components/icon/icon.component';

@Component({
  selector: 'app-cart-ad',
  standalone: true,
  imports: [NgFor, TransformPricePipe, ProductCardComponent, IconComponent],
  templateUrl: './cart-ad.component.html',
  styleUrls: ['./cart-ad.component.scss'],
})
export class CartAdComponent implements OnInit, OnDestroy {
  private readonly productService = inject(ProductsService);
  private unSub!: Subscription;
  public advs: Product[] = [];

  ngOnInit(): void {
    this.unSub = this.productService
      .getAllProducts()
      .pipe(
        tap((res: any[]) => {
          this.advs = res.slice(0, 3);
        })
      )
      .subscribe();
  }
  addToFavorite() {}

  ngOnDestroy(): void {
    if (this.unSub) this.unSub.unsubscribe();
  }
}
