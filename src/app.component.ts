import { Component, ChangeDetectionStrategy, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { ProductsComponent } from './components/products/products.component';
import { WhatsappLinksComponent } from './components/whatsapp-links/whatsapp-links.component';
import { FooterComponent } from './components/footer/footer.component';
import { FloatingContactButtonsComponent } from './components/floating-contact-buttons/floating-contact-buttons.component';
import { ThemeService } from './services/theme.service';
import { LanguageService } from './services/language.service';
import { NavigationService } from './services/navigation.service';
import { GalleryComponent } from './components/gallery/gallery.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    ProductsComponent,
    WhatsappLinksComponent,
    FooterComponent,
    FloatingContactButtonsComponent,
    GalleryComponent,
  ],
  host: {
    '[class]': 'hostClasses()',
    '[attr.dir]': 'hostDir()',
    '[attr.lang]': 'hostLang()'
  }
})
export class AppComponent {
  themeService = inject(ThemeService);
  languageService = inject(LanguageService);
  navigationService = inject(NavigationService);

  currentPage = this.navigationService.currentPage;

  hostClasses = signal('');
  hostDir = signal('rtl');
  hostLang = signal('ar');

  constructor() {
    effect(() => {
      const theme = this.themeService.theme();
      const lang = this.languageService.language();
      
      const langClass = lang === 'ar' ? 'font-cairo' : 'font-montserrat';
      const themeClass = theme === 'dark' ? 'dark' : '';
      
      this.hostClasses.set(`${langClass} ${themeClass}`.trim());
      this.hostDir.set(lang === 'ar' ? 'rtl' : 'ltr');
      this.hostLang.set(lang);
      
      document.documentElement.classList.toggle('dark', theme === 'dark');
      document.documentElement.lang = lang;
      document.documentElement.dir = this.hostDir();
    });
  }
}