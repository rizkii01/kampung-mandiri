import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Flame, Images, Sprout, Users } from 'lucide-react'
import { api } from '../../lib/api'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Photo from '../../components/ui/Photo'
import SectionHeading from '../../components/ui/SectionHeading'
import Spinner from '../../components/ui/Spinner'
import { formatTanggalPendek } from '../../lib/utils'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
    { icon: Users, label: 'UMKM Aktif', value: umkmAktif.length, suffix: 'unit' },
    { icon: Flame, label: 'Kapasitas Produksi', value: totalKapasitas, suffix: 'kg/hari' },
    { icon: Sprout, label: 'Kegiatan', value: news?.length ?? 0, suffix: 'berita' },
    { icon: Images, label: 'Dokumentasi', value: gallery?.length ?? 0, suffix: 'foto' },
  ]

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-gray-50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-28">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <Badge tone="green" className="mb-4">
              Program Kerja Karang Taruna
            </Badge>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl">
              {profile?.nama ?? 'Kampung Mandiri Sentra Tempe'}
            </h1>
            <p className="mt-4 text-lg text-emerald-700">{profile?.tagline}</p>
            <p className="mt-4 max-w-xl leading-relaxed text-gray-600">{profile?.deskripsi}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/umkm">
                <Button size="lg">
                  Jelajahi UMKM
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
              </Link>
              <Link to="/kontak">
                <Button size="lg" variant="outline">
                  Hubungi Kami
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.15 }}
          >
            <Photo
              src={profile?.heroImageUrl}
              alt="Suasana Kampung Tempe Bencongan"
              ratio="aspect-[4/3]"
              className="rounded-3xl shadow-card ring-1 ring-gray-200"
            />
          </motion.div>
        </div>
      </section>

      <section className="border-y border-gray-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="mx-auto h-6 w-6 text-emerald-600" aria-hidden />
              <p className="mt-2 text-3xl font-extrabold text-gray-900">
                {stat.value}
                {stat.suffix && <span className="ml-1 text-base font-semibold text-gray-500">{stat.suffix}</span>}
              </p>
              <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Anggota Kampung"
          title="UMKM Perajin Tempe"
          subtitle="Unit usaha mikro, kecil, dan menengah yang tergabung dan aktif memproduksi tempe setiap hari."
        />
        <div className="mt-10">
          {umkmLoading ? (
            <Spinner />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {umkmPreview.map((item) => (
                <Card key={item.id} hover>
                  <Photo
                    src={item.imageUrl}
                    alt={item.nama}
                    ratio="aspect-[4/3]"
                    className="rounded-b-none border-b border-gray-200"
                  />
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-lg font-bold text-gray-900">{item.nama}</h3>
                      <Badge tone={item.status === 'AKTIF' ? 'green' : 'gray'}>{item.status}</Badge>
                    </div>
                    <p className="mt-1 text-sm font-medium text-gray-500">
                      Pemilik: {item.pemilik}
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm text-gray-600">{item.deskripsi}</p>
                    <Link
                      to={`/umkm/${item.id}`}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                    >
                      Lihat detail
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
        <div className="mt-10 text-center">
          <Link to="/umkm">
            <Button variant="secondary" size="lg">
              Lihat Semua UMKM
            </Button>
          </Link>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Kabar Terbaru"
            title="Kegiatan & Program Kerja"
            subtitle="Dokumentasi kegiatan Karang Taruna dan perkembangan Kampung Tempe Bencongan."
          />
          <div className="mt-10">
            {newsLoading ? (
              <Spinner />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {newsPreview.map((item) => (
                  <Card key={item.id} hover>
                    <Photo src={item.coverUrl} alt={item.judul} ratio="aspect-video" className="rounded-b-none border-b border-gray-200" />
                    <div className="p-5">
                      <div className="flex items-center gap-2">
                        <Badge tone="green">{item.kategori}</Badge>
                        <span className="text-xs text-gray-500">{formatTanggalPendek(item.tanggal)}</span>
                      </div>
                      <h3 className="mt-3 text-base font-bold leading-snug text-gray-900">
                        {item.judul}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-gray-600">{item.ringkasan}</p>
                      <Link
                        to={`/kegiatan/${item.id}`}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                      >
                        Baca selengkapnya
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
          <div className="mt-10 text-center">
            <Link to="/kegiatan">
              <Button variant="outline" size="lg">
                Lihat Semua Kegiatan
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Card className="overflow-hidden">
          <div className="grid items-center gap-8 bg-emerald-600 p-8 sm:p-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Ingin bekerja sama atau memesan tempe Bencongan?
              </h2>
              <p className="mt-3 leading-relaxed text-emerald-50">
                Hubungi kami untuk informasi kerja sama, pemesanan partai, atau kunjungan ke
                Kampung Mandiri Sentra Tempe Bencongan.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/kontak">
                  <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50">
                    Hubungi Kami
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <Photo
                src={profile?.heroImageUrl}
                alt="Tempe produksi Bencongan"
                ratio="aspect-video"
                className="rounded-2xl"
              />
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}
