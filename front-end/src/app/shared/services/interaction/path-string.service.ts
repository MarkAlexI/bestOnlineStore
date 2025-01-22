import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PathStringService {
  private pathCategory = new Subject<string>();
  private pathSubCategory = new Subject<string>();

  public pathCategory$ = this.pathCategory.asObservable();
  public pathSubCategory$ = this.pathSubCategory.asObservable();

  makePathCategory(category: string) {
    if (category) {
      this.pathCategory.next(category);
    }
  }

  makePathSubCategory(subcategory: string) {
    if (subcategory) {
      this.pathSubCategory.next(subcategory);
    }
  }
}
