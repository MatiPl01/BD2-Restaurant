import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, NgZone } from "@angular/core";
import { AlertService } from "../services/alert.service";

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private alertService: AlertService,
              private zone: NgZone) {}

  public handleError(error: any): void {
    const { status, message } = this.parseError(error);
    this.zone.run(() =>
      this.alertService.error(status, message)
    );
    console.error(error);
  }

  private parseError(error: any): { status: number, message: string } {
    let status: number;
    let message: string;

    if (error instanceof HttpErrorResponse) {
      status = error.error.status;
      message = error.error.message;
    } else {
      status = error.status;
      message = error.message;
    }
    
    return { 
      status,
      message: message || '💥 Coś się pali!' // TODO -change this message
    };
  }
}
