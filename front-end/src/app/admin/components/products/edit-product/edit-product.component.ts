import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription, switchMap, tap } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ProductsService } from '@shared/services/products.service';
import { Product } from '@interfaces/product.interfaces';
import { EditProductItemComponent } from '../edit-product-item/edit-product-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidFormService } from '../valid-form.service';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, EditProductItemComponent, ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit, OnDestroy {
  private readonly productsService = inject(ProductsService);
  private readonly route = inject(ActivatedRoute);
  private readonly validFormService = inject(ValidFormService);
  public product$!: Observable<Product>;
  public valid: boolean = false;
  public isUpdate: boolean = false;
  private unSub = new Subscription();

  ngOnInit(): void {
    this.isUpdate = true;
    this.product$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.productsService.getProductById(params.get('id')!)
      )
    );
    this.unSub.add(
      this.validFormService.productFormValid$
        .pipe(
          tap((res) => {
            this.valid = res;
          })
        )
        .subscribe()
    );
  }

  delete(productId: string | undefined) {
    if (productId) {
      this.unSub.add(this.productsService.deleteProduct(productId).subscribe());
    }
  }

  cancel() {
    this.validFormService.cancel();
  }

  ngOnDestroy(): void {
    this.unSub.unsubscribe();
    this.isUpdate = false;
  }
}
