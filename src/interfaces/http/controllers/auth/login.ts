import { ControllerResponse } from "../../types/controller";
import { sanitizeLoginInput } from "../../helpers/sanitize";
import { LoginRequestDto } from "../../dto/auth/login";
import { loginUser } from "../../../../usecases/auth/login";
import { userRepositoryImpl } from "../../../../frameworks/mongoose/repositories/impl/user";
import { JwtTokenService } from "../../../../frameworks/jwt";

export async function loginController(
  body: LoginRequestDto
): Promise<ControllerResponse> {
  try {
    const input = sanitizeLoginInput(body);
    const login = await loginUser(input, userRepositoryImpl, JwtTokenService);

    const { user, token, refreshToken } = login;
    return {
      status: 200,
      body: {
        message: "User logged in successfully",
        data: {
          user,
          token,
          refreshToken,
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
