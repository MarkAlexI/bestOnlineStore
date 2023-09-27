import { Component, Input } from '@angular/core';
import { NgClass, NgIf, NgOptimizedImage } from '@angular/common';
import { Product } from '@interfaces/product.interfaces';
import { TransformPricePipe } from '@shared/pipes/transform-price.pipe';

@Component({
  selector: 'app-about-product',
  standalone: true,
  templateUrl: './about-product.component.html',
  imports: [NgIf, NgOptimizedImage, NgClass, TransformPricePipe],
  styleUrls: ['./about-product.component.scss'],
})
export class AboutProductComponent {
  @Input() product!: Product;
}
