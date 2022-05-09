export interface HttpResponse<T> {
  status: string;
  data?: T;
  message?: string;
}
