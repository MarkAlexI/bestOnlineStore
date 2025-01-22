import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { configs } from '@configs/configs';
import { HttpErrorHandlerService } from '@shared/services/http-error-handler.service';
import { Observable, Subject, catchError, tap } from 'rxjs';

@Injectable()
export class RecoverPassService {
  private readonly http = inject(HttpClient);
  private readonly httpErrorHandler = inject(HttpErrorHandlerService);
  private readonly router = inject(Router);

  private recoverRes = new Subject<string>();
  public recoverRes$: Observable<string> = this.recoverRes.asObservable();

  recoverPass(email: string) {
    return this.http
      .post(configs.URL + '/user/forgot-password', { email })
      .pipe(
        tap((res: any) => {
          if (res && res.message && res.text) {
            this.recoverRes.next(
              'Для подальшого відновлення перейдіть за посиланням надісланим на Ваш e-mail'
            );
            this.router.navigate(['/login', { token: 'token' }]);
          } else {
            this.recoverRes.next('Сталася помилка! Повторіть спробу!');
          }
        }),

        catchError(
          this.httpErrorHandler.handleError<void>(
            'Виникла помилка під час відновлення паролю!'
          )
        )
      );
  }

  setNewPass(token: string, newPassword: string): Observable<void> {
    return this.http
      .post(configs.URL + '/user/reset-password', {
        newPassword,
        token,
      })
      .pipe(
        tap((res: any) => {
          if (res && res.message && res.text) {
            this.recoverRes.next('Здійсніть вхід з новим паролем');
            this.router.navigate(['/login', { token: 'token' }]);
          } else {
            this.recoverRes.next('Сталася помилка! Повторіть спробу!');
          }
        }),
        catchError(
          this.httpErrorHandler.handleError<void>(
            'Виникла помилка під час відновлення паролю!'
          )
        )
      );
  }

  getRecoverRes(): Observable<string> {
    return this.recoverRes$;
  }
}
