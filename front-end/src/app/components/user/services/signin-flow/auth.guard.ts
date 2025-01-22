import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@shared/services/interaction/alert.service';
import { AuthService } from './auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const alert = inject(AlertService);
  const expDate = localStorage.getItem('expDate');

  if (expDate) {
    if (new Date().getTime() > new Date(expDate).getTime()) {
      authService.signOut();
      alert.warning('Термін дії сесії закінчився! Здійсніть новий вхід!');
    }
  }

  if (authService.isAuth() && !authService.isAnonym()) {
    return true;
  }

  if (localStorage.getItem('user')) {
    localStorage.clear();
  }

  return router.parseUrl('/login');
};
// protect for visiting sign-in and sign-up pages when a user is already
// logged in
export const loginGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuth()) {
    return true;
  }
  authService.signOut();

  return router.parseUrl('/');
};
