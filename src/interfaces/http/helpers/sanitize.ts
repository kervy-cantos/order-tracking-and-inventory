import { RegisterRequestDto } from "../dto/auth/register";
import { User } from "../../../domain/entities/user";
import { LoginInput } from "../../../usecases/auth/types";
import { LoginRequestDto } from "../dto/auth/login";

export function sanitizeUserInput(
  input: RegisterRequestDto
): RegisterRequestDto {
  return {
    username: input.username.trim(),
    email: input.email?.trim().toLowerCase(),
    password: input.password.trim(),
  };
}

export function sanitizeUserOutput(user: User): Omit<User, "password"> {
  const { password, ...safeUser } = user;
  return safeUser;
}

export function sanitizeLoginInput(input: LoginInput): LoginRequestDto {
  return {
    username: input.username.trim(),
    password: input.password?.trim(),
    provider: input.provider ?? "local",
  };
}
