import { Room } from "@prisma/client";
import { HttpResquest, HttpResponse } from "../protocols";
import {
  GetRoomsUserParams,
  IGetRoomsByUserController,
  IGetRoomsByUserRepository,
} from "./protocols";
import { PrismaGetRoomsByUserRepository } from "../../repositories/get-room-by-user/prisma-get-rooms-by-user";
import { verifyRequiredFields } from "../../utils/verify-required-fields";
import { errorRequest, successesRequest, tryAgainLater } from "../../utils/responses";

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
        return tryAgainLater("is not possible to get rooms, try again later", 503)  
      }

      return successesRequest("Rooms get successfully", 302, rooms) 
    } catch (error: any) {
      return errorRequest(error.message, 500)
    }
  }
}
