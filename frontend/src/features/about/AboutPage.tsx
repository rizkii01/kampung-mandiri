import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Images, LayoutDashboard, Newspaper, PhoneCall, Rocket, Server, ShieldCheck, Store, Users } from 'lucide-react'
import Seo from '../../components/Seo'
import Card from '../../components/ui/Card'
import SectionHeading from '../../components/ui/SectionHeading'
import Button from '../../components/ui/Button'
import { containerStagger, itemStagger, viewportOnce } from '../../lib/motion'

const fitur = [
  {
    icon: Users,
    title: 'Profil Kampung',
    desc: 'Mengenal Kampung Mandiri Sentra Tempe, sejarah, visi misi, serta nilai-nilai kemandirian masyarakat RW 01.',
  },
  {
    icon: Store,
    title: 'Daftar UMKM',
    desc: 'Katalog lengkap perajin tempe beserta produk, kapasitas produksi, alamat, dan kontak yang dapat dihubungi.',
  },
  {
    icon: Newspaper,
    title: 'Kegiatan & Berita',
    desc: 'Dokumentasi kegiatan dan berita terbaru seputar pengembangan kampung tempe.',
  },
  {
    icon: Images,
    title: 'Galeri Foto',
    desc: 'Kumpulan foto kegiatan dan suasana sentra tempe yang dikelola oleh masyarakat.',
  },
  {
    icon: PhoneCall,
    title: 'Kontak & WhatsApp',
    desc: 'Saluran komunikasi untuk kerja sama, pemesanan partai, atau kunjungan ke kampung tempe.',
  },
  {
    icon: LayoutDashboard,
    title: 'Panel Admin',
    desc: 'Pengurus dapat memperbarui profil, UMKM, berita, dan galeri langsung melalui aplikasi.',
  },
]

const teknologi = [
  {
    icon: ShieldCheck,
    title: 'Frontend',
    desc: 'React, TypeScript, Vite, Tailwind CSS, dan Framer Motion untuk tampilan yang cepat dan responsif.',
  },
  {
    icon: Server,
    title: 'Backend',
    desc: 'Node.js dengan Express dan Prisma ORM untuk API yang aman dan mudah dikembangkan.',
  },
  {
    icon: Rocket,
    title: 'Hosting & Database',
    desc: 'Dideploy di Vercel dengan database PostgreSQL (Neon), sehingga gratis dan selalu tersedia.',
  },
]

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      <Seo
        title="Tentang Aplikasi"
        description="Tentang aplikasi profil digital Kampung Mandiri Sentra Tempe Bencongan — portal yang dikelola oleh masyarakat untuk memperkenalkan profil kampung, UMKM tempe, kegiatan, galeri, dan kontak."
        keywords="tentang aplikasi kampung tempe, sentra tempe bencongan, profil digital kampung mandiri"
      />

      <section className="bg-gradient-to-br from-tempe-cream-50 via-white to-tempe-green-50/30">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Tentang"
            title="Aplikasi Kampung Mandiri Sentra Tempe"
            subtitle="Aplikasi profil digital yang dibangun untuk memperkenalkan Kampung Tempe Bencongan, mempromosikan UMKM perajin tempe, serta mendokumentasikan kegiatan dan informasi kampung kepada masyarakat luas."
          />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="space-y-6 text-sm leading-relaxed text-stone-700 sm:text-base"
        >
          <motion.p variants={itemStagger}>
            Aplikasi ini dibuat oleh KKN Kelompok 2 Universitas Yatsi Madani sebagai media informasi digital
            Kampung Mandiri Sentra Tempe yang berada di RW 01 Kelurahan Bencongan, Kecamatan Kelapa Dua, Kabupaten
            Tangerang, Provinsi Banten. Melalui aplikasi ini, pengunjung dapat mengenal profil kampung, melihat
            daftar UMKM perajin tempe, membaca berita kegiatan, menjelajahi galeri foto, serta menghubungi
            pengelola kampung.
          </motion.p>
          <motion.p variants={itemStagger}>
            Kehadiran aplikasi ini adalah wujud digitalisasi kampung tempe — menghadirkan informasi yang
            transparan, rapi, dan mudah diakses dari mana saja. Seluruh konten di dalamnya dikelola dan
            diperbarui oleh masyarakat secara mandiri.
          </motion.p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 pb-20 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Fitur" title="Fitur-fitur Aplikasi" subtitle="Berbagai fitur untuk mengenal dan mengelola Kampung Tempe Bencongan." />
        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {fitur.map((item) => (
            <motion.div key={item.title} variants={itemStagger}>
              <Card hover className="h-full p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-tempe-green-50 text-tempe-green-700 shadow-sm">
                  <item.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-sm font-bold text-stone-900">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{item.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="bg-gradient-to-b from-tempe-green-50/40 to-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Teknologi"
            title="Dibangun dengan Teknologi Modern"
            subtitle="Aplikasi dikembangkan dengan perangkat teknologi yang cepat, ringan, dan mudah dirawat."
          />
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-12 grid gap-6 md:grid-cols-3"
          >
            {teknologi.map((item) => (
              <motion.div key={item.title} variants={itemStagger}>
                <Card hover className="h-full p-6 text-center">
                  <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-tempe-green-50 text-tempe-green-700 shadow-sm">
                    <item.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-sm font-bold text-stone-900">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 pb-24 sm:px-6 lg:px-8">
        <Card className="overflow-hidden">
          <div className="grid items-center gap-8 bg-gradient-to-br from-tempe-green-800 to-tempe-green-900 p-8 sm:p-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-white">Dikelola oleh Masyarakat</h2>
              <p className="mt-3 leading-relaxed text-tempe-green-50">
                Kampung Mandiri Sentra Tempe dan aplikasi ini dikelola oleh masyarakat RW 01 Kelurahan Bencongan,
                dibuat oleh KKN Kelompok 2 Universitas Yatsi Madani. Seluruh informasi, konten, dan data yang
                tampil diperbarui secara mandiri untuk kepentingan warga dan kemajuan kampung tempe.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/umkm">
                  <Button size="lg" className="bg-white text-tempe-green-800 hover:bg-tempe-cream-50 shadow-glow-gold">
                    Lihat UMKM
                  </Button>
                </Link>
                <Link to="/kegiatan">
                  <Button size="lg" className="border border-white/30 bg-white/10 text-white hover:bg-white/20">
                    Baca Kegiatan
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="rounded-2xl bg-white/10 p-6 text-sm leading-relaxed text-tempe-green-50">
                <p className="text-base font-semibold text-white">Kampung Mandiri Sentra Tempe</p>
                <p className="mt-2">RW 01 Kelurahan Bencongan, Kelapa Dua, Tangerang, Banten.</p>
                <p className="mt-3">Website profil digital yang dikelola oleh masyarakat.</p>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}
