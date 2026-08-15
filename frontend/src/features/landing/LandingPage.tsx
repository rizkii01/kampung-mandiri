import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ArrowRight, Flame, Images, Info, Sprout, Users, Check, Sparkles } from 'lucide-react'
import { api } from '../../lib/api'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Photo from '../../components/ui/Photo'
import SectionHeading from '../../components/ui/SectionHeading'
import Spinner from '../../components/ui/Spinner'
import AnimatedNumber from '../../components/ui/AnimatedNumber'
import { formatTanggalPendek } from '../../lib/utils'
import Seo, { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from '../../components/Seo'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  inLanguage: 'id',
}

export default function LandingPage() {
  const { data: profile } = useQuery({
    queryKey: ['site-profile'],
    queryFn: api.getSiteProfile,
  })
  const { data: umkm, isLoading: umkmLoading } = useQuery({
    queryKey: ['umkm'],
    queryFn: api.getUmkmList,
  })
  const { data: news, isLoading: newsLoading } = useQuery({
    queryKey: ['news'],
    queryFn: api.getNewsList,
  })
  const { data: gallery } = useQuery({
    queryKey: ['gallery'],
    queryFn: api.getGallery,
  })

  const umkmAktif = umkm?.filter((item) => item.status === 'AKTIF') ?? []
  const umkmPreview = umkmAktif.slice(0, 3)
  const newsPreview = news?.slice(0, 3) ?? []

  const totalKapasitas = umkmAktif.reduce((acc, item) => {
    const match = item.kapasitas.match(/\d+/)
    return acc + (match ? Number.parseInt(match[0], 10) : 0)
  }, 0)

  const stats = [
    { icon: Users, label: 'UMKM Perajin Aktif', value: umkmAktif.length, suffix: ' unit' },
    { icon: Flame, label: 'Kapasitas Produksi', value: totalKapasitas, suffix: ' kg/hari' },
    { icon: Sprout, label: 'Kegiatan Karang Taruna', value: news?.length ?? 0, suffix: ' berita' },
    { icon: Images, label: 'Dokumentasi Galeri', value: gallery?.length ?? 0, suffix: ' foto' },
  ]

  return (
    <div className="overflow-hidden">
      <Seo jsonLd={websiteJsonLd} />
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-tempe-cream-50 via-tempe-cream-100 to-tempe-green-50/20 pattern-grid pt-12 pb-24">
        {/* Glow ambient effects */}
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-tempe-green-600/10 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-tempe-gold-500/10 blur-3xl animate-pulse-glow" style={{ animationDelay: '-3s' }} />

        {/* Floating soybean & leaf elements */}
        <motion.span
          aria-hidden
          animate={{ y: [0, -18, 0], rotate: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          className="absolute left-[8%] top-[18%] hidden h-4 w-4 rounded-full bg-gradient-to-br from-tempe-gold-500 to-tempe-gold-700 shadow-glow-gold lg:block"
        />
        <motion.span
          aria-hidden
          animate={{ y: [0, -24, 0], rotate: [0, -16, 0] }}
          transition={{ repeat: Infinity, duration: 6.5, ease: 'easeInOut', delay: 0.8 }}
          className="absolute right-[12%] top-[22%] hidden h-3.5 w-3.5 rounded-full bg-gradient-to-br from-tempe-gold-500 to-tempe-gold-600 shadow-glow-gold lg:block"
        />
        <motion.span
          aria-hidden
          animate={{ y: [0, -14, 0] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 1.4 }}
          className="absolute left-[20%] bottom-[16%] hidden h-3 w-3 rounded-full bg-tempe-green-600/50 lg:block"
        />
        <motion.span
          aria-hidden
          animate={{ y: [0, -20, 0], rotate: [0, 24, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 2 }}
          className="absolute right-[24%] bottom-[12%] hidden h-5 w-5 rounded-full bg-gradient-to-br from-tempe-green-400 to-tempe-green-700/80 lg:block"
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 mb-10">
          <div className="inline-flex flex-wrap items-center gap-2 rounded-2xl border border-tempe-green-200 bg-white/85 px-4 py-2.5 text-xs font-semibold text-tempe-green-800 shadow-sm backdrop-blur">
            <Info className="h-4 w-4 shrink-0 text-tempe-green-600" aria-hidden />
            Kampung Mandiri Sentra Tempe ini hanya ada di RW 01 Kelurahan Bencongan (9 RT) &mdash; website dikhususkan untuk wilayah RW 01, Kelapa Dua, Kabupaten Tangerang, Banten.
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            
            {/* Left Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="flex flex-col items-start text-left"
            >
              <Badge tone="green" className="mb-6 flex items-center gap-1.5 shadow-sm bg-tempe-green-100 text-tempe-green-800">
                <Sparkles className="h-3.5 w-3.5 text-tempe-green-600 animate-spin" style={{ animationDuration: '3s' }} />
                Program Unggulan Karang Taruna
              </Badge>
              
              <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
                Membangun Desa Lewat{' '}
                <span className="relative inline-block text-tempe-green-700">
                  Sentra Tempe
                  <span className="absolute bottom-1.5 left-0 w-full h-3 bg-tempe-gold-500/25 -z-10 rounded-full" />
                </span>{' '}
                Mandiri
              </h1>
              
              <p className="mt-6 text-lg font-medium text-tempe-green-800/90 leading-relaxed max-w-lg">
                {profile?.tagline ?? 'Digitalisasi UMKM Perajin Tempe Kelurahan Bencongan'}
              </p>
              
              <p className="mt-4 leading-relaxed text-stone-600 max-w-xl">
                {profile?.deskripsi ?? 'Pusat pemberdayaan ekonomi masyarakat perajin tempe berbasis digital untuk higienitas, standar mutu tinggi, dan perluasan jangkauan pasar.'}
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/umkm">
                  <Button size="lg" className="shadow-lg hover:shadow-tempe-green-600/35">
                    Jelajahi UMKM Tempe
                    <ArrowRight className="h-4.5 w-4.5" aria-hidden />
                  </Button>
                </Link>
                <Link to="/kontak">
                  <Button size="lg" variant="outline">
                    Kemitraan & Hubungi Kami
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right Media (Hero Image with beautiful layout) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: 1 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative flex items-center justify-center lg:justify-end"
            >
              {/* Photo Frame Styling */}
              <div className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] bg-stone-100 p-3 shadow-card-hover ring-1 ring-stone-900/5 group">
                <div className="absolute inset-0 bg-gradient-to-tr from-tempe-green-900/20 via-transparent to-tempe-gold-500/10 pointer-events-none z-10 rounded-[2.2rem]" />
                <Photo
                  src={profile?.heroImageUrl}
                  alt="Sentra Tempe Bencongan"
                  ratio="aspect-[4/3]"
                  className="rounded-[2.2rem] transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Float soybean mini card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl border border-stone-200/50"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-tempe-gold-100 text-tempe-gold-600">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div className="text-left">
                  <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Mutu Produk</p>
                  <p className="text-sm font-bold text-stone-850">100% Organik & Bersih</p>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* STATS BORDER BANNER */}
      <section className="relative z-20 -mt-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-3xl border border-stone-200/60 bg-white/90 backdrop-blur-xl p-8 shadow-card-hover grid grid-cols-2 gap-y-8 gap-x-4 md:grid-cols-4 md:py-10 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center justify-center border-r border-stone-100 last:border-0 px-2">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-tempe-green-50 text-tempe-green-700 mb-3 shadow-inner">
                <stat.icon className="h-5.5 w-5.5" aria-hidden />
              </span>
              <p className="leading-none">
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  suffixClassName="ml-0.5 text-base font-semibold text-tempe-green-600"
                  className="tabular-nums text-3xl font-extrabold text-stone-900 leading-none"
                />
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-stone-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ANGGOTA KAMPUNG / UMKM PREVIEW */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Daftar Pengusaha"
          title="UMKM Perajin Tempe Unggulan"
          subtitle="Para perajin tempe lokal pilihan yang aktif memproduksi tempe higienis dengan bahan kedelai bermutu tinggi setiap hari."
        />
        
        <div className="mt-14">
          {umkmLoading ? (
            <Spinner />
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {umkmPreview.map((item) => (
                <motion.div key={item.id} variants={cardVariants}>
                  <Card hover className="h-full flex flex-col overflow-hidden">
                    <div className="relative overflow-hidden group">
                      <Photo
                        src={item.imageUrl}
                        alt={item.nama}
                        ratio="aspect-[4/3]"
                        className="rounded-t-none border-b border-stone-150 transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 right-4 z-10">
                        <Badge tone="green" className="shadow-md bg-white/95 text-tempe-green-700 border-tempe-green-200">
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex flex-col flex-1 p-6 text-left">
                      <h3 className="text-xl font-bold text-stone-900 tracking-tight leading-snug">
                        {item.nama}
                      </h3>
                      
                      <div className="mt-2.5 flex items-center gap-1 text-xs font-semibold text-stone-500">
                        <span>Pemilik:</span>
                        <span className="text-stone-850">{item.pemilik}</span>
                      </div>
                      
                      <p className="mt-3.5 line-clamp-2 text-sm leading-relaxed text-stone-600 flex-1">
                        {item.deskripsi}
                      </p>

                      <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                        <span className="text-xs font-bold text-tempe-gold-700 bg-tempe-gold-50 px-2.5 py-1 rounded-lg">
                          {item.kapasitas}
                        </span>
                        
                        <Link
                          to={`/umkm/${item.id}`}
                          className="inline-flex items-center gap-1.5 text-sm font-bold text-tempe-green-700 hover:text-tempe-green-950 transition-all"
                        >
                          Lihat Detail
                          <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" aria-hidden />
                        </Link>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        <div className="mt-14 text-center">
          <Link to="/umkm">
            <Button variant="secondary" size="lg" className="shadow-sm border border-stone-200">
              Lihat Seluruh UMKM Kampung Tempe
            </Button>
          </Link>
        </div>
      </section>

      {/* KABAR TERBARU / KEGIATAN & NEWS */}
      <section className="bg-gradient-to-b from-stone-50 to-tempe-cream-50 border-y border-stone-200/50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Kabar Terkini"
            title="Kegiatan & Pemberdayaan Desa"
            subtitle="Kanal berita resmi mengenai program kerja pembinaan Karang Taruna dan agenda bersama Sentra Tempe."
          />

          <div className="mt-14">
            {newsLoading ? (
              <Spinner />
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
              >
                {newsPreview.map((item) => (
                  <motion.div key={item.id} variants={cardVariants}>
                    <Card hover className="h-full flex flex-col overflow-hidden">
                      <div className="relative overflow-hidden group">
                        <Photo
                          src={item.coverUrl}
                          alt={item.judul}
                          ratio="aspect-video"
                          className="rounded-t-none border-b border-stone-150 transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 z-10">
                          <Badge tone="green" className="bg-white/95 text-tempe-green-700">
                            {item.kategori}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex flex-col flex-1 p-6 text-left">
                        <span className="text-xs font-bold text-stone-400">
                          {formatTanggalPendek(item.tanggal)}
                        </span>
                        
                        <h3 className="mt-2 text-lg font-bold leading-snug text-stone-900 tracking-tight flex-1">
                          <Link to={`/kegiatan/${item.id}`} className="hover:text-tempe-green-700 transition-colors">
                            {item.judul}
                          </Link>
                        </h3>
                        
                        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-stone-600">
                          {item.ringkasan}
                        </p>
                        
                        <Link
                          to={`/kegiatan/${item.id}`}
                          className="mt-5 pt-3 border-t border-stone-100 inline-flex items-center gap-1.5 text-sm font-bold text-tempe-green-700 hover:text-tempe-green-950 transition-all"
                        >
                          Baca Selengkapnya
                          <ArrowRight className="h-4.5 w-4.5" aria-hidden />
                        </Link>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
          
          <div className="mt-14 text-center">
            <Link to="/kegiatan">
              <Button variant="outline" size="lg">
                Lihat Semua Kegiatan Taruna
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION PARTNERSHIP */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Card className="overflow-hidden border-0 bg-gradient-to-br from-tempe-green-800 to-tempe-green-900 shadow-xl relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-white/5 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-tempe-gold-500/10 blur-2xl pointer-events-none" />

            <div className="relative grid items-center gap-10 p-8 sm:p-14 lg:grid-cols-[1.2fr_1fr] z-10">
              <div className="text-left">
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-tempe-gold-100 uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full backdrop-blur-md mb-4">
                  <Check className="h-3.5 w-3.5 text-tempe-gold-500" /> Hubungan Kemitraan
                </span>
                
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight leading-tight">
                  Tertarik Memesan Tempe Bencongan?
                </h2>
                
                <p className="mt-4 leading-relaxed text-stone-200 max-w-xl">
                  Kami memfasilitasi kerja sama pasokan rutin untuk katering, pasar induk, reseller, warung makan, hingga studi wisata edukasi pembuatan tempe di Kelurahan Bencongan.
                </p>
                
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link to="/kontak">
                    <Button size="lg" className="bg-white text-tempe-green-900 hover:bg-tempe-cream-50 hover:text-tempe-green-950 shadow-md">
                      Hubungi Hub Layanan Kami
                    </Button>
                  </Link>
                  <Link to="/profil">
                    <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      Pelajari Visi Misi
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="hidden lg:block relative p-2">
                <div className="absolute inset-0 bg-gradient-to-tr from-tempe-green-950/40 to-transparent z-10 rounded-[1.5rem]" />
                <Photo
                  src={profile?.heroImageUrl}
                  alt="Kemitraan Sentra Tempe"
                  ratio="aspect-video"
                  className="rounded-[1.5rem] shadow-lg border border-white/10"
                />
              </div>
            </div>
          </Card>
        </motion.div>
      </section>
    </div>
  )
}
