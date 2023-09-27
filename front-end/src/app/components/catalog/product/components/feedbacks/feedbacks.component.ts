import {Component} from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-feedbacks',
  standalone: true,
  templateUrl: './feedbacks.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./feedbacks.component.scss']
})
export class FeedbacksComponent {

}
