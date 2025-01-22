import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnDestroy {
  photos = [
    { url: 'assets/pics/png/carusel1.jpg', alt: '' },
    { url: 'assets/pics/png/carusel2.jpg', alt: '' },
    { url: 'assets/pics/png/carusel3.jpg', alt: '' },
    { url: 'assets/pics/png/carusel4.jpg', alt: '' }
  ];
  slideIndex = 0;
  autoPlayInterval: any;
  isMouseOverSlide = false;
  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  nextSlide() {
    this.slideIndex = (this.slideIndex + 1) % this.photos.length;
  }

  prevSlide() {
    this.slideIndex = (this.slideIndex - 1 + this.photos.length) % this.photos.length;
  }

  goToSlide(index: number) {
    this.slideIndex = index;
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      if (!this.isMouseOverSlide) {
        this.nextSlide();
      }
    }, 7000);
  }

  stopAutoPlay() {
    clearInterval(this.autoPlayInterval);
  }

  handleMouseEnter() {
    this.isMouseOverSlide = true;
    this.stopAutoPlay();
  }

  handleMouseLeave() {
    this.isMouseOverSlide = false;
    this.startAutoPlay();
  }
}
