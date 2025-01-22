import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '@shared/components/product-card/product-card.component';
import { Product } from '@interfaces/product.interfaces';
import { ProductsService } from '@shared/services/products.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit {
  private readonly productService = inject(ProductsService);
  public products$!: Observable<Product[]>;

  ngOnInit(): void {
    this.products$ = this.productService
      .getAllProducts()
      .pipe(map((res) => res.filter((item) => item.discount > 0)));
  }
}
