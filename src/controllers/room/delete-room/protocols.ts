class params {
  constructor(
    private readonly room_id?: number,
    private readonly user_id?: number
  ) {}
}

export const KeysOfDeleteRoom = Object.keys(new params());

export interface DeleteRoomParams {
  room_id: number;
  user_id: number;
}

export interface IDeleteRoomRepository {
  deleteRoom(params: DeleteRoomParams): Promise<boolean>;
}
