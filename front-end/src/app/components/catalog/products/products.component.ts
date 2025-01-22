import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Event, RouterLink } from '@angular/router';
import { Subscription, map } from 'rxjs';

import { ProductCardComponent } from '@shared/components/product-card/product-card.component';
import { FiltersComponent } from '../filters/filters.component';
import { CardComponent } from 'app/components/home-page/components/card/card.component';
import { Product } from '@interfaces/product.interfaces';
import { ProductsService } from '@shared/services/products.service';
import { PathStringService } from '@shared/services/interaction/path-string.service';
import { PathComponent } from '@shared/components/path/path.component';
import { svg } from '@interfaces/pictures-map';
import { SearchResultService } from '@shared/services/interaction/search-result.service';
import { SortingComponent } from '../sorting/sorting.component';
import { AlertService } from '@shared/services/interaction/alert.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    ProductCardComponent,
    FiltersComponent,
    SortingComponent,
    RouterLink,
    PathComponent,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  private readonly productService = inject(ProductsService);
  public readonly pathString = inject(PathStringService);
  public readonly searchResult = inject(SearchResultService);
  private readonly alertService = inject(AlertService);
  private unSub = new Subscription();
  public isClickFilter: boolean = false;
  public page = 'page';
  svg = svg;
  products!: Product[];
  subCategory!: string;
  currentPage = 1;

  ngOnInit(): void {
    this.unSub.add(
      this.searchResult.searchResult$
        .pipe(
          map((res) => {
            if (res?.length) {
              this.products = res;
              this.subCategory = 'Знайдено';
            }
          })
        )
        .subscribe()
    );
  }

  onIsClickFilterChange(newValue: boolean) {
    this.isClickFilter = newValue;
  }

  passSubcategory(event: string) {
    this.subCategory = event;

    this.getProducts(this.page);
  }

  filteredProducts(filtered: Product[]) {
    if (filtered.length) {
      this.products = filtered;
    } else {
      this.alertService.warning('співпадінь не знайдено');
    }
  }

  sortedProducts(sorted: any) {
    this.products = sorted;
  }

  private getProducts(page: string): void {
    this.unSub.add(
      this.productService
        .getSubcategoryPerPage(page, this.currentPage, this.subCategory)
        .pipe(map((res: Product[]) => (this.products = res)))
        .subscribe()
    );
  }

  nextPage(): void {
    if (this.products.length >= 10) {
      this.currentPage += 1;
      this.getProducts(this.page);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.getProducts(this.page);
    }
  }

  ngOnDestroy(): void {
    this.unSub.unsubscribe();
  }
}
