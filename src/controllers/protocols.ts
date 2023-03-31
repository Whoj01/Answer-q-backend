export interface HttpResponse<T> {
  statusCode: number;
  body: {
    msg: string,
    data?: T,
    status: number,
    ok: boolean
  };
}

export interface HttpResquest<B> {
  body?: B;
  headers?: any;
  params?: any;
  user?: any;
}

export interface IController {
  handle(httpResquest: HttpResquest<unknown> ) : Promise<HttpResponse<unknown>>
}
