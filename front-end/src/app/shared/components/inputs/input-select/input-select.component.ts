import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { IconComponent } from '../../icon/icon.component';

@Component({
  selector: 'app-input-select',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputSelectComponent,
    },
  ],
})
export class InputSelectComponent implements ControlValueAccessor {
  onChange = (value: string) => {};
  onTouched = () => {};
  touched = false;
  disabled = false;
  value: string = '';
  isList = false;
  @Input() items: string[] = [];

  writeValue(obj: any): void {
    this.isList = true;
    this.value = obj;

    if (this.value) {
      this.onChange(this.value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  rollUp() {
    this.isList = !this.isList;
  }

  pickUp(item: string) {
    this.writeValue(item);
    this.isList = false;
  }
}
