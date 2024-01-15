import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCardComponent } from '@shared/components/product-card/product-card.component';
import { Product } from '@interfaces/product.interfaces';
import { ProductsService } from '@shared/services/products.service';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-newest',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './newest.component.html',
  styleUrls: ['./newest.component.scss'],
})
export class NewestComponent implements OnInit, OnDestroy {
  @Input() products: Product[] = [];

  private readonly productService = inject(ProductsService);
  private unSub!: Subscription;

  ngOnInit(): void {
    this.productService
      .getAllProducts()
      .pipe(
        tap((products) => {
          products.forEach((item) => {
            console.log(item?.new);
          });
          this.products = products.filter((product) => product?.new);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.unSub) {
      this.unSub.unsubscribe();
    }
  }
}
