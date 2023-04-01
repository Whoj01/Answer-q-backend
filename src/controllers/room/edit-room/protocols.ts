class params {
  constructor(
    private readonly room_id?: number,
    private readonly user_id?: number,
    private readonly room_name?: string
  ) {}
}

export const KeysOfEditRoom = Object.keys(new params());

export interface EditRoomParams {
  user_id: number;
  room_id: number;
  room_name: string;
}

export interface IEditRoomReporitory {
  editRoom(params: EditRoomParams): Promise<boolean>;
}
