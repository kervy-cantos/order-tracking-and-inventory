export interface AuthTokenPayload {
  id: string;
  username: string;
  role: "user" | "admin";
  provider: "local" | "google";
  sub?: string;
  exp?: number;
  iat?: number;
}
