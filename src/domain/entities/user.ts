export type Role = "user" | "admin";
export type Provider = "local" | "google";

export interface User {
  id: string;
  email?: string;
  username: string;
  password?: string;
  role: Role;
  provider: Provider;
  createdAt?: NativeDate;
  updatedAt?: NativeDate;
}
