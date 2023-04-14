class params {
  constructor(
    private readonly remember_pass?: string,
    private readonly password?: string,
    private readonly email?: string
  ) {}
}

export const KeysOfChangePass = Object.keys(new params());

export interface ChangePassParams {
  remember_pass: string;
  password: string;
  email: string;
}

export interface IChangePassRepository {
  changePass(params: ChangePassParams): Promise<boolean>;
}
