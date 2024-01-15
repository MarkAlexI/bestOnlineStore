import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';

import { configs } from '@configs/configs';
import { Product } from '@interfaces/product.interfaces';
import { PAYLOAD } from '@interfaces/request.interface';
import { Orders } from '@interfaces/user.interface';
import { HttpErrorHandlerService } from '@shared/services/http-error-handler.service';
import { AlertService } from '@shared/services/interaction/alert.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly http = inject(HttpClient);
  private readonly handleError = inject(HttpErrorHandlerService);
  private readonly alertService = inject(AlertService);
  productsInCart = new BehaviorSubject<Orders[]>([]);
  productsInCart$ = this.productsInCart.asObservable();

  getCart(): Observable<Product> {
    return this.http.get<Product>(`${configs.URL}/cart/get-cart`).pipe(
      tap((res: any) => {
        this.productsInCart.next(res.payload.items);
      })
    );
  }

  makeOrder(
    productId: string,
    quantity: number = 1,
    isCourier?: boolean
  ): Observable<PAYLOAD<Orders>> {
    return this.http
      .post<PAYLOAD<Orders>>(`${configs.URL}/cart/add-to-cart`, {
        productId,
        quantity,
        isCourier,
      })
      .pipe(
        tap((res: any) => {
          if (quantity === 0) {
            this.alertService.warning('Товар було видалено');
          } else if (res) {
            this.productsInCart.next(res.payload.items);
            this.alertService.success('Товар додано до кошика успішно!');
          }
        }),

        catchError(
          this.handleError.handleError<PAYLOAD<Orders>>('Виникла помилка')
        )
      );
  }
}
