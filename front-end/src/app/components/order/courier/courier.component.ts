import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TransformPricePipe } from '@shared/pipes/transform-price.pipe';
import { DeliveryService } from '@shared/services/interaction/delivery.service';
import { DepData } from '@interfaces/department';

@Component({
  selector: 'app-courier',
  standalone: true,
  imports: [CommonModule, FormsModule, TransformPricePipe],
  templateUrl: './courier.component.html',
  styleUrls: ['./courier.component.scss'],
})
export class CourierComponent {
  public deliveryService = inject(DeliveryService);

  courier: DepData = {
    street: '',
    house: '',
    floor: '',
    apartment: '',
    time: '',
    deliveryMethod: "Кур'єрська доставка",
    isValid: false,
  };

  makeChanges() {
    this.deliveryService.delivery(this.courier);
    this.courier.isValid = this.validationChecker();
  }

  private validationChecker = (): boolean => {
    return this.courier?.apartment &&
      this.courier?.house &&
      this.courier?.street
      ? true
      : false;
  };
}
