import { Room } from "@prisma/client";
import { HttpResquest, HttpResponse } from "../protocols";
import {
  GetRoomsUserParams,
  IGetRoomsByUserController,
  IGetRoomsByUserRepository,
} from "./protocols";
import { PrismaGetRoomsByUserRepository } from "../../repositories/get-room-by-user/prisma-get-rooms-by-user";
import { verifyRequiredFields } from "../../utils/verify-required-fields";

export class GetRoomsByUserController implements IGetRoomsByUserController {
  constructor(
    private readonly getRoomsByUserRepository: IGetRoomsByUserRepository
  ) {}

  async handle(
    httpResquest: HttpResquest<GetRoomsUserParams>
  ): Promise<HttpResponse<unknown | string>> {
    try {
      const requiredFields = ["user_id"];

      const { params } = httpResquest;

      const resultOfRequiredFields = verifyRequiredFields(
        requiredFields,
        params
      );

      if (resultOfRequiredFields) return resultOfRequiredFields;

      const rooms = await this.getRoomsByUserRepository.getRooms(
        params.user_id
      );

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
