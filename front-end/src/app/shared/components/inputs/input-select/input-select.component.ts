import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() value: string = '';
  @Input() items: string[] = [];
  @Input() label: string = '';
  @Output() inputValue = new EventEmitter<string>();

  filteredItems: string[] = this.items;

  onChange = (value: string) => {};
  onTouched = () => {
    this.writeValue('');
  };
  touched = false;
  disabled = false;
  isList = false;

  writeValue(value: string): void {
    this.isList = true;
    this.value = value;

    if (this.items.length) {
      this.filteredItems = this.items.filter(
        (item) =>
          item.slice(0, value.length).toLowerCase() === value.toLowerCase()
      );
    }

    if (this.value) {
      this.onChange(this.value);
      this.inputValue.emit(this.value);
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
    this.inputValue.emit(item);
    this.isList = false;
  }
}
