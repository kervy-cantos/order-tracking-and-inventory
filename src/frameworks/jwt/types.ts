export interface JwtPayload {
  username: string;
  role: "user" | "admin";
  provider: string;
  iat?: number;
  exp?: number;
}
