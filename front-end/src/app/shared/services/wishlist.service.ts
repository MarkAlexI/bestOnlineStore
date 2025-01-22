import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { configs } from '@configs/configs';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(HttpErrorHandlerService);

  getWishList(): Observable<any> {
    return this.http.get(`${configs.URL}/wishlist`).pipe(
      map((res: any) => {
        return res.payload;
      }),
      catchError(
        this.errorHandler.handleError<void>(
          'Помилка при отримані списку бажаного'
        )
      )
    );
  }

  addWishList(productId: string) {
    return this.http
      .post(`${configs.URL}/wishlist`, { productId })
      .pipe(
        catchError(
          this.errorHandler.handleError<void>(
            'Помилка при додаванні до списку бажаного'
          )
        )
      );
  }

  removeFromWishList(productId: string) {
    return this.http
      .delete(`${configs.URL}/wishlist/${productId}`)
      .pipe(
        catchError(
          this.errorHandler.handleError<void>(
            'Помилка при даленні зі списку бажаного'
          )
        )
      );
  }
}
