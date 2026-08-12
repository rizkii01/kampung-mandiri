import { Link } from 'react-router-dom'
import { AtSign, Clock, Mail, MapPin, Phone, Sprout } from 'lucide-react'
import { siteProfile } from '../../data/mock'

const links = [
  { to: '/', label: 'Beranda' },
  { to: '/profil', label: 'Profil Kampung' },
  { to: '/umkm', label: 'Daftar UMKM' },
  { to: '/kegiatan', label: 'Kegiatan' },
  { to: '/kontak', label: 'Kontak' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <Sprout className="h-5 w-5" aria-hidden />
            </span>
            <span className="text-base font-bold text-white">
              Sentra Tempe
              <span className="block text-xs font-medium text-emerald-400">Bencongan</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-400">
            {siteProfile.tagline}. Profil digital kampung tempe sebagai program kerja Karang Taruna
            Desa Bencongan.
          </p>
          {siteProfile.instagram && (
            <a
              href={`https://instagram.com/${siteProfile.instagram.replace('@', '')}`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-emerald-400"
            >
              <AtSign className="h-4 w-4" aria-hidden />
              {siteProfile.instagram}
            </a>
          )}
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Menu</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {links.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-gray-400 transition-colors hover:text-emerald-400">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Kontak</h3>
          <ul className="mt-4 space-y-3 text-sm text-gray-400">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
              {siteProfile.alamat}
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
              {siteProfile.noHp}
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
              {siteProfile.email}
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
              {siteProfile.jamOperasional}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-center text-xs text-gray-500 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Kampung Mandiri Sentra Tempe Bencongan</p>
          <p>Dikembangkan oleh Karang Taruna Desa Bencongan</p>
        </div>
      </div>
    </footer>
  )
}
