
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, take } from 'rxjs'
import { environment } from '@env/environment';

const defaultHeaders = new HttpHeaders({
  'Content-type': 'application/json',
})

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private static readonly API_URL: string = environment.API_URL;

  constructor(private http: HttpClient) {}

  public get<T>(url: string, headers: HttpHeaders = defaultHeaders): Observable<T> {
    return this.http.get<T>(`${HttpService.API_URL}/${url}`, { headers });
  }

  public post<T>(url: string, obj: Object, headers: HttpHeaders = defaultHeaders): Observable<T> {
    return this.http.post<T>(`${HttpService.API_URL}/${url}`, obj, { headers });
  }

  public patch<T>(url: string, obj: Object, headers: HttpHeaders = defaultHeaders): Observable<T> {
    return this.http.patch<T>(`${HttpService.API_URL}/${url}`, obj, { headers });
  }

  public delete<T>(url: string, headers: HttpHeaders = defaultHeaders): Observable<T> {
    return this.http.delete<T>(`${HttpService.API_URL}/${url}`, { headers });
  }
}
