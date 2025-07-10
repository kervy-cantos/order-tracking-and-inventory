import bcrypt from "bcrypt";
import { LoginInput } from "./types";
import { UserRepository } from "../../domain/repositories/user";
import { TokenService } from "./tokenService";
import { User } from "../../domain/entities/user";

export async function loginUser(
  input: LoginInput,
  userRepo: UserRepository,
  tokenService: TokenService
): Promise<{
  user: Omit<User, "password" | "provider">;
  token: string;
  refreshToken: string;
}> {
  const provider = input.provider ?? "local";

  const user = await userRepo.findByUsernameOrEmail(input.username);
  if (!user || user.provider !== provider) {
    throw new Error("Invalid credentials!");
  }

  if (provider === "local") {
    if (!input.password) throw new Error("Password is required");

    const passwordMatch = await bcrypt.compare(
      input.password,
      user.password ?? ""
    );
    if (!passwordMatch) throw new Error("Invalid username or password");
  }

  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
    provider: user.provider,
  };

  const token = tokenService.generateToken(payload);
  const refreshToken = tokenService.generateRefreshToken(payload);

  const { password: _, provider: __, ...safeUser } = user;

  return {
    user: safeUser,
    token,
    refreshToken,
  };
}
