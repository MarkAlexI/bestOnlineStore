import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ErrorValidationComponent } from '@shared/components/error-validation/error-validation.component';
import { isValid } from '@shared/utils/is-valid';
import { IconComponent } from '@shared/components/icon/icon.component';

@Component({
  selector: 'app-delivery-form-item',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrorValidationComponent,
    IconComponent,
  ],
  templateUrl: './delivery-form-item.component.html',
  styleUrls: ['./delivery-form-item.component.scss'],
})
export class DeliveryFormItemComponent {
  @Input() infoForm!: FormGroup;
  @Input() isDepartment: boolean = false;
  @Input() departments!: any;
  @Output() getDepartment = new EventEmitter<{ city: string; ref: string }>();

  public readonly isValid = isValid;

  private clearTimeOut: any;

  chosenDepartment(department: { city: string; description: string }) {
    if (department) {
      this.infoForm
        .get('novaPoshtaAddress')
        ?.setValue(`${department.city} ${department.description}`);
      this.isDepartment = false;
    }
  }

  onGetDepartment(city: string) {
    this.getDepartment.emit({ city, ref: '' });
  }

  onblur() {
    this.clearTimeOut = setTimeout(() => {
      clearTimeout(this.clearTimeOut);
      this.isDepartment = false;
    }, 100);
  }
}
