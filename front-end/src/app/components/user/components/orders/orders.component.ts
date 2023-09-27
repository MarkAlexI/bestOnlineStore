import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Orders } from '@interfaces/user.interface';
import { TransformPricePipe } from '@shared/pipes/transform-price.pipe';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, TransformPricePipe],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {
  public action: string = 'Повернути';
  public orders: Orders[] = [
    {
      image:
        'https://img.freepik.com/premium-photo/blue-color-chair-product-image-web-page-scandinavian-design-clean-soft-chair-comfortable-with-copy-space-generatiev-ai_834602-16335.jpg',
      description: 'Кавовий столик Кавовий столикКавовий столик',
      price: 5500,
      discount: 6500,
      state: 'Комплектується',
      quantity: 0,
    },
    {
      image:
        'https://img.freepik.com/premium-photo/blue-color-chair-product-image-web-page-scandinavian-design-clean-soft-chair-comfortable-with-copy-space-generatiev-ai_834602-16335.jpg',
      description: 'Кавовий столик Кавовий столикКавовий столик',
      price: 5500,
      // discount: 6500,
      state: 'Отримано',
      quantity: 0,
    },
  ];

  completeAction() {}
}
