import { Component, Input, OnInit, inject } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Observable, map } from 'rxjs';

import { ProductCardComponent } from '@shared/components/product-card/product-card.component';
import { Product } from '@interfaces/product.interfaces';
import { ProductsService } from '@shared/services/products.service';

@Component({
  selector: 'app-similar-products',
  standalone: true,
  templateUrl: './similar-products.component.html',
  imports: [NgIf, AsyncPipe, ProductCardComponent, RouterLink, NgForOf],
  styleUrls: ['./similar-products.component.scss'],
})
export class SimilarProductsComponent implements OnInit {
  @Input() product!: Product;

  private readonly productService = inject(ProductsService);
  private readonly router = inject(Router);

  public products$!: Observable<Product[]>;

  ngOnInit(): void {
    this.products$ = this.productService
      .getAllProducts()
      .pipe(
        map((res) =>
          res.filter(
            (item) =>
              item.category === this.product.category &&
              item._id !== this.product._id
          )
        )
      );
  }

  onProductClick(productId: string) {
    console.log(this.product.subcategory, productId);
    this.router.navigate([
      '/catalog/menu',
      this.product.subcategory,
      productId,
    ]);
  }
}
