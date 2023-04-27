export interface Room {
  id: number;
  user_creator_id?: number;
  room_name?: string;
  User?: { nickname: string };
  _count?: { Participants: number; Questions: number };
  CreatedDate?: Date;
  password?: string;
  private?: boolean;
}
