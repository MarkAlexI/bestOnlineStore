import { NgStyle } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Product } from '@interfaces/product.interfaces';

@Component({
  selector: 'app-price-filter',
  standalone: true,
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.scss'],
  imports: [FormsModule, NgStyle],
})
export class PriceFilterComponent implements OnInit {
  @Output() filterPrice = new EventEmitter<Product[]>();
  @Input() products!: Product[];

  public min: number = 100;
  public max: number = 1000000;
  public step: number = 100;
  public fromRange: number = 100;
  public toRange: number = 1000000;

  @ViewChild('minInput', { read: ElementRef }) minInput!: ElementRef;
  @ViewChild('maxInput', { read: ElementRef }) maxInput!: ElementRef;

  ngOnInit(): void {
    this.filterByPrice();
  }

  onChangeMax(value: string | number) {
    let maxValue = typeof value === 'string' ? parseInt(value, 10) : value;

    if (this.fromRange < maxValue) {
      this.toRange = maxValue;
    } else {
      this.toRange = this.fromRange + this.step;
      this.maxInput.nativeElement.value = this.toRange.toString();
    }
    this.filterByPrice();
  }

  onChangeMin(value: string | number) {
    let minValue = typeof value === 'string' ? parseInt(value, 10) : value;

    if (this.toRange > minValue) {
      this.fromRange = minValue;
    } else {
      this.fromRange = this.toRange - this.step;
      this.minInput.nativeElement.value = this.fromRange.toString();
    }

    this.filterByPrice();
  }

  filterByPrice() {
    const filtered = this.products.filter(
      (product: Product) =>
        product.price >= this.fromRange && product.price <= this.toRange
    );

    this.filterPrice.emit(filtered);
  }
}
