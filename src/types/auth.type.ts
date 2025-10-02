import type { User } from "./user.type"
import type { ResponseAPI } from "./utils.type"

export type AuthResponse = ResponseAPI<{
  access_token: string
  refreseh_token: string
  expires: string
  user: User
}>
