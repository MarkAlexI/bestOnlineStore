import { Route } from '@angular/router';
import { authGuard } from './services/signin-flow/auth.guard';

export const USER_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./components/user/user.component').then((m) => m.UserComponent),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: '/user', pathMatch: 'full' },
      {
        path: '',
        loadComponent: () =>
          import('./components/info/info.component').then(
            (m) => m.InfoComponent
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
        path: 'wishlist',
        loadComponent: () =>
          import('./components/wishlist/wishlist.component').then(
            (m) => m.WishlistComponent
          ),
      },
    ],
  },
];
