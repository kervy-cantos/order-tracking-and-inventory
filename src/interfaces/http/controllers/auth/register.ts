import { ControllerResponse } from "../../types/controller";
import { RegisterRequestDto } from "../../dto/auth/register";
import { registerUser } from "../../../../usecases/auth/register";
import { sanitizeUserInput, sanitizeUserOutput } from "../../helpers/sanitize";
import { userRepositoryImpl } from "../../../../frameworks/mongoose/repositories/impl/user";

export async function registerController(
  body: RegisterRequestDto
): Promise<ControllerResponse> {
  try {
    const input = sanitizeUserInput(body);
    const user = await registerUser(input, userRepositoryImpl);

    return {
      status: 201,
      body: {
        message: "User registered successfully",
        data: {
          user: sanitizeUserOutput(user),
        },
      },
    };
  } catch (error) {
    return {
      status: 400,
      body: {
        message: error instanceof Error ? error.message : "Unknown error",
        error: true,
      },
    };
  }
}
