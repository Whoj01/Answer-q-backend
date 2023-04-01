import { Room } from "../../models/Room";
import {
  errorRequest,
  successesRequest,
  tryAgainLater,
} from "../../utils/responses";
import { verifyRequiredFields } from "../../utils/verify-required-fields";
import {
  HttpResquest,
  HttpResponse,
  paramsBody,
  requiredFieldsError,
} from "../protocols";
import {
  CreateRoomParams,
  ICreateRoomController,
  ICreateRoomRepository,
  keysOfRoomParams,
} from "./protocols";

export class CreateRoomController implements ICreateRoomController {
  constructor(private readonly createRoomRepository: ICreateRoomRepository) {}

  async handle(
    httpResquest: HttpResquest<CreateRoomParams>
  ): Promise<HttpResponse<string>> {
    try {
      const { body }: paramsBody<CreateRoomParams> = httpResquest;

      const requiredFields: requiredFieldsError = verifyRequiredFields(
        keysOfRoomParams,
        body
      );

      if (requiredFields) return requiredFields;

      const room: Room | null = await this.createRoomRepository.createRoom(
        body
      );

      if (!room)
        return tryAgainLater(
          "Its was not possible to create a room now, try again later",
          503
        );

      return successesRequest("Room created successfully", 201);
    } catch (error: any) {
      return errorRequest(error.message, 500);
    }
  }
}
