import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService, Product } from '../../services/product.service';
import { LanguageService } from '../../services/language.service';
import { NavigationService } from '../../services/navigation.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ImageModalComponent } from '../image-modal/image-modal.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ProductCardComponent, ImageModalComponent],
})
export class GalleryComponent {
  productService = inject(ProductService);
  languageService = inject(LanguageService);
  navigationService = inject(NavigationService);

  t = this.languageService.current;
  products = toSignal(this.productService.getProducts(), { initialValue: [] as Product[] });

  searchTerm = signal('');
  
  filteredProducts = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) {
      return this.products();
    }
    return this.products().filter(p => 
      (p.name && p.name.toLowerCase().includes(term)) || 
      (p.description && p.description.toLowerCase().includes(term))
    );
  });

  selectedProduct = signal<Product | undefined>(undefined);

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  openModal(product: Product): void {
    this.selectedProduct.set(product);
  }

  closeModal(): void {
    this.selectedProduct.set(undefined);
  }

  goBack() {
    this.navigationService.navigateTo('main');
  }
}