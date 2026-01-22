import { Component, ChangeDetectionStrategy, input, output, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Product } from '../../services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class ProductCardComponent {
  product = input.required<Product>();
  isSelected = input(false);
  view = output<Product>();

  imageError = signal(false);

  images = computed(() => {
    const imgs = this.product().images;
    if (!imgs || typeof imgs !== 'string') return [];
    return imgs.split(',').map(url => url.trim()).filter(url => url);
  });
  
  currentImageIndex = signal(0);
  currentImage = computed(() => this.images()[this.currentImageIndex()]);

  nextImage(event: Event): void {
    event.stopPropagation();
    if (this.images().length > 1) {
      this.currentImageIndex.update(i => (i + 1) % this.images().length);
      this.imageError.set(false); // Reset error state on image change
    }
  }

  prevImage(event: Event): void {
    event.stopPropagation();
    if (this.images().length > 1) {
      this.currentImageIndex.update(i => (i - 1 + this.images().length) % this.images().length);
      this.imageError.set(false); // Reset error state on image change
    }
  }

  onViewClick(event: Event): void {
    event.stopPropagation();
    this.view.emit(this.product());
  }

  handleImageError() {
    this.imageError.set(true);
  }
}