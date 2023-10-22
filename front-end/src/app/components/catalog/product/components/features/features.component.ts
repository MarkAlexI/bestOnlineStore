import { Component, Input, OnInit, inject } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { ProductsService } from '@shared/services/products.service';
import { Product } from '@interfaces/product.interfaces';

@Component({
  selector: 'app-features',
  standalone: true,
  templateUrl: './features.component.html',
  imports: [NgForOf, NgIf],
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit {
  features = [
    {
      nameFeature: 'Матеріал: ',
      descFeature: "Високоякісна натуральна шкіра / м'який текстиль",
    },
    {
      nameFeature: 'Наповнення:',
      descFeature:
        "Шар м'якого поролону та пружинна основа для максимального комфорту",
    },
    {
      nameFeature: 'Розміри:',
      descFeature: 'Ширина x Глибина x Висота: ___ см x ___ см x ___ см',
    },
    { nameFeature: 'Колір:', descFeature: 'Вибір з 3 доступних кольорів' },
    {
      nameFeature: 'Ергономіка:',
      descFeature:
        'Підтримуюча форма спини та підлокітників для забезпечення комфортного сидіння ',
    },
    {
      nameFeature: 'Навантаження :',
      descFeature: 'Максимальне навантаження до 200 кг',
    },
    {
      nameFeature: 'Функції:',
      descFeature:
        'Наявність регульованої нахилу спинки, поворотності, можливості блокування позиції',
    },
    {
      nameFeature: 'Додатково:',
      descFeature: 'Варіанти з масажем, обігрівом, підставкою для ніг',
    },
    {
      nameFeature: 'Догляд:',
      descFeature: 'Легке очищення від пилу та бруду зі збереженням вигляду.',
    },
  ];

  @Input() product!: Product;
  private readonly productService = inject(ProductsService);

  ngOnInit(): void {
    console.log(this.product.characteristics);
  }
}
