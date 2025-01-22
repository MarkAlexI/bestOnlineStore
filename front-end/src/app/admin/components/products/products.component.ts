import {
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCardComponent } from '@shared/components/product-card/product-card.component';
import { ProductsService } from '@shared/services/products.service';
import { Product } from '@interfaces/product.interfaces';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  private readonly productService = inject(ProductsService);
  private readonly router = inject(Router);
  public products!: Product[];
  private unSub!: Subscription;

  ngOnInit(): void {
    this.unSub = this.productService
      .getProductsPerPage('perPage', 200)
      .subscribe((res) => (this.products = res));
  }

  redirectToProduct(id: string) {
    this.router.navigate(['/admin/products/', id]);
  }

  ngOnDestroy(): void {
    if (this.unSub) this.unSub.unsubscribe();
  }
}
