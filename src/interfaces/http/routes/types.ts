import { User } from "../../../domain/entities/user";

export type LoginResponseData = {
  user: Omit<User, "password" | "provider">;
  token: string;
  refreshToken: string;
};

export type RefreshTokenResponse = {
  token: string;
  refreshToken: string;
};
