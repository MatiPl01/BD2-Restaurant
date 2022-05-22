import { Component, Input } from "@angular/core"

@Component({
  selector: 'shared-loading-spinner',
  template: `
    <div class="loading-spinner" [ngClass]="{visible}">
      <div class="loading-spinner__container">
        <svg class="loading-spinner__svg" viewBox="0 0 32 32">
          <circle cx='16' cy='16' r='16' />
        </svg>
      </div>
    </div>
  `
})
export class LoadingSpinnerComponent {
  @Input() visible!: boolean
}
