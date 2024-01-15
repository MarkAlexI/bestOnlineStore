import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortmoneComponent } from '@shared/components/icons/portmone/portmone.component';
import { svg } from '@interfaces/pictures-map';
import { InputCheckBoxComponent } from '@shared/components/inputs/input-check-box/input-check-box.component';
import { PaymentMethod, paymentMethod } from '@configs/delivery-data';
import { DeliveryService } from '@shared/services/interaction/delivery.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, PortmoneComponent, InputCheckBoxComponent],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {
  private deliveryService = inject(DeliveryService);
  public readonly svg = svg;
  public isOpen = false;
  public disabled = false;
  public paymentMethod: PaymentMethod[] = paymentMethod;
  public paymentTitle = paymentMethod[0].title;

  openToggle() {
    this.isOpen = !this.isOpen;

    // if (!this.isOpen) {
    //   this.paymentMethod.forEach((item) => {
    //     item.isChecked = false;
    //   });
    // }
  }

  onCheckBox(event: boolean, id: number) {
    this.paymentTitle = this.paymentMethod[id].title;
    this.deliveryService.delivery({
      paymentMethod: this.paymentTitle,
      isValid: true,
    });

    this.paymentMethod.forEach((item, idx) => {
      if (idx !== id) {
        item.isChecked = event;
      }
    });
  }
}
