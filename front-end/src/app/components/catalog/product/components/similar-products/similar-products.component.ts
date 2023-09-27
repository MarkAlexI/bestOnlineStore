import { Component, Input, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import {
  ActivatedRoute,
  Router,
  RouterLink,
} from '@angular/router';

import { ProductCardComponent } from '@shared/components/product-card/product-card.component';
import {Product} from "@interfaces/product.interfaces";

@Component({
  selector: 'app-similar-products',
  standalone: true,
  templateUrl: './similar-products.component.html',
  imports: [NgIf, ProductCardComponent, RouterLink, NgForOf],
  styleUrls: ['./similar-products.component.scss'],
})
export class SimilarProductsComponent implements OnInit {
  @Input() product!: Product;
  public subcategory!: string | null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getSimilarProducts();
  }

  getSimilarProducts(): void {

  }

  onProductClick(productId: number) {
    this.router.navigate(['/catalog', this.subcategory, productId]);
  }
}
