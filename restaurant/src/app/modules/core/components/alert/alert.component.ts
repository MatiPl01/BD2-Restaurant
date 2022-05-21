import { Component, OnDestroy } from "@angular/core";
import { AlertType } from "@core/enums/alert-type.enum";
import { AlertService } from "@core/services/alert.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'core-alert',
  template: `
  <article class="alert" [ngClass]="{ hidden: !isVisible }" [attr.data-type]="type">
    <p class="alert__message">{{message}}</p>
    <button class="alert__button alert__button--close" (click)="hide()">
      <svg class="alert__button-icon">
        <use href="assets/svg/icons.svg#times"></use>
      </svg>
    </button>
  </article>
  `
})
export class AlertComponent implements OnDestroy { // TODO - improve - add dynamically generated components
  private static readonly DISPLAY_DURATION = 5000; // ms

  public message: string = '';
  public type: AlertType | null = null;
  public isVisible = false;

  private readonly subscription: Subscription;
  private timeout: ReturnType<typeof setTimeout> | null = null;

  constructor(private alertService: AlertService) {
    this.subscription = this.alertService.alertEvent.subscribe(alert => {
      this.isVisible = true;
      this.type = alert.type;
      this.message = alert.message;
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(this.hide.bind(this), AlertComponent.DISPLAY_DURATION);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public hide(): void {
    if (this.timeout) clearTimeout(this.timeout);
    this.isVisible = false;
  }
}
