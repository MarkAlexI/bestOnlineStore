import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

import { TransformPricePipe } from '@shared/pipes/transform-price.pipe';
import { Orders } from '@interfaces/user.interface';

@Component({
  selector: 'app-cart-ad',
  standalone: true,
  imports: [NgFor, TransformPricePipe],
  templateUrl: './cart-ad.component.html',
  styleUrls: ['./cart-ad.component.scss'],
})
export class CartAdComponent {
  public advs: Orders[] = [
    {
      image:
        'https://img.freepik.com/premium-photo/blue-color-chair-product-image-web-page-scandinavian-design-clean-soft-chair-comfortable-with-copy-space-generatiev-ai_834602-16335.jpg',
      description: 'Кавовий столик ',
      quantity: 1,
      price: 5500,
    },
  ];
}
