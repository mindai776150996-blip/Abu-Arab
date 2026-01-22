import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product.service';
import { LanguageService } from '../../services/language.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { NavigationService } from '../../services/navigation.service';
import { map, startWith, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { SkeletonCardComponent } from '../skeleton-card/skeleton-card.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ProductCardComponent, ImageModalComponent, SkeletonCardComponent],
})
export class ProductsComponent {
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
  featuredProducts = computed(() => this.products().slice(0, 8));

  selectedProduct = signal<Product | undefined>(undefined);

  openModal(product: Product): void {
    this.selectedProduct.set(product);
  }

  closeModal(): void {
    this.selectedProduct.set(undefined);
  }

  viewGallery() {
    this.navigationService.navigateTo('gallery');
  }
}