import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { LogOut, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
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
  const [scrolled, setScrolled] = useState(false)
  const { isAuthenticated, logout } = useAuthStore()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setOpen(false)

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-all duration-300 w-full',
        scrolled
          ? 'glass border-b border-stone-200/40 shadow-sm py-2'
          : 'bg-transparent border-b border-transparent py-4'
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.img
            src="/favicon.svg"
            alt="Logo Sentra Tempe Bencongan"
            whileHover={{ rotate: 12, scale: 1.05 }}
            className="h-10 w-10 rounded-2xl shadow-glow"
          />
          <span className="text-sm font-extrabold leading-tight text-stone-900 sm:text-base tracking-tight">
            Sentra Tempe
            <span className="block text-[11px] font-bold text-tempe-green-600 sm:text-xs uppercase tracking-wider">
              Bencongan
            </span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-1.5 md:flex rounded-2xl bg-stone-100/60 p-1 border border-stone-200/20">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-xl px-4 py-2 text-sm font-semibold transition-all relative duration-200',
                  isActive
                    ? 'bg-white text-tempe-green-700 shadow-sm border border-stone-200/20'
                    : 'text-stone-600 hover:text-stone-950 hover:bg-white/40',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <Link to="/admin">
                <Button variant="secondary" size="sm">
                  Dashboard
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={logout} className="text-stone-600">
                <LogOut className="h-4 w-4" aria-hidden />
                Keluar
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button size="sm" className="shadow-none">Login Admin</Button>
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="rounded-xl p-2.5 text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-colors md:hidden border border-transparent hover:border-stone-200/30"
          onClick={() => setOpen((v) => !v)}
          aria-label="Buka menu"
        >
          {open ? <X className="h-5.5 w-5.5" aria-hidden /> : <Menu className="h-5.5 w-5.5" aria-hidden />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="border-t border-stone-200/50 bg-white/95 backdrop-blur-lg px-4 pb-5 pt-3 md:hidden overflow-hidden shadow-inner"
          >
            <nav className="flex flex-col gap-1">
              {navItems.map((item, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={item.to}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      cn(
                        'block rounded-xl px-4.5 py-3 text-sm font-semibold transition-all',
                        isActive
                          ? 'bg-tempe-green-100/60 text-tempe-green-800'
                          : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mt-4 border-t border-stone-100 pt-4"
            >
              {isAuthenticated ? (
                <div className="flex gap-2">
                  <Link to="/admin" onClick={closeMenu} className="flex-1">
                    <Button variant="secondary" className="w-full">
                      Dashboard
                    </Button>
                  </Link>
                  <Button variant="ghost" className="flex-1" onClick={() => { logout(); closeMenu(); }}>
                    Keluar
                  </Button>
                </div>
              ) : (
                <Link to="/login" onClick={closeMenu}>
                  <Button className="w-full">Login Admin</Button>
                </Link>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
