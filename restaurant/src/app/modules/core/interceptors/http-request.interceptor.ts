import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http"
import { catchError, filter, finalize, map, Observable, throwError } from "rxjs"
import { AlertService } from "@core/services/alert.service";
import { Injectable } from "@angular/core"
import { VisualizationService } from "@core/services/visualization.service";

@Injectable({
  providedIn: 'root'
})
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private errorService: AlertService,
              private visualizationService: VisualizationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.visualizationService.isLoading.next(true);

    return next.handle(req)
      .pipe(
        filter(event => event instanceof HttpResponse),
        catchError(this.handleError.bind(this)),
        map(HttpRequestInterceptor.parseResponseBody.bind(this)),
        finalize(() => {
          this.visualizationService.isLoading.next(false);
        })
      )
  }

  private handleError(err: HttpErrorResponse): Observable<HttpEvent<any>> {
    const errMsg = HttpRequestInterceptor.createErrorMsg(err);
    console.error(err);
    this.errorService.error(errMsg);
    throw throwError(() => err.error);
  }

  private static createErrorMsg(err: HttpErrorResponse): string {
    let errorMsg = '💥 Coś się pali!'; // TODO - change this error message
    if (err.error instanceof ErrorEvent) {
      errorMsg = err.error.message;
    } else {
      if (err.status) errorMsg = err.error;
    }
    return errorMsg;
  }

  // TODO - replace these any generic types with some more specific type
  private static parseResponseBody(event: HttpEvent<any>): HttpEvent<any> {
    const res = (event as HttpResponse<any>);
    // Extract data from the response body
    return res.clone({ body: res.body.data });
  }
}
