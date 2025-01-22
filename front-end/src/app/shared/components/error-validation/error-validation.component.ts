import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { AbstractControl } from '@angular/forms';

import { getErrorValidationMessage } from '../../utils/get-error-message';
@Component({
  selector: 'app-error-validation',
  standalone: true,
  imports: [NgIf],
  templateUrl: './error-validation.component.html',
  styleUrls: ['./error-validation.component.scss'],
})
export class ErrorValidationComponent {
  @Input() control!: AbstractControl | null;

  get errorMessage() {
    for (const validatorName in this.control?.errors) {
      if (this.control!.touched) {
        return getErrorValidationMessage(
          validatorName,
          this.control!.errors[validatorName]
        );
      }
    }
    return null;
  }
}
