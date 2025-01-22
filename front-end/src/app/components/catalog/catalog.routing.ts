import { Route } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { MenuComponent } from './menu/menu.component';

export const CATALOG_ROUTING: Route[] = [
  {
    path: '',
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
        path: ':category',
        component: MenuComponent,
      },
      {
        path: ':category/:subcategory/:id',
        component: ProductComponent,
      },
      {
        path: ':category/:subcategory',
        component: ProductsComponent,
      },
    ],
  },
];
