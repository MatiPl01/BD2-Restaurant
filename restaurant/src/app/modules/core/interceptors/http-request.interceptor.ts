import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http"
import { filter, finalize, map, Observable } from "rxjs"
import { Injectable } from "@angular/core"
import { VisualizationService } from "@core/services/visualization.service";

@Injectable({
  providedIn: 'root'
})
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private visualizationService: VisualizationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.visualizationService.isLoading.next(true);

    return next.handle(req)
      .pipe(
        filter(event => event instanceof HttpResponse),
        map(HttpRequestInterceptor.parseResponseBody.bind(this)),
        finalize(() => {
          this.visualizationService.isLoading.next(false);
        })
      )
  }

  // TODO - replace these any generic types with some more specific type
  private static parseResponseBody(event: HttpEvent<any>): HttpEvent<any> {
    const res = (event as HttpResponse<any>);
    // Extract data from the response body
    return res.clone({ body: res.body.data });
  }
}
