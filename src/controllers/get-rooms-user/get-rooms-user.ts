import {
  HttpResquest,
  HttpResponse,
  params,
  requiredFieldsError,
} from "../protocols";
import {
  GetRoomsUserParams,
  IGetRoomsByUserController,
  IGetRoomsByUserRepository,
  KeysOfGetRoomsUser,
} from "./protocols";
import { verifyRequiredFields } from "../../utils/verify-required-fields";
import {
  errorRequest,
  successesRequest,
  tryAgainLater,
} from "../../utils/responses";
import { Room } from "../../models/Room";

export class GetRoomsByUserController implements IGetRoomsByUserController {
  constructor(
    private readonly getRoomsByUserRepository: IGetRoomsByUserRepository
  ) {}

  async handle(
    httpResquest: HttpResquest<GetRoomsUserParams>
  ): Promise<HttpResponse<string>> {
    try {
      const { params }: params<GetRoomsUserParams> = httpResquest;

      const resultOfRequiredFields: requiredFieldsError = verifyRequiredFields(
        KeysOfGetRoomsUser,
        params
      );

      if (resultOfRequiredFields) return resultOfRequiredFields;

      const rooms: Room[] | null = await this.getRoomsByUserRepository.getRooms(
        params.user_id
      );

      if (!rooms)
        return tryAgainLater(
          "is not possible to get rooms, try again later",
          503
        );

      return successesRequest("Rooms get successfully", 302, rooms);
    } catch (error: any) {
      return errorRequest(error.message, 500);
    }
  }
}
