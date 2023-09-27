import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `<div class="disabled"><span class="loader"></span></div>`,
  styleUrls: ['./spinner.component.scss'],
  standalone: true,
})
export class SpinnerComponent {}
