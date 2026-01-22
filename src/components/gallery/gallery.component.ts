import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService, Product } from '../../services/product.service';
import { LanguageService } from '../../services/language.service';
import { NavigationService } from '../../services/navigation.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { map, startWith, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { SkeletonCardComponent } from '../skeleton-card/skeleton-card.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ProductCardComponent, ImageModalComponent, SkeletonCardComponent],
})
export class GalleryComponent {
  productService = inject(ProductService);
  languageService = inject(LanguageService);
  navigationService = inject(NavigationService);

  t = this.languageService.current;
  
  private productsState = toSignal(
    this.productService.getProducts().pipe(
      map(data => ({ loading: false, data })),
      startWith({ loading: true, data: [] as Product[] }),
      catchError(() => of({ loading: false, data: [] as Product[] }))
    ),
    { initialValue: { loading: true, data: [] as Product[] } }
  );

  products = computed(() => this.productsState().data);
  isLoading = computed(() => this.productsState().loading);

  searchTerm = signal('');
  
  filteredProducts = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const prods = this.products();
    if (!term) {
      return prods;
    }
    return prods.filter(p => 
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