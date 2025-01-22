import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { configs } from '@configs/configs';
import { catchError, config } from 'rxjs';
import { Review } from '@interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(HttpErrorHandlerService);

  addReview(review: any) {
    return this.http
      .post(`${configs.URL}/review/add`, review)
      .pipe(
        catchError(
          this.errorHandler.handleError<Review>('Помилка при залишенні відгуку')
        )
      );
  }

  getReview(productId: string) {
    return this.http
      .get(`${configs.URL}/review/product/${productId}`)
      .pipe(
        catchError(
          this.errorHandler.handleError<Review>('Помилка при отриманні відгуку')
        )
      );
  }

  updateReview(reviewId: string, review: Review) {
    return this.http
      .put(`${configs.URL}/review/update/${reviewId}`, review)
      .pipe(
        catchError(
          this.errorHandler.handleError<Review>('Помилка при оновленні відгуку')
        )
      );
  }

  deleteReview(reviewId: string) {
    return this.http
      .delete(`${configs.URL}/review/delete/${reviewId}`)
      .pipe(
        catchError(
          this.errorHandler.handleError<Review>('Помилка при оновленні відгуку')
        )
      );
  }
}
