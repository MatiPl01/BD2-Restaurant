import { EventEmitter, Injectable } from "@angular/core";
import { AlertType } from "@core/enums/alert-type.enum";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public alertEvent = new EventEmitter<{ type: AlertType, message: string, status: number | undefined }>();

  public error(status: number, message: string): void {
    this.emitEvent(AlertType.ERROR, message, status);
  }

  public success(message: string): void {
    this.emitEvent(AlertType.SUCCESS, message);
  }

  private emitEvent(type: AlertType, message: string, status?: number): void {
    this.alertEvent.emit({ type, message, status });
  }
}
