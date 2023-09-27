import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

import { Orders } from '@interfaces/user.interface';
import { TransformPricePipe } from '@shared/pipes/transform-price.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-orders',
  standalone: true,
  imports: [NgFor, TransformPricePipe, FormsModule],
  templateUrl: './cart-orders.component.html',
  styleUrls: ['./cart-orders.component.scss'],
})
export class CartOrdersComponent implements OnInit {
  public maxQuantity = 100;
  public minQuantity = 1;
  public total = 0;

  public orders: Orders[] = [
    {
      id: 1,
      image:
        'https://img.freepik.com/premium-photo/blue-color-chair-product-image-web-page-scandinavian-design-clean-soft-chair-comfortable-with-copy-space-generatiev-ai_834602-16335.jpg',
      description: 'Кавовий столик Кавовий столикКавовий столик',
      quantity: 1,
      price: 5500,
      discount: 6500,
      summa: 5500,
    },
    {
      id: 2,
      image:
        'https://img.freepik.com/premium-photo/blue-color-chair-product-image-web-page-scandinavian-design-clean-soft-chair-comfortable-with-copy-space-generatiev-ai_834602-16335.jpg',
      description: 'Кавовий столик ',
      quantity: 1,
      price: 5500,
      summa: 5500,
    },
  ];

  ngOnInit(): void {
    this.countTotal();
  }

  increase(id: number) {
    if (this.orders[id].quantity < this.maxQuantity) {
      this.orders[id].quantity += 1;
      this.orders[id].summa = this.orders[id].price * this.orders[id].quantity;
    }

    this.checkQuantity(this.orders[id], id);
  }

  decrease(id: number) {
    if (this.orders[id].quantity > this.minQuantity) {
      this.orders[id].quantity -= 1;
      this.orders[id].summa = this.orders[id].price * this.orders[id].quantity;
    }

    this.checkQuantity(this.orders[id], id);
  }

  checkQuantity(order: Orders, id: number) {
    if (
      order.quantity >= this.maxQuantity ||
      order.quantity > this.orders[id].quantity
    ) {
      order.quantity = this.maxQuantity;
      this.orders[id].quantity = order.quantity;
    }

    if (
      order.quantity <= this.minQuantity ||
      order.quantity < this.orders[id].quantity
    ) {
      order.quantity = this.minQuantity;
      this.orders[id].quantity = order.quantity;
    }
    this.countTotal();
  }

  countTotal(): void {
    let res = 0;
    this.orders.forEach((order: Orders) => (res += order.summa!));
    this.total = res;
    console.log(this.total);
  }

  delete(id: number | undefined) {
    this.orders = this.orders.filter((order: Orders) => order.id !== id);
    this.countTotal();
  }
}
