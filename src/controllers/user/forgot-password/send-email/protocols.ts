import { User } from "../../../../models/User";

class params {
  constructor(private readonly email?: string) {}
}

export const KeysOfSendEmailsParams = Object.keys(new params());

export type SendMailParams = Pick<User, "email">;

export type ReturnTokenPass = Pick<User, "token_pass">;

export interface ISendRecoveryEmail {
  verifyEmail(params: SendMailParams): Promise<ReturnTokenPass>;
}
