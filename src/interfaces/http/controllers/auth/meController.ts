import { userRepositoryImpl } from "../../../../frameworks/mongoose/repositories/impl/user";
import { JwtTokenService } from "../../../../frameworks/jwt";
import { ControllerResponse } from "../../types/controller";
import { getProfile } from "../../../../usecases/auth/getProfile";

export async function meController(token: string): Promise<ControllerResponse> {
  try {
    const profile = await getProfile(
      token,
      userRepositoryImpl,
      JwtTokenService
    );

    return {
      status: 200,
      body: {
        message: "User retrieved",
        data: profile,
      },
    };
  } catch {
    return {
      status: 401,
      body: { message: "Invalid token" },
    };
  }
}
