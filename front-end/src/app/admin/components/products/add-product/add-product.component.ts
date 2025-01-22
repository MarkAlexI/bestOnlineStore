import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProductItemComponent } from '../edit-product-item/edit-product-item.component';
import { Subscription, tap } from 'rxjs';
import { ValidFormService } from '../valid-form.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, EditProductItemComponent],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit, OnDestroy {
  private readonly validFormService = inject(ValidFormService);
  public valid: boolean = false;
  public isCreate: boolean = false;
  private unSub!: Subscription;

  ngOnInit(): void {
    this.isCreate = true;

    this.unSub = this.validFormService.productFormValid$
      .pipe(
        tap((res: boolean) => {
          this.valid = res;
        })
      )
      .subscribe();
  }

  cancel() {
    this.validFormService.cancel();
  }

  ngOnDestroy(): void {
    if (this.unSub) {
      this.unSub.unsubscribe();
    }
  }
}
