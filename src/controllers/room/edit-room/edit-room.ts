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
  EditRoomParams,
  IEditRoomReporitory,
  KeysOfEditRoom,
} from "./protocols";

export class EditRoomController implements IController {
  constructor(private readonly editRoomRepository: IEditRoomReporitory) {}

  async handle(
    httpResquest: HttpResquest<EditRoomParams>
  ): Promise<HttpResponse<string>> {
    try {
      const { params }: params<number> = httpResquest;

      const requiredFields: requiredFieldsError = verifyRequiredFields(
        KeysOfEditRoom,
        params
      );

      if (requiredFields) return requiredFields;

      const editRoom = await this.editRoomRepository.editRoom(params);

      return editRoom
        ? successesRequest("Room updated successfully", 200)
        : tryAgainLater(
            "its was not possible to edit room now. Try again later!",
            503
          );
    } catch (error: any) {
      return errorRequest(error.message, 500);
    }
  }
}
