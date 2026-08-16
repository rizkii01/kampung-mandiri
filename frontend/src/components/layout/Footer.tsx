import { Link } from 'react-router-dom'
import { AtSign, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { siteProfile } from '../../data/mock'

const links = [
  { to: '/', label: 'Beranda' },
  { to: '/profil', label: 'Profil Kampung' },
  { to: '/tentang', label: 'Tentang Aplikasi' },
  { to: '/umkm', label: 'Daftar UMKM' },
  { to: '/kegiatan', label: 'Kegiatan & Berita' },
  { to: '/kontak', label: 'Kontak Kami' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-stone-900 text-stone-300 border-t border-stone-800">
      {/* Decorative colored glow in footer backdrop */}
      <div className="absolute -left-36 -top-36 h-96 w-96 rounded-full bg-tempe-green-600/10 blur-3xl" />
      <div className="absolute -right-36 -bottom-36 h-96 w-96 rounded-full bg-tempe-gold-500/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8 lg:py-20">
        <div>
          <div className="flex items-center gap-3">
            <motion.img
              src="/favicon.svg"
              alt="Logo Sentra Tempe Bencongan"
              whileHover={{ rotate: 10 }}
              className="h-10 w-10 rounded-xl shadow-glow"
            />
            <span className="text-base font-extrabold text-white tracking-tight">
              Sentra Tempe
              <span className="block text-[11px] font-bold text-tempe-green-400 uppercase tracking-wider">Bencongan</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone-400">
            {siteProfile.tagline}. Profil digital sentra UMKM tempe yang dikelola oleh masyarakat, khusus untuk wilayah RW 01, Kelapa Dua, Tangerang, Banten.
          </p>
          {siteProfile.instagram && (
            <motion.a
              whileHover={{ x: 4, textShadow: '0 0 8px rgba(16,185,129,0.3)' }}
              href={`https://instagram.com/${siteProfile.instagram.replace('@', '')}`}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm text-stone-400 hover:text-tempe-green-400 transition-all"
            >
              <AtSign className="h-4.5 w-4.5 text-tempe-green-500" aria-hidden />
              {siteProfile.instagram}
            </motion.a>
          )}
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-white border-b border-stone-850 pb-2 max-w-[100px]">Navigasi</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-stone-400 transition-colors hover:text-tempe-green-400 font-medium inline-block hover:translate-x-1 duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-white border-b border-stone-850 pb-2 max-w-[100px]">Info Kontak</h3>
          <ul className="mt-4 space-y-3.5 text-sm text-stone-400">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-tempe-green-500" aria-hidden />
              <span className="leading-relaxed">{siteProfile.alamat}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4.5 w-4.5 shrink-0 text-tempe-green-500" aria-hidden />
              <span>{siteProfile.noHp}</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4.5 w-4.5 shrink-0 text-tempe-green-500" aria-hidden />
              <span>{siteProfile.email}</span>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="h-4.5 w-4.5 shrink-0 text-tempe-green-500" aria-hidden />
              <span>{siteProfile.jamOperasional}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-stone-800 bg-stone-950/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center text-xs text-stone-500 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Kampung Mandiri Sentra Tempe — RW 01 Kelurahan Bencongan. All rights reserved.</p>
          <p className="font-semibold text-stone-600">Dikembangkan oleh Masyarakat RW 01 Kelurahan Bencongan</p>
        </div>
      </div>
    </footer>
  )
}
