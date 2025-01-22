import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { isValid } from '@shared/utils/is-valid';
import { ErrorValidationComponent } from '@shared/components/error-validation/error-validation.component';

@Component({
  selector: 'app-characteristic-product-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ErrorValidationComponent],
  templateUrl: './characteristic-product-item.component.html',
  styleUrls: ['./characteristic-product-item.component.scss'],
})
export class CharacteristicProductItemComponent {
  @Input() productForm!: FormGroup;
  @Input() characteristics!: FormArray;

  private readonly fb = inject(FormBuilder);

  public readonly isValid = isValid;

  get characteristicValue() {
    return this.productForm.get('characteristics') as FormArray;
  }

  addCharField() {
    if (this.characteristicValue.value?.length <= 20) {
      this.characteristics.push(this.fb.group({ key: [''], value: [''] }));
    }
  }

  deleteCharField(i: number) {
    if (this.characteristicValue.value?.length > 1) {
      this.characteristics.removeAt(i);
    }
  }
}
