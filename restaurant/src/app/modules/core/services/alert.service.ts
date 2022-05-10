import { EventEmitter, Injectable } from "@angular/core";
import { AlertType } from "@core/enums/alert-type.enum";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public alertEvent = new EventEmitter<{ type: AlertType, message: string }>();

  public error(message: string): void {
    this.emitEvent(AlertType.ERROR, message);
  }

  public success(message: string): void {
    this.emitEvent(AlertType.SUCCESS, message);
  }

  private emitEvent(type: AlertType, message: string): void {
    this.alertEvent.emit({ type, message });
  }
}
