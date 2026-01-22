import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-skeleton-card',
  template: `
    <div class="aspect-square bg-gray-200 dark:bg-[#2a2a2a] rounded-lg shadow-lg animate-pulse">
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonCardComponent {}