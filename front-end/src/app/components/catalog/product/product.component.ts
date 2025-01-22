import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { AboutProductComponent } from './components/about-product/about-product.component';
import { FeaturesComponent } from './components/features/features.component';
import { SimilarProductsComponent } from './components/similar-products/similar-products.component';
import { FeedbacksComponent } from './components/feedbacks/feedbacks.component';
import { ProductCardComponent } from '@shared/components/product-card/product-card.component';
import { Product } from '@interfaces/product.interfaces';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { ProductsService } from '@shared/services/products.service';
import { PathComponent } from '@shared/components/path/path.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    ProductCardComponent,
    AboutProductComponent,
    FeaturesComponent,
    SimilarProductsComponent,
    FeedbacksComponent,
    PathComponent,
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductsService);
  public product$!: Observable<Product>;

  constructor() {}

  ngOnInit(): void {
    this.product$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.productService.getProductById(params.get('id')!)
      )
    );
  }
}
