import type { AuthResponse } from '../types/auth.type'
import http from '../untils/http'

export const registerAccount = (body: { email: string; password: string }) =>
  http.post<AuthResponse>('/rregister', body)
