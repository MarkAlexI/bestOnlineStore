import { Route } from '@angular/router';

export const ADMIN_ROUTING: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./shared/layout/layout.component').then((m) => m.LayoutComponent),

    children: [
      {
        path: 'products',
        loadChildren: () =>
          import('./components/products/products.routing').then(
            (m) => m.PRODUCTS_ROUTING
          ),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./components/orders/orders.component').then(
            (m) => m.OrdersComponent
          ),
      },
      {
        path: 'reviews',
        loadComponent: () =>
          import('./components/reviews/reviews.component').then(
            (m) => m.ReviewsComponent
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./components/users/users.routing').then(
            (m) => m.USERS_ROUTING
          ),
      },
      {
        path: 'edit',
        loadComponent: () =>
          import('./components/edit/edit.component').then(
            (m) => m.EditComponent
          ),
      },
    ],
  },
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  { path: '**', redirectTo: '/admin', pathMatch: 'full' },
];
