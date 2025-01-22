import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Product } from '@interfaces/product.interfaces';
import { ProductsService } from '@shared/services/products.service';
import { AlertService } from '@shared/services/interaction/alert.service';
import { setupInitialValue } from '@shared/utils/initial-from-local';
import { ErrorValidationComponent } from '@shared/components/error-validation/error-validation.component';
import { isValid } from '@shared/utils/is-valid';
import { ValidFormService } from '../valid-form.service';
import { Subscription } from 'rxjs';
import { CharacteristicProductItemComponent } from '../characteristic-product-item/characteristic-product-item.component';
import { mainCategories } from '@interfaces/catalog.data';
import { Category } from '@interfaces/catalog.interface';

@Component({
  selector: 'app-edit-product-item',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrorValidationComponent,
    CharacteristicProductItemComponent,
  ],
  templateUrl: './edit-product-item.component.html',
  styleUrls: ['./edit-product-item.component.scss'],
})
export class EditProductItemComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @Input() product!: Product;
  @Input() isUpdate: boolean = false;
  @Input() isCreate: boolean = false;

  private readonly fb = inject(FormBuilder);
  private readonly productService = inject(ProductsService);
  private readonly alertService = inject(AlertService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  public validFormService = inject(ValidFormService);
  public isValid = isValid;
  private readonly unSub = new Subscription();
  public categories!: string[];
  public subcategories!: string[] | undefined;

  private allImagesFormArray = this.fb.array([]);
  public characteristics = this.fb.array([
    this.fb.group({
      key: ['', Validators.required],
      value: ['', Validators.required],
    }),
  ]);

  public productForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    descr: ['', [Validators.required, Validators.minLength(4)]],
    shortDescr: ['', [Validators.required, Validators.minLength(4)]],
    price: ['', [Validators.required, Validators.min(0)]],
    discount: ['', [Validators.required, Validators.min(0)]],
    brand: ['', [Validators.required, Validators.minLength(4)]],
    category: ['', [Validators.required, Validators.minLength(4)]],
    subcategory: ['', [Validators.required, Validators.minLength(4)]],
    instock: ['true', [Validators.required]],
    countInStock: ['', [Validators.required, Validators.min(0)]],
    baseImage: [''],
    allImages: this.allImagesFormArray,
    characteristics: this.characteristics,
  });

  get allImages() {
    return this.productForm.get('allImages') as FormArray;
  }

  ngOnInit(): void {
    this.categories = mainCategories.map((item) => item.name);

    if (this.product) {
      setupInitialValue(this.productForm, this.product);
      this.product.characteristics?.slice(1).forEach((item) =>
        this.characteristics.push(
          this.fb.group({
            key: [item.key, Validators.required],
            value: [item.value, Validators.required],
          })
        )
      );
    }

    if (this.product?.allImages.length) {
      this.product.allImages.forEach((image: string) => {
        this.allImagesFormArray.push(this.fb.control(image));
      });
    }
  }

  ngAfterViewInit(): void {
    this.setUpSubcategory();
    this.changeDetectorRef.detectChanges();
  }

  onSubmit() {
    if (this.isUpdate && this.product._id) {
      this.unSub.add(
        this.productService
          .updateProduct(this.productForm.value!, this.product._id)
          .subscribe(() => {
            this.alertService.success('Продукт успішно створено');
          })
      );
    }

    if (this.isCreate) {
      this.unSub.add(
        this.productService
          .createProduct(this.productForm.value)
          .subscribe(() => {
            this.alertService.success('Продукт успішно створено');
          })
      );
    }
  }

  setUpSubcategory() {
    const category = this.productForm.get('category')?.value;
    this.subcategories = mainCategories
      .filter((item) => item.name === category)[0]
      ?.subcategories?.map((item) => item.name);
  }

  addImageField() {
    // max 10 img
    if (this.allImages?.length <= 10) {
      this.allImagesFormArray.push(this.fb.control(''));
    }
  }

  deleteImageField(i: number) {
    // it should have at least 1 img field
    if (this.allImages?.length > 1) {
      this.allImagesFormArray.removeAt(i);
    }
  }

  ngOnDestroy(): void {
    this.unSub.unsubscribe();
    this.isCreate = false;
    this.isUpdate = false;
  }
}
