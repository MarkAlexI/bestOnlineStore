import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'input-checkbox',
  standalone: true,
  templateUrl: './input-check-box.component.html',
  styleUrls: ['./input-check-box.component.scss'],
  imports: [NgClass],
})
export class InputCheckBoxComponent {
  @Input() disabled = false;
  @Output() checkbox = new EventEmitter<boolean>();
  isChecked = false;
  checked = 'on';

  onClick() {
    if (this.checked === 'on') {
      this.isChecked = true;
      this.checked = 'off';
      this.checkbox.emit(this.isChecked);
    } else if (this.checked === 'off') {
      this.isChecked = false;
      this.checked = 'on';
      this.checkbox.emit(this.isChecked);
    }
  }
}
