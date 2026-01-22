
import { Component, ChangeDetectionStrategy, input, output, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Product } from '../../services/product.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class ImageModalComponent {
  product = input.required<Product>();
  close = output<void>();

  images = computed(() => {
    const imgs = this.product().images;
    if (!imgs || typeof imgs !== 'string') return [];
    return imgs.split(',').map(url => url.trim()).filter(url => url);
  });
  
  currentImageIndex = signal(0);
  currentImage = computed(() => this.images()[this.currentImageIndex()]);

  nextImage(): void {
    if (this.images().length > 1) {
      this.currentImageIndex.update(i => (i + 1) % this.images().length);
    }
  }

  prevImage(): void {
    if (this.images().length > 1) {
      this.currentImageIndex.update(i => (i - 1 + this.images().length) % this.images().length);
    }
  }

  onClose(): void {
    this.close.emit();
  }
}