import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  // TODO - handle and display error using this service

  public error(message: string): void {
    // TODO - add some error badge
    console.log('ERROR WAS REGISTERED', message);
  }

  public success(message: string): void {
    // TODO - ADD something like you are successfully logged in etc.
    console.log('SUCCESS WAS REGISTERED', message);
  }
}
