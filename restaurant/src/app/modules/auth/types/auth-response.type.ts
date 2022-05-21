import User from "@shared/interfaces/user.interface";

export type AuthResponse = {
  user: User,
  token: string
}
