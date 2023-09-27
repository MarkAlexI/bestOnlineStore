import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-error-msg',
  standalone: true,
  imports: [],
  templateUrl: './form-error-msg.component.html',
  styleUrls: ['./form-error-msg.component.scss'],
})
export class FormErrorMsgComponent {
  @Input() control!: AbstractControl;
}
