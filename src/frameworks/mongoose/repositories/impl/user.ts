import { UserRepository } from "../../../../domain/repositories/user";
import { UserModel } from "../../models/user";

export const userRepositoryImpl: UserRepository = {
  async findByUsernameOrEmail(username, email) {
    const doc = await UserModel.findOne({
      $or: [{ username }, ...(email ? [{ email }] : [])],
    });

    return doc
      ? {
          id: doc._id.toString(),
          username: doc.username,
          email: doc.email ?? undefined,
          role: doc.role,
          provider: doc.provider,
          password: doc.password ?? undefined,
          createdAt: doc.createdAt,
          updatedAt: doc.updatedAt,
        }
      : null;
  },

  async create(user) {
    const created = await UserModel.create(user);
    return {
      id: created._id.toString(),
      username: created.username,
      email: created.email ?? undefined,
      role: created.role,
      provider: created.provider,
      password: undefined,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    };
  },
};
