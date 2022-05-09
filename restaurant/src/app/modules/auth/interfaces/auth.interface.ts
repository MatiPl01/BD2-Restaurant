import UserData from "@auth/interfaces/user.interface";

export interface AuthData {
  user: UserData,
  token: string
}
