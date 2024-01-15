import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputSelectComponent } from '@shared/components/inputs/input-select/input-select.component';

@Component({
  selector: 'app-ukr-poshta',
  standalone: true,
  imports: [CommonModule, InputSelectComponent],
  templateUrl: './ukr-poshta.component.html',
  styleUrls: ['./ukr-poshta.component.scss'],
})
export class UkrPoshtaComponent {
  @Input() items = [];
  data = {
    deliveryMethod: 'Укрпошта',
  };
}
