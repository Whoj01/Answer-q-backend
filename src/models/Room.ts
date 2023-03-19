export interface Room {
  id: number;
  user_creator_id?: number;
  room_name?: string;
  user?: { nickname: string };
  _count?: { participants: number; questions: number };
}
