import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformPrice',
  standalone: true,
})
export class TransformPricePipe implements PipeTransform {
  transform(price: number | undefined): string {
    if (price) {
      const formattedPrice = new Intl.NumberFormat('uk-UA', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(price);
      return formattedPrice + ' ₴';
    }
    return '';
  }
}
