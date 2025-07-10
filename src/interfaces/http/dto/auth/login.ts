export interface LoginRequestDto {
  username: string;
  password: string;
  provider: "local" | "google";
}
