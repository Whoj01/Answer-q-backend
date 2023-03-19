import { HttpResquest, HttpResponse } from "../protocols";
import {
  CreateRoomParams,
  ICreateRoomController,
  ICreateRoomRepository,
} from "./protocols";

export class CreateRoomController implements ICreateRoomController {
  constructor(private readonly createRoomRepository: ICreateRoomRepository) {}

  async handle(
    httpResquest: HttpResquest<CreateRoomParams>
  ): Promise<HttpResponse<unknown | string>> {
    try {
      const requiredFilds = ["user_id", "id", "name"];

      for (const field of requiredFilds) {
        if (!httpResquest?.body?.[field as keyof CreateRoomParams]) {
          return {
            statusCode: 400,
            body: `Field ${field} is required`,
          };
        }
      }

      const { body } = httpResquest;

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
