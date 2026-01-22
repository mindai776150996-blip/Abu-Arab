import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  languageService = inject(LanguageService);
  navigationService = inject(NavigationService);
  t = this.languageService.current;
  currentYear = new Date().getFullYear();

  navigateTo(section: 'home' | 'products' | 'gallery') {
    if (section === 'gallery') {
      this.navigationService.navigateTo('gallery');
    } else {
      this.navigationService.navigateToMainAndScroll(section);
    }
  }
}