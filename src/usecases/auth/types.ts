export type Role = "user" | "admin";
export type Provider = "local" | "google";

export interface RegisterInput {
  username: string;
  password?: string;
  email?: string;
  role?: Role;
  provider?: Provider;
}

export interface LoginInput {
  username: string;
  password: string;
  provider?: Provider;
}
