import { Route } from '@angular/router';

export const USERS_ROUTING: Route[] = [
  {
    path: '',

    children: [
      { path: '', redirectTo: '/admin/users', pathMatch: 'full' },
      {
        path: '',
        loadComponent: () =>
          import('./users.component').then((m) => m.UsersComponent),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./user/user.component').then((m) => m.UserComponent),
      },
    ],
  },
];
