import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Observable, forkJoin, map, of, switchMap, tap } from 'rxjs';

import { FilterCategory } from '@interfaces/filters-data';
import { filters } from '@interfaces/filters-data';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Product } from '@interfaces/product.interfaces';
import { ProductsService } from '@shared/services/products.service';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  @Input() isClickFilter!: boolean;
  @Input() subCategory!: string;
  @Input() page!: string;
  @Input() currentPage!: number;
  @Input() products: Product[] = [];
  @Output() isClickFilterChange = new EventEmitter<boolean>();
  @Output() filteredProducts = new EventEmitter<Product[]>();

  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly productService = inject(ProductsService);

  public filter!: FilterCategory;

  public filterNames = this.fb.group({
    name: this.fb.array([this.fb.control('')]),
  });

  ngOnInit(): void {
    this.route.url
      .pipe(
        map((res: UrlSegment[]): FilterCategory => {
          const key = res[1].path;

          if (key in filters) {
            this.filter = (filters as any)[key] as FilterCategory;
          }

          return this.filter;
        })
      )
      .subscribe();
  }

  get name() {
    return this.filterNames.get('name') as FormArray;
  }

  setValue(item: string, checked: string) {
    if (checked === 'off') {
      const id = this.name.value.indexOf(item);
      this.name.removeAt(id);
    } else if (!this.name.value.includes(item)) {
      this.name.push(this.fb.control(item));
    }
  }

  filterBy() {
    this.productService
      .getSubcategoryPerPage(this.page, this.currentPage, this.subCategory)
      .pipe(
        switchMap((res: Product[]): Observable<Product[][]> => {
          const filterObservables: Observable<Product[]> = this.name.value.map(
            (filter: string) => this.filterProducts(res, filter)
          );
          return forkJoin(filterObservables);
        })
      )
      .subscribe((res: Product[][]) => {
        const filteredProducts = res.reduce(
          (acc, curr) => acc.concat(curr),
          []
        );

        if (filteredProducts.length > 0) {
          this.filteredProducts.emit(filteredProducts);
        } else {
          this.filteredProducts.emit([]);
        }
      });
  }

  private filterProducts(
    products: Product[],
    filter: string
  ): Observable<Product[]> {
    return of(
      products.filter((product) =>
        product.characteristics?.some(
          (characteristic) =>
            characteristic.value.toLowerCase() == filter.toLowerCase()
        )
      )
    );
  }

  isOpen(i: number) {
    if (!this.filter.subcategory[i].isChecked) {
      this.filter.subcategory[i].isChecked = true;
    } else {
      this.filter.subcategory[i].isChecked = false;
    }
  }

  clear() {
    this.filter.subcategory.forEach((item) => {
      item.isChecked = false;
    });

    while (this.name.value.length) {
      this.name.removeAt(this.name.value.length - 1);
    }
  }

  updateIsClickFilter() {
    this.isClickFilter = !this.isClickFilter;
    this.isClickFilterChange.emit(this.isClickFilter);
  }
}
