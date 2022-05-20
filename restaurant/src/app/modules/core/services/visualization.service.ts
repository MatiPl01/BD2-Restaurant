import { Injectable, EventEmitter } from '@angular/core'
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VisualizationService {
  private static readonly NO_SCROLL_CLASS = 'no-scroll';

  headerVisibilityChangedEvent = new EventEmitter<boolean>()
  scrollAvailabilityChangedEvent = new EventEmitter<boolean>()
  popupDisplayChangedEvent = new EventEmitter<boolean>()

  private readonly _isLoading = new BehaviorSubject<boolean>(false);
  private readonly _isNavOpen = new BehaviorSubject<boolean>(false);

  get isLoading(): BehaviorSubject<boolean> {
    return this._isLoading;
  }

  get isNavOpen(): BehaviorSubject<boolean> {
    return this._isNavOpen;
  }

  notifyHeaderVisible(isVisible: boolean): void {
    this.headerVisibilityChangedEvent.emit(isVisible);
  }

  notifyNavMenuToggle(isOpen: boolean): void {
    this._isNavOpen.next(isOpen);
  }

  scrollY(offset: number, isSmooth: boolean = true): void {
    window.scrollTo({
      top: offset,
      // @ts-ignore
      behavior: isSmooth ? 'smooth' : 'instant'
    })
  }
  
  setScroll(isEnabled: boolean): void {
    document.querySelector('body')?.classList.toggle(
      VisualizationService.NO_SCROLL_CLASS,
      isEnabled
    );
    this.scrollAvailabilityChangedEvent.emit(isEnabled);
  }

  // setPopupOpen(isOpen: boolean): void {
  //   this.setScroll(!isOpen);
  //   this.popupDisplayChangedEvent.emit(isOpen);
  // }
}
