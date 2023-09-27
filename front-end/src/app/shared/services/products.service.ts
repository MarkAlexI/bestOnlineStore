import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { configs } from '@configs/configs';
import { catchError, map, Observable } from 'rxjs';
import { Product } from '@interfaces/product.interfaces';
import { HttpErrorHandlerService } from './http-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(HttpErrorHandlerService);

  getProductsApi(): Observable<Product[]> {
    return this.http.get<any>(`${configs.URL}/product`).pipe(
      map((response) => response.payload),
      catchError(
        this.errorHandler.handleError<Product[]>('Не вдалося отримати дані!')
      )
    );
  }

  getProductByIdApi(id: string | number): Observable<Product> {
    return this.http.get<any>(`${configs.URL}/product/${id}`).pipe(
      map((response) => response.payload),

      catchError(
        this.errorHandler.handleError<Product>('Не вдалося отримати дані!')
      )
    );
  }
}
