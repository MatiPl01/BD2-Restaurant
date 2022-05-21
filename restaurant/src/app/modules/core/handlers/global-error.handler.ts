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
    console.log('CAUGHT!!!')

    const { status, message } = this.parseError(error);
    this.zone.run(() =>
      this.alertService.error(status, message)
    );
    console.error(error);
  }

  private parseError(error: any): { status: number, message: string } {
    if (error instanceof HttpErrorResponse) {
      const { status, message } = error.error;
      return { status, message };
    }
    

    return { 
      status: error.status, 
      message: error.message || '💥 Coś się pali!' // TODO -change this message
    };
  }
}
