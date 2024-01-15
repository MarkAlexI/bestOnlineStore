import { Component, Input, inject } from '@angular/core';
import { NgForOf } from '@angular/common';
import { IconComponent } from '@shared/components/icon/icon.component';
import { ReviewService } from '@shared/services/review.service';
import { FormsModule } from '@angular/forms';
import { Review } from '@interfaces/review.interface';
import { Product } from '@interfaces/product.interfaces';
import { FeedbackItemComponent } from './feedback-item/feedback-item.component';

@Component({
  selector: 'app-feedbacks',
  standalone: true,
  templateUrl: './feedbacks.component.html',
  imports: [NgForOf, IconComponent, FormsModule, FeedbackItemComponent],
  styleUrls: ['./feedbacks.component.scss'],
})
export class FeedbacksComponent {
  @Input() product!: Product;
  public feedback: string = '';
  public file!: string;

  private readonly reviewService = inject(ReviewService);

  addReview() {
    const userID = JSON.parse(localStorage.getItem('user')!)._id;
    const review: Review = {
      comment: this.feedback,
      user: userID,
      product: this.product._id,
      rating: 2,
    };
    if (userID) {
      this.reviewService.addReview(review).subscribe();
    }
  }
}
