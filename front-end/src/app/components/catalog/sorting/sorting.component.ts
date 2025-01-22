import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '@interfaces/product.interfaces';

@Component({
  selector: 'app-sorting',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss'],
})
export class SortingComponent {
  @Input() products: Product[] = [];
  @Output() sortedProducts = new EventEmitter<Product[]>();
  isClickSort = false;

  @HostListener('click', ['$event.target']) onClick(event: HTMLElement) {
    const value = event.innerText;
    if (value === 'Спочатку дорожчі') {
      this.sortedProducts.emit(this.sortByHigherPrice());
    }

    if (value === 'Спочатку дешевші') {
      this.sortedProducts.emit(this.sortByLowerPrice());
    }

    if (value === 'Новинки') {
      this.sortedProducts.emit(this.sortByNew());
    }
  }

  sortByNew(): Product[] {
    return this.products.sort((a, b) => Number(b.new) - Number(a.new));
  }

  sortByLowerPrice(): Product[] {
    return this.products.sort((a, b) => a.price - b.price);
  }

  sortByHigherPrice(): Product[] {
    return this.products.sort((a, b) => b.price - a.price);
  }
}
