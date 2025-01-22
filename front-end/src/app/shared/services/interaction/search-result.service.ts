import { Injectable } from '@angular/core';
import { Product } from '@interfaces/product.interfaces';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchResultService {
  private searchResult = new Subject<Product[]>();

  public searchResult$ = this.searchResult.asObservable();

  passResult(result: Product[]) {
    this.searchResult.next(result);
  }
}
