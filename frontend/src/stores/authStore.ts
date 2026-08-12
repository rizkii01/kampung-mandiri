import { create } from 'zustand'

interface AdminUser {
  name: string
  email: string
  role: 'ADMIN'
}

interface AuthState {
  isAuthenticated: boolean
  user: AdminUser | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

/**
 * Auth store (mock). Saat backend siap, ganti login() dengan pemanggilan
 * API `/api/auth/login` dan simpan token di localStorage.
 */
export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,

  login: async (email, password) => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    if (!email || !password) return false
    set({
      isAuthenticated: true,
      user: { name: 'Admin Karang Taruna', email, role: 'ADMIN' },
    })
    return true
  },

  logout: () => set({ isAuthenticated: false, user: null }),
}))
