import {Component, Input, } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { Product } from '@interfaces/product.interfaces';
import { TransformPricePipe } from '../../pipes/transform-price.pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, TransformPricePipe],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent   {
  @Input() product!: Product;
}
