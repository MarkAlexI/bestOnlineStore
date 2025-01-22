import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ValidFormService {
  private readonly router = inject(Router);
  private readonly productFormValid = new Subject<boolean>();
  public readonly productFormValid$: Observable<boolean> =
    this.productFormValid.asObservable();

  isValid(valid: boolean) {
    this.productFormValid.next(valid);
  }

  cancel() {
    this.router.navigate(['/admin/products']);
  }
}
