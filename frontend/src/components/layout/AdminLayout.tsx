import { NavLink, Outlet } from 'react-router-dom'
import { Images, Info, LayoutDashboard, LogOut, Newspaper, Sprout, Store } from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'
import { cn } from '../../lib/utils'
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

  return (
    <div className="min-h-screen bg-gray-100">
      <Seo title="Panel Admin" noindex />
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-gray-200 bg-white lg:flex">
        <div className="flex h-16 items-center gap-2.5 border-b border-gray-200 px-5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
            <Sprout className="h-4 w-4" aria-hidden />
          </span>
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
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
              <Sprout className="h-4 w-4" aria-hidden />
            </span>
            <p className="text-sm font-bold text-gray-900">Admin Panel</p>
          </div>
          <div className="hidden text-sm text-gray-500 lg:block">
            Selamat datang, {user?.name ?? 'Admin'}
          </div>
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 lg:hidden"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            Keluar
          </button>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
