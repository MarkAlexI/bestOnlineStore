import { Route } from '@angular/router';

export const ADMIN_ROUTING: Route[] = [
  {
    path: 'admin',
    loadComponent: () =>
      import('./layout/layout.component').then((m) => m.LayoutComponent),
  },
];
