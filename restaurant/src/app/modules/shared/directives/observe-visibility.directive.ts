import { Directive, OnDestroy, OnInit, Input, Output, EventEmitter, ElementRef } from "@angular/core";

@Directive({
  selector: '[observeVisibility]',
})
export class ObserveVisibilityDirective implements OnInit, OnDestroy {
  @Output() visibilityChange = new EventEmitter<boolean>();
  @Input('observerRoot') root: HTMLElement | null = null;
  @Input('observerThreshold') threshold = 0;        // float between 0 and 1
  @Input('observerRootMargin') rootMargin = '0px';  // CSS-like margin for the root container

  private readonly observer: IntersectionObserver;

  constructor(private elementRef: ElementRef) {
    const options = {
      root: this.root,
      threshold: this.threshold,
      rootMargin: this.rootMargin
    };

    this.observer = new IntersectionObserver(([entry]) => {
      this.visibilityChange.emit(entry.isIntersecting);
    }, options);
  }
  
  ngOnInit(): void {
    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer.unobserve(this.elementRef.nativeElement);
  }
}
