import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Category } from '@interfaces/catalog.interface';
import { mainCategories } from '@interfaces/catalog.data';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  categories: Category[] = mainCategories;
  currentCategory!: string;

  showImg(src: string) {
    if (src !== this.currentCategory) {
      this.currentCategory = src;
    }
  }

  showSubcategories(category: Category) {
    category.showSubcategories = true;
  }

  hideSubcategories() {
    this.categories.forEach((category) => (category.showSubcategories = false));
  }
}
