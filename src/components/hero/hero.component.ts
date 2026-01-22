
import { Component, ChangeDetectionStrategy, signal, computed, effect, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class HeroComponent implements OnDestroy {
  languageService = inject(LanguageService);
  t = this.languageService.current;

  private backgroundImages = [
    'https://i.imgur.com/WuohzB4.jpeg',
    'https://i.imgur.com/9exWRg4.jpeg',
    'https://i.imgur.com/mJYL8im.jpeg',
    'https://i.imgur.com/aplSAII.jpeg',
    'https://i.imgur.com/T1cACFM.jpeg',
    'https://i.imgur.com/YApGgeP.jpeg',
    'https://i.imgur.com/pWokpf7.jpeg',
    'https://i.imgur.com/Rh9rXkF.jpeg',
    'https://i.imgur.com/lwoDPjx.jpeg',
    'https://i.imgur.com/aQoOp0p.jpeg',
    'https://i.imgur.com/X6Srkff.jpeg',
    'https://i.imgur.com/8Ommd3i.jpeg',
    'https://i.imgur.com/0QpCc5u.jpeg',
    'https://i.imgur.com/x6hIf5a.jpeg',
    'https://i.imgur.com/hP9exC5.jpeg'
  ];

  currentImageIndex = signal(0);
  currentImage = computed(() => `url(${this.backgroundImages[this.currentImageIndex()]})`);
  
  private intervalId?: ReturnType<typeof setInterval>;

  constructor() {
    this.startSlider();
  }
  
  startSlider() {
     this.intervalId = setInterval(() => {
      this.currentImageIndex.update(i => (i + 1) % this.backgroundImages.length);
    }, 5000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}