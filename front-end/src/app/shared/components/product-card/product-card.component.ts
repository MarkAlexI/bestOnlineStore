import { Component, Input, OnDestroy, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import { Product } from '@interfaces/product.interfaces';
import { TransformPricePipe } from '../../pipes/transform-price.pipe';
import { WishlistService } from '@shared/services/wishlist.service';
import { AlertService } from '@shared/services/interaction/alert.service';
import { mainCategories } from '@interfaces/catalog.data';
import { Category } from '@interfaces/catalog.interface';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgOptimizedImage,
    TransformPricePipe,
    IconComponent,
  ],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnDestroy {
  @Input() product!: Product;

  private readonly wishlistService = inject(WishlistService);
  private readonly alertService = inject(AlertService);
  private readonly router = inject(Router);
  private unSub!: Subscription;
  catalog: Category[] = mainCategories;

  addToWishList(productId: string | undefined) {
    if (productId) {
      this.unSub = this.wishlistService
        .addWishList(productId)
        .subscribe(() => this.alertService.success('Додано до улюблених'));
    }
  }

  navigateToProduct(
    category: string,
    subcategory: string,
    id: string | undefined
  ) {
    let categoryLink = this.catalog.filter((item) => item.name == category);
    let subcategoryLink = categoryLink[0].subcategories?.filter(
      (item) => item.name == subcategory
    );

    this.router.navigate([
      '/catalog',
      categoryLink[0].routerLink,
      subcategoryLink![0].routerLink,
      id,
    ]);
  }

  ngOnDestroy(): void {
    if (this.unSub) this.unSub.unsubscribe();
  }
}
