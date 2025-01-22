import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputSelectComponent } from '@shared/components/inputs/input-select/input-select.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, InputSelectComponent],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent {}
