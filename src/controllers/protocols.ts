export interface HttpResponse<T> {
  statusCode: number;
  body: {
    msg: string;
    data?: T;
    status: number;
    ok: boolean;
  };
}

export interface HttpResquest<B> {
  body?: B;
  headers?: any;
  params?: any;
  user?: any;
}

export type paramsBody<T> = Pick<HttpResquest<T>, "body">;

export type params<T> = Pick<HttpResquest<T>, "params">;

export type requiredFieldsError = HttpResponse<string | null>;

export interface IController {
  handle(httpResquest: HttpResquest<unknown>): Promise<HttpResponse<unknown>>;
}
