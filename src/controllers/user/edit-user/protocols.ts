class params {
  constructor(
    private readonly email?: string,
    private readonly nickname?: string,
    private readonly password?: string
  ) {}
}

export const KeysOfEditUserParams = Object.keys(new params());

export interface EditUserParams {
  email?: string;
  nickname?: string;
  password?: string;
  user_id: number;
}

export interface IEditUserRepository {
  editUser(params: EditUserParams): Promise<returnOfEditUser>;
}

export interface returnOfEditUser {
  msg: string;
  ok: boolean;
}
