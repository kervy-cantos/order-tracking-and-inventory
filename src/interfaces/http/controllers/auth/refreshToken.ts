import { JwtTokenService } from "../../../../frameworks/jwt";
import { ControllerResponse } from "../../types/controller";
import { AuthTokenPayload } from "../../../../types/tokenPayload";

export async function refreshController(
  refreshToken?: string
): Promise<ControllerResponse> {
  try {
    if (!refreshToken) {
      throw new Error("No refresh token provided");
    }

    const rawPayload = JwtTokenService.verifyRefreshToken(refreshToken);

    // destructure and exclude 'exp'
    const { exp, iat, ...payload } = rawPayload;

    const newAccessToken = JwtTokenService.generateToken(payload);
    const newRefreshToken = JwtTokenService.generateRefreshToken(payload);

    return {
      status: 200,
      body: {
        message: "Token refreshed",
        data: {
          token: newAccessToken,
          refreshToken: newRefreshToken,
        },
      },
    };
  } catch (error) {
    return {
      status: 401,
      body: {
        message: error instanceof Error ? error.message : "Invalid token",
        error: true,
      },
    };
  }
}
