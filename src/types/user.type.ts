type Role = 'User' | 'Admin'
export interface User {
  roles: Role[]
  _id: string
  email: string
  createdAt: string
  updatedAt: string
  name: string
  date_of_birth: string | null
  address: string
  phone: string
}
