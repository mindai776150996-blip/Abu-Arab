
import { Component, ChangeDetectionStrategy, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class LoginComponent {
  closeLogin = output<void>();
  languageService = inject(LanguageService);
  t = this.languageService.current;

  onClose() {
    this.closeLogin.emit();
  }
}
