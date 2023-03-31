import { HttpResponse } from "../controllers/protocols";

export function tryAgainLater(message: string, statusCode: number) : HttpResponse<string> {
  return {
    statusCode,
    body: {
      msg: message,
      ok: false,
      status: statusCode
    }
  }
}

export function successesRequest(message: string, statusCode: number, data: any) {
  return {
    statusCode,
    body: {
      msg: message,
      data,
      ok: true,
      status: statusCode
    }
  }
}

export function errorRequest(message: string, statusCode: number) {
  return {
    statusCode,
    body: {
      msg: message,
      ok: false,
      status: statusCode
    }
  }
}