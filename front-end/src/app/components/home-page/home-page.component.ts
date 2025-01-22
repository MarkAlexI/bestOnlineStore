import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CarouselComponent } from './components/carousel/carousel.component';
import { AdvicesComponent } from './components/advices/advices.component';
import { CardComponent } from './components/card/card.component';

import { ProductsService } from '@shared/services/products.service';
import { Product } from '@interfaces/product.interfaces';
import { ProductCardComponent } from '@shared/components/product-card/product-card.component';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    CarouselComponent,
    AdvicesComponent,
    CardComponent,
    ProductCardComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private productService: ProductsService
  ) {}

  private unSub = new Subscription();

  products!: Product[];

  ngOnInit(): void {
    this.unSub.add(
      this.productService
        .getAllProducts()
        .subscribe((res) => (this.products = res))
    );
  }

  redirect(path: string, dynamicPart?: string): void {
    const fullPath = dynamicPart ? [path, dynamicPart] : [path];
    this.router.navigate(fullPath);
  }

  ngOnDestroy(): void {
    this.unSub.unsubscribe();
  }
}
