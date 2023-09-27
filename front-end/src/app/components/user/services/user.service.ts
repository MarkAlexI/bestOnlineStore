import { HttpClient } from '@angular/common/http';
import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { configs } from '@configs/configs';
import { User, UserInfo } from '@interfaces/user.interface';
import { HttpErrorHandlerService } from '@shared/services/http-error-handler.service';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);
  private readonly httpErrorHeandler = inject(HttpErrorHandlerService);

  getUsers() {
    this.http
      .get(`${configs.URL}/user/all`)
      .pipe(
        catchError(
          this.httpErrorHeandler.handleError<User>(
            'Невдалося отримати користувачів!'
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  getUserById(userID: string): Observable<User> {
    return this.http
      .get<User>(`${configs.URL}/user/${userID}`)
      .pipe(
        catchError(
          this.httpErrorHeandler.handleError<User>(
            'Невдалося отримати користувача!'
          )
        )
      );
  }

  updateUser(user: any) {
    this.http
      .put(`${configs.URL}/user/profile`, user)
      .pipe(
        catchError(
          this.httpErrorHeandler.handleError<User>('Невдалося оновити дані!')
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((res) => console.log(res));
  }


}
