import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '@shared/components/product-card/product-card.component';
import { Product } from '@interfaces/product.interfaces';
import { ProductsService } from '@shared/services/products.service';
import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, RouterLink],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() product!: Product[];

  private readonly productService = inject(ProductsService);
  private unSub!: Subscription;
  public products!: Product[];

  ngOnInit(): void {
    this.unSub = this.productService
      .getAllProducts()
      .pipe(map((res) => (this.products = res.slice(0, 3))))
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.unSub) this.unSub.unsubscribe();
  }
}
