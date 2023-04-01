import {
  errorRequest,
  successesRequest,
  tryAgainLater,
} from "../../../utils/responses";
import { verifyRequiredFields } from "../../../utils/verify-required-fields";
import {
  HttpResponse,
  HttpResquest,
  IController,
  params,
  requiredFieldsError,
} from "../../protocols";
import {
  DeleteRoomParams,
  IDeleteRoomRepository,
  KeysOfDeleteRoom,
} from "./protocols";

export class DeleteRoomController implements IController {
  constructor(private readonly deleteRoomRepository: IDeleteRoomRepository) {}

  async handle(
    httpResquest: HttpResquest<DeleteRoomParams>
  ): Promise<HttpResponse<string>> {
    try {
      const { params }: params<DeleteRoomParams> = httpResquest;

      const requiredFields: requiredFieldsError = verifyRequiredFields(
        KeysOfDeleteRoom,
        params
      );

      if (requiredFields) return requiredFields;

      const deletedRoom: boolean = await this.deleteRoomRepository.deleteRoom(
        params
      );

      return deletedRoom
        ? successesRequest("Room deleted successfully", 200)
        : tryAgainLater(
            "its was not possible to delete the room. Try again later!",
            503
          );
    } catch (error: any) {
      return errorRequest(error.message, 500);
    }
  }
}
