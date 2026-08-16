import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { Images, Info, LayoutDashboard, LogOut, Menu, Newspaper, Store, X } from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'
import { api } from '../../lib/api'
import { cn, resolveImageUrl } from '../../lib/utils'
import Seo from '../Seo'

const menu = [
  { to: '/admin', label: 'Dashboard', end: true, icon: LayoutDashboard },
  { to: '/admin/profil', label: 'Profil Kampung', end: false, icon: Info },
  { to: '/admin/umkm', label: 'UMKM', end: false, icon: Store },
  { to: '/admin/kegiatan', label: 'Kegiatan & Berita', end: false, icon: Newspaper },
  { to: '/admin/galeri', label: 'Galeri Foto', end: false, icon: Images },
]

export default function AdminLayout() {
  const { user, logout } = useAuthStore()
  const [menuOpen, setMenuOpen] = useState(false)
  const { data: profile } = useQuery({ queryKey: ['site-profile'], queryFn: api.getSiteProfile })
  const logo = resolveImageUrl(profile?.logoUrl) || '/favicon.svg'

  const handleLogout = () => {
    setMenuOpen(false)
    logout()
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Seo title="Panel Admin" noindex />
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-gray-200 bg-white lg:flex">
        <div className="flex h-16 items-center gap-2.5 border-b border-gray-200 px-5">
          <img src={logo} alt="Logo Sentra Tempe" className="h-9 w-9 rounded-lg object-cover ring-1 ring-gray-200" />
          <div>
            <p className="text-sm font-bold leading-tight text-gray-900">Admin Panel</p>
            <p className="text-xs text-gray-500">Sentra Tempe Bencongan</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {menu.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                )
              }
            >
              <item.icon className="h-4 w-4" aria-hidden />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-gray-200 p-4">
          <div className="mb-3">
            <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
            <p className="truncate text-xs text-gray-500">{user?.email}</p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            Keluar
          </button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
          <div className="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-gray-700 transition-colors hover:bg-gray-50"
              aria-label="Buka menu admin"
            >
              <Menu className="h-5 w-5" aria-hidden />
            </button>
            <img src={logo} alt="Logo Sentra Tempe" className="h-9 w-9 rounded-lg object-cover ring-1 ring-gray-200" />
            <p className="text-sm font-bold text-gray-900">Admin Panel</p>
          </div>
          <div className="hidden text-sm text-gray-500 lg:block">
            Selamat datang, {user?.name ?? 'Admin'}
          </div>
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 lg:hidden"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            Keluar
          </button>
        </header>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMenuOpen(false)}
              aria-hidden
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {menuOpen && (
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r border-gray-200 bg-white lg:hidden"
            >
              <div className="flex h-16 items-center justify-between border-b border-gray-200 px-5">
                <div className="flex items-center gap-2.5">
                  <img src={logo} alt="Logo Sentra Tempe" className="h-9 w-9 rounded-lg object-cover ring-1 ring-gray-200" />
                  <div>
                    <p className="text-sm font-bold leading-tight text-gray-900">Admin Panel</p>
                    <p className="text-xs text-gray-500">Sentra Tempe Bencongan</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-gray-700 transition-colors hover:bg-gray-50"
                  aria-label="Tutup menu admin"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>
              <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
                {menu.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-2.5 rounded-lg px-3 py-3 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                      )
                    }
                  >
                    <item.icon className="h-4 w-4" aria-hidden />
                    {item.label}
                  </NavLink>
                ))}
              </nav>
              <div className="border-t border-gray-200 p-4">
                <div className="mb-3">
                  <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                  <p className="truncate text-xs text-gray-500">{user?.email}</p>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <LogOut className="h-4 w-4" aria-hidden />
                  Keluar
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        <main className="p-4 pb-16 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
