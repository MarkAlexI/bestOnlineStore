import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { isValid } from '@shared/utils/is-valid';
import { ErrorValidationComponent } from '@shared/components/error-validation/error-validation.component';
import { Address } from '@interfaces/address';
import { getAddresses } from '@shared/utils/nova-poshta';
import { passwordValidator } from '@shared/utils/validators';
import { IconComponent } from '@shared/components/icon/icon.component';

@Component({
  selector: 'app-info-form-item',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrorValidationComponent,
    IconComponent,
  ],
  templateUrl: './info-form-item.component.html',
  styleUrls: ['./info-form-item.component.scss'],
})
export class InfoFormItemComponent implements AfterViewChecked {
  @Input() infoForm!: FormGroup;
  @Input() isCart: boolean = false;
  @Output() departments = new EventEmitter<{ city: string; ref: string }>();

  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  public readonly isValid = isValid;
  public isChosen: boolean = false;
  public isDepartment: boolean = false;
  addresses: Address[] = [];

  public readonly phoneHolder = '+380';
  private clearTimeOut: any;

  ngAfterViewChecked(): void {
    if (this.isCart) {
      this.infoForm
        .get('password')
        ?.removeValidators([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
          passwordValidator(),
        ]);
    }
    this.changeDetectorRef.detectChanges();
  }

  getAddress(city: string): void {
    if (city) {
      getAddresses(city)
        .then((res) => res.json())
        .then((res) => (this.addresses = res.data));

      this.isChosen = true;
    }
  }

  chosenAddress(address: any) {
    const {
      Description,
      AreaDescription,
      SettlementTypeDescription,
      RegionsDescription,
      Ref,
    } = address;
    this.infoForm
      .get('address')
      ?.setValue(
        `${SettlementTypeDescription} ${Description} ${RegionsDescription} ${AreaDescription}`
      );

    this.getDepartments({ city: Description, ref: Ref });
    this.isDepartment = false;
    this.isChosen = false;
  }

  getDepartments(event: { city: string; ref: string }) {
    this.departments.emit(event);
  }

  onblur() {
    this.clearTimeOut = setTimeout(() => {
      clearTimeout(this.clearTimeOut);
      this.isChosen = false;
      this.isDepartment = false;
    }, 100);
  }
}
