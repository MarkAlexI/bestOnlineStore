import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  UrlSegment,
} from '@angular/router';
import { map } from 'rxjs';

import { mainCategories } from '@interfaces/catalog.data';
import { Category } from '@interfaces/catalog.interface';
import { PathStringService } from '@shared/services/interaction/path-string.service';

@Component({
  selector: 'app-path',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './path.component.html',
  styleUrls: ['./path.component.scss'],
})
export class PathComponent implements OnInit {
  @Output() passSubcategory = new EventEmitter<string>();

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly pathStringService = inject(PathStringService);
  private catalogs: Category[] = mainCategories;

  public category!: Category[];
  public subcategory!: any;
  public paths: { path: string }[] = [];

  ngOnInit(): void {
    this.route.url
      .pipe(
        map((url: UrlSegment[]) => {
          this.paths = [];
          this.category = this.catalogs.filter(
            (item) => item.routerLink == url[0].path
          );
          if (this.category?.length) {
            this.paths.push({ path: this.category[0].name });

            this.pathStringService.makePathCategory(this.category[0].name);

            if (this.category[0].subcategories?.length) {
              this.subcategory = this.category[0].subcategories?.filter(
                (item) => item.routerLink == url[1].path
              );

              this.pathStringService.makePathSubCategory(
                this.subcategory[0].name
              );

              this.paths.push({ path: this.subcategory[0].name });
              this.passSubcategory.emit(this.subcategory[0].name);
            }
          }

          return this.paths;
        })
      )
      .subscribe();
  }

  followIt(path: string) {
    const category = this.catalogs.filter(
      (item) => item.name == this.paths[0].path
    );
    const subcategory = category[0].subcategories?.filter(
      (item) => item.name == path
    );

    if (subcategory?.length) {
      this.router.navigate([
        '/catalog/',
        category[0].routerLink,
        subcategory[0].routerLink,
      ]);
    }
  }
}
