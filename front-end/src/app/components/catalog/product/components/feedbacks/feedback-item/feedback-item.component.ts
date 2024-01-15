import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewService } from '@shared/services/review.service';
import { IconComponent } from '@shared/components/icon/icon.component';
import { Product } from '@interfaces/product.interfaces';

@Component({
  selector: 'app-feedback-item',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './feedback-item.component.html',
  styleUrls: ['./feedback-item.component.scss'],
})
export class FeedbackItemComponent implements OnInit {
  @Input() product!: Product;
  private readonly reviewService = inject(ReviewService);

  ngOnInit(): void {
    console.log(this.product._id);
    if (this.product._id) {
      this.reviewService
        .getReview(this.product._id)
        .subscribe((res: any) => console.log(res.payload));
    }
  }
}
