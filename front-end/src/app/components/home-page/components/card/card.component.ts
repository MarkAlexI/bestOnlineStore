import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '@shared/components/product-card/product-card.component';
import {Product} from "@interfaces/product.interfaces";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, RouterLink],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() mockData!: Product[];

  constructor() {}
}
