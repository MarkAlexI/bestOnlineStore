import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-select',
  standalone: true,
  imports: [CommonModule],
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
  value!: string;
  items: string[] = [];

  writeValue(obj: any): void {
    this.value = obj;
    if (this.value) {
      this.items.push(this.value);
      this.onChange(this.value);
      console.log(this.items.length);
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
}
