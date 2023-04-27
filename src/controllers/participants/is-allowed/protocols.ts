import { successesRequest, tryAgainLater } from "../../../utils/responses";
import { HttpResponse } from "../../protocols";

class params {
  constructor(
    private readonly user_id?: number,
    private readonly room_id?: string
  ) {}
}

export const KeysOfSetIsAllowed = Object.keys(new params());

export interface setIsAllowedParams {
  user_id: number;
  password?: string;
  room_id: string;
}

export interface ISetIsAllowedRepository {
  isAllowed(params: setIsAllowedParams): Promise<string>;
}

export const returnsRequests: any = {
  notFound: tryAgainLater("Room not found", 404),
  allowed: successesRequest("User is allowed to enter room", 202),
  passIncorrect: tryAgainLater("Password incorrect", 401),
  enterPass: tryAgainLater(
    "This room is private, please insert an password",
    401
  ),
  publicRoom: tryAgainLater(
    "This room is not private, doesn't need a password",
    406
  ),
  inRoom: tryAgainLater("User is already in room", 406),
};
