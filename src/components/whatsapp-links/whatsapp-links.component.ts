
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-whatsapp-links',
  templateUrl: './whatsapp-links.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhatsappLinksComponent {
  languageService = inject(LanguageService);
  t = this.languageService.current;
}
