import { Route } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { MenuComponent } from './menu/menu.component';

export const CATALOG_ROUTING: Route[] = [
  {
    path: 'catalog',
    loadComponent: () =>
      import('./categories/categories.component').then(
        (m) => m.CategoriesComponent
      ),
    children: [
      {
        path: '',
        redirectTo: '/catalog/menu',
        pathMatch: 'full',
      },
      {
        path: 'menu',
        component: MenuComponent,
      },
      {
        path: ':subcategory',
        component: ProductComponent,
      },
      {
        path: ':subcategory/:id',
        component: ProductsComponent,
      },
    ],
  },
];
