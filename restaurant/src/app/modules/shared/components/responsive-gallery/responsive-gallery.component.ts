import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewChildren,
  HostListener,
  AfterViewInit,
  OnInit
} from '@angular/core';
import { ImageEntry } from "@shared/interfaces/image-entry.interface";

@Component({
  selector: 'shared-responsive-gallery',
  templateUrl: './responsive-gallery.component.html'
})
export class ResponsiveGalleryComponent implements OnInit, AfterViewInit {
  @Input() images!: ImageEntry[]; //  TODO - maybe change to single array of objects instead of 3 separate
  @Input() sizes!: string; // TODO - maybe get width from the CSS style property or calc by JS
  @Input() alts!: string[];
  @ViewChild('gallery') galleryRef!: ElementRef;
  @ViewChildren('galleryItem') galleryItemRefs: ElementRef[] = [];

  public indexes: number[] = [];

  isDragging: boolean = false;
  startPosition: number = 0;
  currTranslate: number = 0;
  prevTranslate: number = 0;
  animationID: number = 0;
  currentIdx: number = 0;

  ngOnInit(): void {
    this.indexes = this.getPhotosIndexes();
  }

  ngAfterViewInit(): void {
    this.initEventListeners();
  }

  @HostListener("window:resize", ["$event"])
  onWindowResize(): void {
    this.setPositionByIdx();
  }

  public setImage(idx: number): void {
    this.currentIdx = idx;
    this.setPositionByIdx();
  }

  private touchStart(idx: number): (event: TouchEvent) => void {
    return (event: TouchEvent) => {
      this.currentIdx = idx;
      this.startPosition = this.getTouchX(event);
      this.isDragging = true;
      this.animationID = requestAnimationFrame(this.animate.bind(this));
    }
  }

  private initEventListeners(): void {
    this.galleryRef.nativeElement.addEventListener('contextmenu', (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    })

    this.galleryItemRefs.forEach((galleryItemRef, idx) => {
      const itemEl = galleryItemRef.nativeElement;
      const imageEl = itemEl.querySelector('img');
      imageEl?.addEventListener('dragstart', (e: Event) => e.preventDefault());

      // Touch events
      itemEl.addEventListener('touchstart', this.touchStart(idx).bind(this));
      itemEl.addEventListener('touchend', this.touchEnd.bind(this));
      itemEl.addEventListener('touchmove', this.touchMove.bind(this));

      // Mouse events
      itemEl.addEventListener('mousedown', this.touchStart(idx).bind(this));
      itemEl.addEventListener('mouseup', this.touchEnd.bind(this));
      itemEl.addEventListener('mouseleave', this.touchEnd.bind(this));
      itemEl.addEventListener('mousemove', this.touchMove.bind(this));
    })
  }

  private touchEnd(): void {
    this.isDragging = false;
    cancelAnimationFrame(this.animationID);

    const movedBy = this.currTranslate - this.prevTranslate;

    if (movedBy < -100 && this.currentIdx < this.galleryItemRefs.length - 1) this.currentIdx += 1;
    if (movedBy > 100 && this.currentIdx > 0) this.currentIdx -= 1;

    this.setPositionByIdx();
  }

  private touchMove(e: any): void {
    if (this.isDragging) {
      const currPosition = this.getTouchX(e);
      this.currTranslate = this.prevTranslate + currPosition - this.startPosition;
    }
  }

  private getPhotosIndexes(): number[] {
    return new Array(this.images.length).fill(0).map((_, i) => i);
  }

  private getTouchX(e: any): number {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  }

  private animate(): void {
    this.setTranslate();
    if (this.isDragging) requestAnimationFrame(this.animate.bind(this));
  }

  private setTranslate(): void {
    this.galleryItemRefs.forEach(galleryItemRef => {
      galleryItemRef.nativeElement.style.transform = `translateX(${this.currTranslate}px)`;
    });
  }

  private setPositionByIdx(): void {
    this.currTranslate = this.currentIdx * -this.galleryRef.nativeElement.getBoundingClientRect().width;
    this.prevTranslate = this.currTranslate;
    console.log(this.currTranslate, this.prevTranslate)
    this.setTranslate();
  }
}
