import { HttpClient } from '@angular/common/http';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, retry } from 'rxjs';
import { Auth, signOut } from '@angular/fire/auth';

import { configs, httpConfig } from '@configs/configs';
import { User } from '@interfaces/user.interface';
import { AlertService } from '@shared/services/interaction/alert.service';
import { PAYLOAD } from '@interfaces/request.interface';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorHandlerService } from '@shared/services/http-error-handler.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly alertService = inject(AlertService);
  private readonly googleAuth = inject(Auth);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly httpErrorHandler = inject(HttpErrorHandlerService);
  private user = new BehaviorSubject<PAYLOAD | null>(
    JSON.parse(localStorage.getItem('user')!)
  );
  private user$: Observable<PAYLOAD | null> = this.user.asObservable();

  signIn(user: User): void {
    if (this.isAuth()) {
      this.alertService.warning('Вхід вже здійснено!');
      // check it later
    }
    this.http
      .post<PAYLOAD>(`${configs.URL}/user/signin`, user, httpConfig)
      .pipe(
        retry(3),
        map((res) => {
          localStorage.setItem('user', JSON.stringify(res));
          this.user.next(res);
          return res;
        }),
        catchError(
          this.httpErrorHandler.handleError<User>(
            `Помилка входу. Повторіть спробу!] `
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((res: any) => {
        if (res) {
          this.setLocalStorage(res.payload);
          // this.alertService.success('Вхід здійснено успішно');
          this.router.navigate(['/user']);
        }
      });
  }

  signup(user: User): void {
    this.http
      .post<PAYLOAD>(configs.URL + configs.REGISTER_ROOT, user)
      .pipe(
        map((res) => {
          localStorage.setItem('user', JSON.stringify(res));
          this.user.next(res);
          return res;
        }),
        catchError(
          this.httpErrorHandler.handleError<User>(
            `Виникла помилка під час реєстрації. Повторіть спробу!`
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((res: any) => {
        const payload = res.payload;
        if (payload) {
          this.setLocalStorage(payload);
          this.router.navigate(['/user']);
        }
      });
  }

  googleLogin(gtoken: string): void {
    this.http
      .post(configs.URL + configs.GOOGLE_ROOT, { gtoken })
      .pipe(
        map((res: any) => {
          localStorage.setItem('user', JSON.stringify(res));
          this.user.next(res);
          return res;
        }),
        catchError(
          this.httpErrorHandler.handleError<void>(
            'Виникла помилка при здійсненні Google login!'
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((res: any) => {
        if (res?.payload) {
          this.setLocalStorage(res?.payload);
          // this.alertService.success('Вхід здійснено успішно');
          this.router.navigate(['/user']);
        }
      });
  }

  isAuth(): boolean {
    const user = this.user.value;
    const token = localStorage.getItem('token');

    return token === user?.payload.token && token ? true : false;
  }

  signOut(): void {
    if (this.isAuth()) {
      signOut(this.googleAuth)
        .then(() => {
          localStorage.clear();
          this.user.next(null);
          // this.alertService.success('Вихід здійснено успішно!');
          this.router.navigate(['/']);
        })
        .catch((error) => {
          this.alertService.danger(
            'Виникла помилка при виході!',
            error.message
          );
        });
    } else {
      this.alertService.warning('Ви маєте бути зареєстровані!');
    }
  }

  setLocalStorage(payload: any) {
    // time for session 24h ahead
    const expDate = new Date(
      new Date().getTime() + 24 * 3600 * 1000
    ).toString();

    payload.expDate = expDate;

    for (const item in payload) {
      localStorage.setItem(item, payload[item]);
    }
  }
}
