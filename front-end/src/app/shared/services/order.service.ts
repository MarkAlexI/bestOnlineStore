import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { configs } from '@configs/configs';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { Observable, catchError, map } from 'rxjs';
import { Orders } from '@interfaces/user.interface';
import { DepData } from '@interfaces/department';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly http = inject(HttpClient);
  private readonly httpError = inject(HttpErrorHandlerService);

  getOrders(): Observable<Orders[]> {
    return this.http
      .get<Orders[]>(`${configs.URL}/order`)
      .pipe(
        catchError(
          this.httpError.handleError<Orders[]>('Помилка отримання замовленнь')
        )
      );
  }

  makeOrder(order: DepData): Observable<Orders[]> {
    return this.http
      .post<Orders[]>(`${configs.URL}/order`, order)
      .pipe(
        catchError(
          this.httpError.handleError<Orders[]>(
            'Помилка підтвердження замовлення'
          )
        )
      );
  }

  getOrderHistory(): Observable<Orders[]> {
    return this.http.get<Orders[]>(`${configs.URL}/order/order-history`).pipe(
      map((res: any) => {
        return res.payload;
      }),
      catchError(
        this.httpError.handleError<Orders[]>('Помилка отримання замовленнь')
      )
    );
  }

  deleteOrder(id: string): Observable<void> {
    return this.http.delete<void>(`${configs.URL}/order/${id}`);
  }

  getOrderById(orderId: string) {}
}
