import { loginUser } from "../../../../src/usecases/auth/login";
import { Provider, User } from "../../../../src/domain/entities/user";
import { TokenService } from "../../../../src/usecases/auth/tokenService";
import { UserRepository } from "../../../../src/domain/repositories/user";
import bcrypt, { compare } from "bcrypt";

jest.mock("bcrypt", () => ({
  compare: jest.fn(),
}));

describe("loginUser", () => {
  const mockUser: User = {
    id: "user-id-123",
    username: "testuser",
    email: "test@example.com",
    role: "user",
    provider: "local" as Provider,
    password: "hashedpassword",
  };
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should log in successfully with correct credentials", async () => {
    userRepository.findByUsernameOrEmail.mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    tokenService.generateToken.mockReturnValue("access-token");
    tokenService.generateRefreshToken.mockReturnValue("refresh-token");

    const result = await loginUser(
      { username: "testuser", password: "password123" },
      userRepository,
      tokenService
    );

    expect(result.user).toEqual({
      id: mockUser.id,
      username: mockUser.username,
      email: mockUser.email,
      role: mockUser.role,
    });
    expect(result.token).toBe("access-token");
    expect(result.refreshToken).toBe("refresh-token");
  });

  it("should throw error if user is not found", async () => {
    userRepository.findByUsernameOrEmail.mockResolvedValue(null);

    await expect(
      loginUser(
        { username: "nonexistent", password: "pass" },
        userRepository,
        tokenService
      )
    ).rejects.toThrow("Invalid credentials!");
  });

  it("should throw error if provider does not match", async () => {
    const socialUser = { ...mockUser, provider: "google" as Provider };
    userRepository.findByUsernameOrEmail.mockResolvedValue(socialUser);

    await expect(
      loginUser(
        { username: "testuser", password: "irrelevant" },
        userRepository,
        tokenService
      )
    ).rejects.toThrow("Invalid credentials!");
  });

  it("should throw error if password is missing for local provider", async () => {
    userRepository.findByUsernameOrEmail.mockResolvedValue(mockUser);

    await expect(
      loginUser({ username: "testuser" }, userRepository, tokenService)
    ).rejects.toThrow("Password is required");
  });

  it("should throw error if password is incorrect", async () => {
    userRepository.findByUsernameOrEmail.mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(
      loginUser(
        { username: "testuser", password: "wrongpass" },
        userRepository,
        tokenService
      )
    ).rejects.toThrow("Invalid username or password");
  });
});
