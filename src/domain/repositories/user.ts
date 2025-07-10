import { User } from "../entities/user";

export interface UserRepository {
  findByUsernameOrEmail(username: string, email?: string): Promise<User | null>;
  create(user: Partial<User>): Promise<User>;
}
