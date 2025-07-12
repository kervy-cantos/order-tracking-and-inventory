import { registerUser } from "../../../../src/usecases/auth/register";
import { User } from "../../../../src/domain/entities/user";
import { TokenService } from "../../../../src/usecases/auth/tokenService";
import { UserRepository } from "../../../../src/domain/repositories/user";
import bcrypt from "bcrypt";

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
}));

describe("registerUser", () => {
  const userRepository: jest.Mocked<UserRepository> = {
    findByUsernameOrEmail: jest.fn(),
    create: jest.fn(),
  };

  const tokenService: jest.Mocked<TokenService> = {
    generateToken: jest.fn(),
    generateRefreshToken: jest.fn(),
    verifyToken: jest.fn(),
    verifyRefreshToken: jest.fn(),
  };

  const newUser: User = {
    id: "u123",
    username: "newbie",
    email: "new@example.com",
    role: "user",
    password: "hashedpass",
    provider: "local",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should register user with valid input", async () => {
    userRepository.findByUsernameOrEmail.mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashedpass");
    userRepository.create.mockResolvedValue(newUser);

    const result = await registerUser(
      { username: "newbie", password: "secret" },
      userRepository
    );

    expect(bcrypt.hash).toHaveBeenCalledWith("secret", 10);
    expect(userRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        username: "newbie",
        password: "hashedpass",
      })
    );
    expect(result).toEqual({
      id: "u123",
      username: "newbie",
      email: "new@example.com",
      role: "user",
      password: "hashedpass",
      provider: "local",
    });
  });

  it("should throw if username/email already exists", async () => {
    userRepository.findByUsernameOrEmail.mockResolvedValue(newUser);

    await expect(
      registerUser(
        { username: "newbie", email: "new@example.com", password: "secret" },
        userRepository
      )
    ).rejects.toThrow("Email or username already exists");
  });

  it("should throw if password is missing for local provider", async () => {
    userRepository.findByUsernameOrEmail.mockResolvedValue(null);

    await expect(
      registerUser(
        { username: "newbie", email: "new@example.com" },
        userRepository
      )
    ).rejects.toThrow("Password is required");
  });
});
