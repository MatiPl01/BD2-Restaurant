import { Component, OnDestroy } from "@angular/core";
import { AlertType } from "@core/enums/alert-type.enum";
import { AlertService } from "@core/services/alert.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'shared-alert',
  template: `
  <article class="alert" [ngClass]="class">
    <p class="alert__message">{{message}}</p>
  </article>
  `
})
export class AlertComponent implements OnDestroy { // TODO - improve - add dynamically generated components
  private static readonly DISPLAY_DURATION = 5000; // ms

  public message: string = '';
  public type: AlertType | null = null;
  public class: { [key: string]: boolean } = {};

  private readonly subscription: Subscription;
  private timeout: ReturnType<typeof setTimeout> | null = null;

  constructor(private alertService: AlertService) {
    this.subscription = this.alertService.alertEvent.subscribe(alert => {
      console.log(alert);
      this.type = alert.type;
      this.message = alert.message;
      this.class = { [alert.type]: true };
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(this.hide.bind(this), AlertComponent.DISPLAY_DURATION);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private hide(): void {
    this.class = {hidden: true};
    this.message = '';
    this.type = null;
  }
}
