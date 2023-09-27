import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { AboutProductComponent } from './components/about-product/about-product.component';
import { FeaturesComponent } from './components/features/features.component';
import { SimilarProductsComponent } from './components/similar-products/similar-products.component';
import { FeedbacksComponent } from './components/feedbacks/feedbacks.component';
import { ProductCardComponent } from '@shared/components/product-card/product-card.component';
import {Product} from "@interfaces/product.interfaces";

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
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  public product!: Product | null;

  constructor() {}

  ngOnInit(): void {
  }
}
