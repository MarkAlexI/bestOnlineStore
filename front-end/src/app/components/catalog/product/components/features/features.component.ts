import { Component, Input } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { Product } from '@interfaces/product.interfaces';

@Component({
  selector: 'app-features',
  standalone: true,
  templateUrl: './features.component.html',
  imports: [NgForOf, NgIf],
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent {
  @Input() product!: Product;
}
