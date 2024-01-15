import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Review } from '@interfaces/user.interface';
import { IconComponent } from '@shared/components/icon/icon.component';
import { ReviewService } from '@shared/services/review.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  public reviews: Review[] = [
    {
      title: 'Наталі Портман',
      date: '19 серпня 2023 13:17',
      rate: 4.8,
      images: [
        'https://img.freepik.com/premium-photo/blue-color-chair-product-image-web-page-scandinavian-design-clean-soft-chair-comfortable-with-copy-space-generatiev-ai_834602-16335.jpg',
        'https://img.freepik.com/premium-photo/blue-color-chair-product-image-web-page-scandinavian-design-clean-soft-chair-comfortable-with-copy-space-generatiev-ai_834602-16335.jpg',
        'https://img.freepik.com/premium-photo/blue-color-chair-product-image-web-page-scandinavian-design-clean-soft-chair-comfortable-with-copy-space-generatiev-ai_834602-16335.jpg',
      ],
      text: `Це крісло - справжній знахідка! Воно не тільки виглядає стильно та сучасно в моєму інтер'єрі, але й надзвичайно зручне. Подушки м'які і підтримують спину ідеально. Мені подобається можливість регулювання нахилу спинки, це дозволяє знайти найкраще положення для роботи та відпочинку.`,
      advantage:
        'Я вже маю це крісло деякий час і досі не виявив жодних ознак зносу.',
      disadvantage:
        'Що до недоліків, щось мені здається, що підлокітники могли б бути трохи ширше. Але це дрібниця порівняно з усіма перевагами цього чудового крісла.',
      likes: 125,
      dislikes: 0,
    },
  ];

  private readonly reviewService = inject(ReviewService);
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          return this.reviewService.getReview(params.get('id')!);
        })
      )
      .subscribe((res) => console.log(res));
  }
}
