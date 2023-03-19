import { Room } from "@prisma/client";
import { HttpResquest, HttpResponse } from "../protocols";
import {
  GetRoomsUserParams,
  IGetRoomsByUserController,
  IGetRoomsByUserRepository,
} from "./protocols";
import { PrismaGetRoomsByUserRepository } from "../../repositories/get-room-by-user/prisma-get-rooms-by-user";

export class GetRoomsByUserController implements IGetRoomsByUserController {
  constructor(
    private readonly getRoomsByUserRepository: IGetRoomsByUserRepository
  ) {}

  async handle(
    httpResquest: HttpResquest<GetRoomsUserParams>
  ): Promise<HttpResponse<unknown | string>> {
    try {
      const requiredFields = ["user_id"];

      for (const field of requiredFields) {
        if (!httpResquest?.params?.[field as keyof GetRoomsUserParams]) {
          return {
            statusCode: 400,
            body: {
              msg: `Field ${field} is required`,
              ok: false,
              status: 400,
            },
          };
        }
      }

      const { params } = httpResquest;

      const rooms = await this.getRoomsByUserRepository.getRooms(
        params.user_id
      );

      console.log("b");

      if (!rooms) {
        return {
          statusCode: 503,
          body: {
            msg: "is not possible to get rooms, try again later",
          },
        };
      }

      return {
        statusCode: 302,
        body: {
          msg: "Rooms get successfully",
          ok: true,
          rooms: rooms,
        },
      };
    } catch (error: any) {
      return {
        statusCode: 500,
        body: error.message,
      };
    }
  }
}
