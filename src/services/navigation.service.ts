import { Injectable, signal } from '@angular/core';

export type Page = 'main' | 'gallery';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  currentPage = signal<Page>('main');

  navigateTo(page: Page) {
    this.currentPage.set(page);
    window.scrollTo(0, 0); // Scroll to top on page change
  }

  navigateToMainAndScroll(elementId: string) {
    if (this.currentPage() !== 'main') {
        this.currentPage.set('main');
        // Use setTimeout to ensure the DOM has updated before scrolling
        setTimeout(() => {
            document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    } else {
        document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
    }
  }
}