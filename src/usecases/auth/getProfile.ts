import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/user";
import { TokenService } from "./tokenService";

export async function getProfile(
  token: string,
  repo: UserRepository,
  tokenService: TokenService
): Promise<{
  user: Omit<User, "password" | "provider">;
}> {
  const payload = tokenService.verifyToken(token);
  const user = await repo.findByUsernameOrEmail(payload.username);
  if (!user) throw new Error("User not found");
  const { password: _, provider: __, ...safeUser } = user;
  return { user: safeUser };
}
