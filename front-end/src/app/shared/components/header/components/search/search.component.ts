import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '@shared/services/products.service';
import { Product } from '@interfaces/product.interfaces';
import { Subscription, tap } from 'rxjs';
import { EnPathDirective } from '@shared/directives/en-path.directive';
import { IconComponent } from '@shared/components/icon/icon.component';
import { Router } from '@angular/router';
import { SearchResultService } from '@shared/services/interaction/search-result.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, EnPathDirective, IconComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  private readonly productService = inject(ProductsService);
  private readonly router = inject(Router);
  private readonly searchResult = inject(SearchResultService);
  private readonly elementRef = inject(ElementRef);
  private readonly unSub = new Subscription();
  private products!: Product[];

  public answer: Product[] = [];

  @HostListener('document:click', ['$event']) onClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!this.elementRef.nativeElement.contains(target)) {
      this.answer = [];
    }
  }

  ngOnInit(): void {
    this.unSub.add(
      this.productService
        .getProductsPerPage('perPage', 1000)
        .pipe(
          tap((res) => {
            this.products = res;
          })
        )
        .subscribe()
    );
  }

  search(request: string) {
    const req = request.toLocaleLowerCase();

    this.answer = this.products.filter(
      (item) =>
        item.category.toLocaleLowerCase().slice(0, req.length) == req ||
        item.subcategory.toLocaleLowerCase().slice(0, req.length) == req ||
        item.name.toLocaleLowerCase().slice(0, req.length) == req
    );
  }

  searchBtn(pr: string) {
    this.unSub.add(
      this.productService.searchProduct(pr).subscribe((res) => {
        this.searchResult.passResult(res);
        this.router.navigate(['/catalog/search/result']);
      })
    );
  }

  clearBox() {
    this.answer = [];
  }

  ngOnDestroy(): void {
    this.unSub.unsubscribe();
  }
}
