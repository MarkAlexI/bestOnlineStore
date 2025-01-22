import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AlertService } from './interaction/alert.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerService {
  private alertService = inject(AlertService);

  handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      this.alertService.danger(
        operation,
        // error.message.split(' ').splice(0, 3).join(' ')
        error?.error.text
      );

      return of(result as T);
    };
  }
}
