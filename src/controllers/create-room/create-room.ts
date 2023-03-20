import { verifyRequiredFields } from "../../utils/verify-required-fields";
import { HttpResquest, HttpResponse } from "../protocols";
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
  ): Promise<HttpResponse<unknown | string>> {
    try {
      const { body } = httpResquest;

      const requiredFields = verifyRequiredFields(keysOfRoomParams, body);

      if (requiredFields) return requiredFields;

      const room = await this.createRoomRepository.createRoom(body);

      if (!room) {
        return {
          statusCode: 503,
          body: {
            msg: "Is not possible to create a room now, try again later",
            ok: false,
            status: 503,
          },
        };
      }

      return {
        statusCode: 201,
        body: {
          msg: "Room created successfully",
          ok: true,
          status: 201,
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
