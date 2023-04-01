import { User } from "../../models/User";
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
  CreateUserParams,
  ICreateUserController,
  ICreateUserRepository,
  keysOfUserParams,
} from "./protocols";

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpResquest: HttpResquest<CreateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      //verificar campos obrigatorios

      const { body }: paramsBody<CreateUserParams> = httpResquest;

      const requiredFields: requiredFieldsError = verifyRequiredFields(
        keysOfUserParams,
        body
      );

      if (requiredFields) return requiredFields;

      const user: User = await this.createUserRepository.createUser(body);

      if (!user)
        return tryAgainLater(
          "its was not possible to create a user. Try again later!",
          503
        );

      successesRequest("User created successfully", 201, user);
    } catch (error: any) {
      if (error.meta.target[0] === "email") {
        return errorRequest("Email already exists", 406);
      }

      if (error.meta.target[0] === "nickname") {
        return errorRequest("Nickname already exists", 406);
      }

      return errorRequest(error.message, 500);
    }
  }
}
