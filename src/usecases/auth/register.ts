import bcrypt from "bcrypt";
import { RegisterInput } from "./types";
import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/user";

export async function registerUser(
  input: RegisterInput,
  userRepo: UserRepository
): Promise<User> {
  const {
    username,
    email = "",
    password,
    role = "user",
    provider = "local",
  } = input;

  if (provider === "local" && !password) {
    throw new Error("Password is required");
  }

  const exists = await userRepo.findByUsernameOrEmail(username, email);
  if (exists) throw new Error("Email or username already exists");

  const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

  return await userRepo.create({
    username,
    email,
    password: hashedPassword,
    provider,
    role,
  });
}
