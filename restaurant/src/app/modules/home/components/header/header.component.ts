import { Component, ElementRef } from '@angular/core';
import { VisualizationService } from '@core/services/visualization.service';

@Component({
  selector: 'home-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private headerRef: ElementRef,
              private visualizationService: VisualizationService) {
    this.visualizationService.notifyHeaderVisible(true);
  }

  public scrollDown(): void {
    this.visualizationService.scrollY(this.headerRef.nativeElement.clientHeight + 1)
  }

  public notifyHeaderVisibilityChange(isVisible: boolean): void {
    this.visualizationService.notifyHeaderVisible(isVisible);
  }
}
