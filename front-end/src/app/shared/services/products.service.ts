import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${configs.URL}/product`).pipe(
      map((response: any) => response.payload?.products),
      catchError(
        this.errorHandler.handleError<Product[]>('Не вдалося отримати дані!')
      )
    );
  }

  getProductsPerPage(
    param: string,
    paramKey: string | number
  ): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${configs.URL}/product?${param}=${paramKey}`)
      .pipe(
        map((response: any) => response.payload?.products),
        catchError(
          this.errorHandler.handleError<Product[]>('Не вдалося отримати дані!')
        )
      );
  }

  getSubcategoryPerPage(
    param: string,
    paramKey: string | number,
    subcategory: string
  ): Observable<Product[]> {
    return this.http
      .get<Product[]>(
        `${configs.URL}/product?${param}=${paramKey}&subcategory=${subcategory}`
      )
      .pipe(
        map((response: any) => response.payload?.products),
        catchError(
          this.errorHandler.handleError<Product[]>('Не вдалося отримати дані!')
        )
      );
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${configs.URL}/product/${id}`).pipe(
      map((response: any) => response.payload),

      catchError(
        this.errorHandler.handleError<Product>('Не вдалося отримати дані!')
      )
    );
  }

  getByName() {
    this.http
      .get(`${configs.URL}/product/search`)
      .pipe(
        catchError(
          this.errorHandler.handleError<Product>('Не вдалося отримати дані!')
        )
      );
  }

  createProduct(product: any) {
    return this.http
      .post(`${configs.URL}/product`, product)
      .pipe(
        catchError(
          this.errorHandler.handleError<Product>('Не вдалося створити!')
        )
      );
  }

  searchProduct(pr: string) {
    return this.http.get(`${configs.URL}/product/search?keyword=${pr}`).pipe(
      map((res: any) => res.payload),
      catchError(this.errorHandler.handleError<Product>('Товар не знайдено!'))
    );
  }

  updateProduct(product: any, id: string) {
    return this.http
      .put(`${configs.URL}/product/${id}`, product)
      .pipe(
        catchError(
          this.errorHandler.handleError<Product>('Не вдалося оновити!')
        )
      );
  }

  uploadImageProduct(file: File, productId: string) {
    const formParams = new FormData();
    formParams.append('file', file);
    formParams.append('entityId', productId);

    return this.http
      .post(`${configs.URL}/upload/product`, formParams)
      .pipe(
        catchError(
          this.errorHandler.handleError('Помилка заватаження зображення')
        )
      );
  }

  viewedProduct(id: string, body: { viewed: number }): Observable<any> {
    return this.http.patch(`${configs.URL}/product/${id}`, body);
  }

  deleteProduct(id: string) {
    return this.http
      .delete(`${configs.URL}/product/${id}`)
      .pipe(
        catchError(
          this.errorHandler.handleError<Product>('Не вдалося видалити дані!')
        )
      );
  }
}
