import { Directive, HostListener, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { mainCategories } from '@interfaces/catalog.data';
import { Category } from '@interfaces/catalog.interface';
import { Product } from '@interfaces/product.interfaces';

@Directive({
  selector: '[appEnPath]',
  standalone: true,
})
export class EnPathDirective {
  @Input() appEnPath!: any;

  private readonly router = inject(Router);
  private categories: Category[] = mainCategories;

  @HostListener('click') onClick() {
    if (this.appEnPath) {
      const categoryEn = this.categories.filter(
        (item) => item.name == this.appEnPath.category
      );
      const subcategoryEn = categoryEn[0].subcategories?.filter(
        (item) => item.name == this.appEnPath.subcategory
      );

      if (subcategoryEn?.length) {
        this.router.navigate([
          '/catalog',
          categoryEn[0].routerLink,
          subcategoryEn[0].routerLink,
          this.appEnPath._id,
        ]);
      }
    }
  }
}
