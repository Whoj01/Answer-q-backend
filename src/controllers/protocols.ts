export interface HttpResponse<T> {
  statusCode: number;
  body: T;
}

export interface HttpResquest<B> {
  body?: B;
  headers?: any;
  params?: any;
  user?: any;
}
