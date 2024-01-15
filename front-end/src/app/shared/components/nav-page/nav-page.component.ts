import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-page.component.html',
  styleUrls: ['./nav-page.component.scss'],
})
export class NavPageComponent {
  currentPage = 1;
  pages = 0;

  nextPage() {
    if (this.pages > this.currentPage) {
      this.currentPage += 1;
    }
  }

  prevPage() {
    if (this.currentPage - 1) {
      this.currentPage -= 1;
    }
  }
}
