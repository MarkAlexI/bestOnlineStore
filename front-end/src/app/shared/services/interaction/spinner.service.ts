import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private spinner = new Subject<boolean>();
  public spinner$ = this.spinner.asObservable();

  enableSpinner() {
    this.spinner.next(true);
  }

  disableSpinner() {
    this.spinner.next(false);
  }
}
