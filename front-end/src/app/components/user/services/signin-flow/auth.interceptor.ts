import {
  HttpRequest,
  HttpEvent,
  HttpInterceptorFn,
  HttpHandlerFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, Observable } from 'rxjs';

import { SpinnerService } from '@shared/services/interaction/spinner.service';
import { AuthService } from './auth.service';

export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const auth = inject(AuthService);
  const spinner = inject(SpinnerService);
  const token = localStorage.getItem('token');
  const url = req.url.split('/').includes('google');

  spinner.enableSpinner();

  if (auth.isAuth() && !url && token) {
    const authToken = req.clone({
      headers: req.headers.set('Authorization', token),
    });
    return next(authToken).pipe(finalize(() => spinner.disableSpinner()));
  }
  return next(req).pipe(finalize(() => spinner.disableSpinner()));
};
