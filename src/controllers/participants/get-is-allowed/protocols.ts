class params {
  constructor(
    private readonly room_id?: string,
    private readonly user_id?: number
  ) {}
}

export const KeysOfGetIsAllowed = Object.keys(new params());

export interface getIsAllowedParams {
  room_id: string;
  user_id: number;
}

export interface IGetIsAllowedRepository {
  getIsAllowed(params: getIsAllowedParams): Promise<boolean>;
}
