import { create } from 'zustand'
import { getToken, TOKEN_KEY } from '../lib/api'

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
  loadSession: () => Promise<void>
}

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ''

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,

  login: async (email, password) => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = (await res.json().catch(() => null)) as {
        token?: string
        user?: AdminUser
      } | null
      if (!res.ok || !data?.token || !data.user) return false
      localStorage.setItem(TOKEN_KEY, data.token)
      set({ isAuthenticated: true, user: data.user })
      return true
    } catch {
      return false
    }
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY)
    set({ isAuthenticated: false, user: null })
  },

  loadSession: async () => {
    const token = getToken()
    if (!token) {
      set({ isAuthenticated: false, user: null })
      return
    }
    try {
      const res = await fetch(`${API_BASE}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = (await res.json().catch(() => null)) as AdminUser | null
      if (!res.ok || !data?.email) {
        localStorage.removeItem(TOKEN_KEY)
        set({ isAuthenticated: false, user: null })
        return
      }
      set({ isAuthenticated: true, user: data })
    } catch {
      localStorage.removeItem(TOKEN_KEY)
      set({ isAuthenticated: false, user: null })
    }
  },
}))
