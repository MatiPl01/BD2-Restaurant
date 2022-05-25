import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { VisualizationService } from '@core/services/visualization.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'core-scroll-top-button',
  template: `
    <div class="scroll-top-button-helper"
      [ngStyle]="{ height: MIN_SCROLL }"
      observeVisibility
      #helper
      (visibilityChange)="updateVisibility($event)"
    ></div>

    <button class="scroll-top-button"
          [ngClass]="{ hidden: !isVisible }"
          (click)="scrollToTop()"
           #button>
      <span></span>
    </button>
  `
})
export class ScrollTopBtnComponent implements OnDestroy {
  public readonly MIN_SCROLL = '500px';

  @ViewChild('button') buttonRef!: ElementRef;
  @ViewChild('helper') helperRef!: ElementRef;

  private readonly subscriptions: Subscription[] = [];
  private isEnabled = true;
  private canBeVisible = false;
  public isVisible = false;

  constructor(private visualizationService: VisualizationService) {
    this.subscriptions.push(
      this.visualizationService.scrollAvailabilityChangedEvent.subscribe(isEnabled => {
        this.isEnabled = isEnabled;
        this.isVisible = isEnabled && this.canBeVisible;
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public updateVisibility(isHidden: boolean): void {
    this.canBeVisible = this.isEnabled && !isHidden;
    this.isVisible = this.isEnabled && this.canBeVisible;
  }

  public scrollToTop(): void {
    this.visualizationService.scrollY(0);
    this.buttonRef.nativeElement.classList.add('anim');

    setTimeout(() => {
      this.buttonRef.nativeElement.classList.remove('anim');
    }, 750);
  }
}
