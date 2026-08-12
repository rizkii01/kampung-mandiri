import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { LogOut, Menu, Sprout, X } from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'
import { cn } from '../../lib/utils'
import Button from '../ui/Button'

const navItems = [
  { to: '/', label: 'Beranda' },
  { to: '/profil', label: 'Profil' },
  { to: '/umkm', label: 'UMKM' },
  { to: '/kegiatan', label: 'Kegiatan' },
  { to: '/kontak', label: 'Kontak' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { isAuthenticated, logout } = useAuthStore()

  const closeMenu = () => setOpen(false)

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200/70 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white">
            <Sprout className="h-5 w-5" aria-hidden />
          </span>
          <span className="text-sm font-bold leading-tight text-gray-900 sm:text-base">
            Sentra Tempe
            <span className="block text-[11px] font-medium text-emerald-600 sm:text-xs">
              Bencongan
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {isAuthenticated ? (
            <>
              <Link to="/admin">
                <Button variant="secondary" size="sm">
                  Dashboard
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4" aria-hidden />
                Keluar
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button size="sm">Login Admin</Button>
            </Link>
          )}
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Buka menu"
        >
          {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
        </button>
      </div>

      {open && (
        <div className="border-t border-gray-200 bg-white px-4 pb-4 pt-2 md:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={closeMenu}
                className={({ isActive }) =>
                  cn(
                    'rounded-lg px-3 py-2 text-sm font-medium',
                    isActive ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-100',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-3 border-t border-gray-100 pt-3">
            {isAuthenticated ? (
              <div className="flex gap-2">
                <Link to="/admin" onClick={closeMenu} className="flex-1">
                  <Button variant="secondary" className="w-full">
                    Dashboard
                  </Button>
                </Link>
                <Button variant="ghost" className="flex-1" onClick={logout}>
                  Keluar
                </Button>
              </div>
            ) : (
              <Link to="/login" onClick={closeMenu}>
                <Button className="w-full">Login Admin</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
