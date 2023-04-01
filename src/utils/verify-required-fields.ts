import { HttpResponse } from "../controllers/protocols";

export function verifyRequiredFields(
  fields: string[],
  body: any
): HttpResponse<string> {
  for (const field of fields) {
    if (!body?.[field]) {
      return {
        statusCode: 206,
        body: {
          msg: `Field ${field} is required`,
          ok: false,
          status: 206,
        },
      };
    }
  }
}
