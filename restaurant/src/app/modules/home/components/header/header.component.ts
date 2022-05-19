import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { VisualizationService } from '@core/services/visualization.service';

@Component({
  selector: 'home-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('header') headerRef!: ElementRef;
  private observer: IntersectionObserver

  constructor(private visualizationService: VisualizationService) {
    this.visualizationService.notifyHeaderVisible(true);
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        this.visualizationService.notifyHeaderVisible(entry.isIntersecting)
      })
    })
  }

  ngAfterViewInit(): void {
    this.observer.observe(this.headerRef.nativeElement);
  }

  public scrollDown(): void {
    this.visualizationService.scrollY(this.headerRef.nativeElement.clientHeight + 1)
  }
}
