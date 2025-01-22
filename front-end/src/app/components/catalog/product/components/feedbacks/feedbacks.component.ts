import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import { IconComponent } from '@shared/components/icon/icon.component';

@Component({
  selector: 'app-feedbacks',
  standalone: true,
  templateUrl: './feedbacks.component.html',
  imports: [NgForOf, IconComponent],
  styleUrls: ['./feedbacks.component.scss'],
})
export class FeedbacksComponent {}
