import { HttpResponse } from "../controllers/protocols";

export function verifyRequiredFields(
  fields: string[],
  body: any
): HttpResponse<string> {
  for (const field of fields) {
    if (!body?.[field]) {
      return {
        statusCode: 400,
        body: `Field ${field} is required`,
      };
    }
  }
}
