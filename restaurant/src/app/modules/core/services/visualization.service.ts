import { Injectable, EventEmitter } from '@angular/core'
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VisualizationService {
  headerVisibilityChangedEvent = new EventEmitter<boolean>()
  scrollAvailabilityChangedEvent = new EventEmitter<boolean>()
  popupDisplayChangedEvent = new EventEmitter<boolean>()
  menuToggleEvent = new EventEmitter<boolean>()

  private readonly _isLoading = new BehaviorSubject<boolean>(false);

  get isLoading(): BehaviorSubject<boolean> {
    return this._isLoading;
  }

  notifyHeaderVisible(isVisible: boolean): void {
    this.headerVisibilityChangedEvent.emit(isVisible);
  }

  notifyNavMenuToggle(isOpen: boolean): void {
    this.menuToggleEvent.emit(isOpen);
  }

  scrollY(offset: number, isSmooth: boolean = true): void {
    window.scrollTo({
      top: offset,
      // @ts-ignore
      behavior: isSmooth ? 'smooth' : 'instant'
    })
  }

  setScroll(isEnabled: boolean): void {
    if (!isEnabled) document.querySelector('body')?.classList.add('no-scroll');
    else document.querySelector('body')?.classList.remove('no-scroll');
    this.scrollAvailabilityChangedEvent.emit(isEnabled);
  }

  setPopupOpen(isOpen: boolean): void {
    this.setScroll(!isOpen);
    this.popupDisplayChangedEvent.emit(isOpen);
  }
}
