import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class HeaderComponent {
  themeService = inject(ThemeService);
  languageService = inject(LanguageService);
  navigationService = inject(NavigationService);

  t = this.languageService.current;
  theme = this.themeService.theme;
  lang = this.languageService.language;
  
  navigateTo(section: 'home' | 'products' | 'gallery') {
    if (section === 'gallery') {
      this.navigationService.navigateTo('gallery');
    } else {
      this.navigationService.navigateToMainAndScroll(section);
    }
  }
}