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

      if (requiredFields) return requiredFields;

      const user: ReturnTokenPass = await this.prismaVerifyMail.verifyEmail(
        body
      );

      if (!user) return errorRequest("user email not found", 404);

      const message = {
        from: "c1f5b9ace1-c2f138@inbox.mailtrap.io",
        to: body.email,
        subject: "Recuperação de senha AnswerQ",
        text: "Estamos enviando esse email para recuperar sua senha em nossa plataforma AnswerQ",
        html: "<h1>O email foi enviado</h1>",
      };

      const transporter = await nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "4ae311e6a8f4b5",
          pass: "238b559cb0b8d9",
        },
      });

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
