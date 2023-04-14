import { setMessage } from "../../../../mail/setMessage";
import transporter from "../../../../mail/transporter";
import { signToken } from "../../../../utils/jwt";
import { errorRequest, successesRequest } from "../../../../utils/responses";
import { verifyRequiredFields } from "../../../../utils/verify-required-fields";
import {
  HttpResponse,
  HttpResquest,
  IController,
  paramsBody,
  requiredFieldsError,
} from "../../../protocols";
import {
  ISendRecoveryEmail,
  KeysOfSendEmailsParams,
  ReturnTokenPass,
  SendMailParams,
} from "./protocols";
import nodemailer from "nodemailer";

export class SendRecoveryEmailController implements IController {
  constructor(private readonly prismaVerifyMail: ISendRecoveryEmail) {}

  async handle(
    httpResquest: HttpResquest<SendMailParams>
  ): Promise<HttpResponse<string>> {
    try {
      const { body }: paramsBody<SendMailParams> = httpResquest;

      const requiredFields: requiredFieldsError = verifyRequiredFields(
        KeysOfSendEmailsParams,
        body
      );

      const token_pass = signToken(Date.now().toString(), "30m");

      body.token_pass = token_pass;

      console.log({ body });

      if (requiredFields) return requiredFields;

      const user: ReturnTokenPass | boolean =
        await this.prismaVerifyMail.verifyEmail(body);

      if (!user) return errorRequest("user email not found", 404);

      const message = setMessage(body.email, body.token_pass);

      transporter.sendMail(message, function (err: any) {
        if (err) {
          console.log(err);
        }
      });

      return successesRequest("email sent successfully", 200);
    } catch (error: any) {
      return errorRequest(error.message, 500);
    }
  }
}
