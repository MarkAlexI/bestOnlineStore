import { Route } from '@angular/router';

export const ABOUT_ROUTING: Route[] = [
  {
    path: '',

    children: [
      {
        path: '',
        loadComponent: () =>
          import('./about/about.component').then((m) => m.AboutComponent),
      },
      {
        path: 'FAQ',
        loadComponent: () =>
          import('./faq/faq.component').then((m) => m.FaqComponent),
      },
      {
        path: 'delivery',
        loadComponent: () =>
          import('./delivery/delivery.component').then(
            (m) => m.DeliveryComponent
          ),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./contact/contact.component').then((m) => m.ContactComponent),
      },
      {
        path: 'policy',
        loadComponent: () =>
          import('./policy/policy.component').then((m) => m.PolicyComponent),
      },
    ],
  },
];
