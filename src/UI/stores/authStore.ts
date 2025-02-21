import { create } from 'zustand'
import { User } from '../../User/domain/User'
import { AuthUseCase } from '../../User/application/use-cases/auth.usecase'
import { LocalStorageAdapter } from '../../Shared/infraestructure/local-storage.adapter'
import { UserAdapter } from '../../User/infrastructure/User.Adapter'


// Define the store state type
interface AuthState {
  isAuthenticated: boolean
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  init: () => Promise<void>
}
const cacheRepository = new LocalStorageAdapter()
const userRepository = new UserAdapter(cacheRepository)
const authService = new AuthUseCase(userRepository, cacheRepository)

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (email: string, password: string) => {
    try {
      const user = await authService.login(email, password)
      set({ isAuthenticated: true, user })
    } catch (error) {
      console.error('Login failed:', error)
      throw new Error('Login failed')
    }
  },
  logout: async () => {
    await authService.logout()
    set({ isAuthenticated: false, user: null })
  },
  register: async (name: string, email: string, password: string) => {
    try {
      const user = new User(name, email, password)
      await authService.register(name, email, password)
      set({ isAuthenticated: true, user })
    } catch (error) {
      console.error('Registration failed:', error)
      throw new Error('Registration failed')
    }
  },
  init: async () => {
    const user = await authService.getSession()
    if(user) {
      set({ isAuthenticated: true, user })
    }
  }
}))