import { create } from 'zustand'
import { AuthService } from '../../User/application/AuthService'
import { User } from '../../User/domain/User'
import { LocalStorageUserRepository } from '../../User/infrastructure/LocalStorageUserRepository'
import { LocalStorageCacheRepository } from '../../User/infrastructure/LocalStorageCacheRepository'


// Define the store state type
interface AuthState {
  isAuthenticated: boolean
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  init: () => Promise<void>
}

const userRepository = new LocalStorageUserRepository()
const cacheRepository = new LocalStorageCacheRepository()
const authService = new AuthService(userRepository, cacheRepository)

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
    console.log('init')
  }
}))