import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { AuthInterceptor } from 'app/components/user/services/signin-flow/auth.interceptor';
import { environment } from 'environments/environment.development';

if (environment.production) {
  enableProdMode();
}

export const mainProviders = {
  providers: [
    provideRouter(
      [
        {
          path: '',
          loadChildren: () =>
            import('./app/app.routing').then((m) => m.APP_ROUTING),
        },
      ],
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
    ),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideAuth(() => getAuth())
    ),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideAnimations(),
  ],
};
