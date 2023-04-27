class params {
  constructor(
    private readonly room_id?: string,
    private readonly user_id?: number,
    private readonly allowed?: boolean
  ) {}
}

export const KeysOfChangeIsAllowed = Object.keys(new params());

export interface changeIsAllowedParams {
  room_id: string;
  user_id: number;
  allowed: string;
}

export interface IChangeIsAllowedRepository {
  changeIsAllowed(params: changeIsAllowedParams): Promise<boolean>;
}
