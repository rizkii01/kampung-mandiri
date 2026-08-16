import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Factory, MapPin, MessageCircle, Phone, User, Wrench } from 'lucide-react'
import { api } from '../../lib/api'
import Badge from '../../components/ui/Badge'
import Card from '../../components/ui/Card'
import EmptyState from '../../components/ui/EmptyState'
import Photo from '../../components/ui/Photo'
import Spinner from '../../components/ui/Spinner'
import { fadeUp } from '../../lib/motion'
import Seo, { SITE_URL } from '../../components/Seo'
import { resolveImageUrl } from '../../lib/utils'

export default function UmkmDetailPage() {
  const { id = '' } = useParams()
  const { data: umkm, isLoading } = useQuery({
    queryKey: ['umkm', id],
    queryFn: () => api.getUmkmById(id),
    enabled: Boolean(id),
  })

  if (isLoading) return <Spinner />

  if (!umkm) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <EmptyState
          title="UMKM tidak ditemukan"
          description="Data yang kamu cari tidak tersedia atau sudah dihapus."
          action={
            <Link
              to="/umkm"
              className="inline-flex items-center gap-2 text-sm font-semibold text-tempe-green-600 hover:text-tempe-green-700"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Kembali ke daftar UMKM
            </Link>
          }
        />
      </div>
    )
  }

  const info = [
    { icon: User, label: 'Pemilik', value: umkm.pemilik },
    { icon: MapPin, label: 'Alamat', value: umkm.alamat },
    { icon: Phone, label: 'Kontak', value: umkm.noHp },
    { icon: Factory, label: 'Kapasitas', value: umkm.kapasitas },
  ]

  const waNumber = umkm.noHp.replace(/\D/g, '')
  const waLink = `https://wa.me/62${waNumber.replace(/^0/, '')}?text=${encodeURIComponent(
    `Halo ${umkm.nama}, saya tertarik dengan produk tempe Anda.`,
  )}`

  const umkmJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: umkm.nama,
    description: umkm.deskripsi,
    url: `${SITE_URL}/umkm/${umkm.id}`,
    image: resolveImageUrl(umkm.imageUrl),
    telephone: umkm.noHp,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kelapa Dua',
      addressRegion: 'Banten',
      addressCountry: 'ID',
    },
    makesOffer: umkm.produk.map((produk) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Product', name: produk },
    })),
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Seo
        title={umkm.nama}
        description={`${umkm.nama} — ${umkm.deskripsi} Alamat: ${umkm.alamat}. Kontak: ${umkm.noHp}.`}
        keywords={`${umkm.nama}, tempe bencongan, ${umkm.produk.join(', ')}, tempe tangerang`}
        image={resolveImageUrl(umkm.imageUrl)}
        jsonLd={umkmJsonLd}
      />
      <Link
        to="/umkm"
        className="inline-flex items-center gap-2 text-sm font-semibold text-stone-500 transition-colors hover:text-tempe-green-600"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Kembali ke daftar UMKM
      </Link>

      <motion.div variants={fadeUp} initial="hidden" animate="visible">
        <Card className="mt-6 overflow-hidden">
          <Photo src={umkm.imageUrl} alt={umkm.nama} ratio="aspect-[4/3]" className="rounded-b-none" />
          <div className="p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl">{umkm.nama}</h1>
              <Badge tone={umkm.status === 'AKTIF' ? 'green' : 'gray'}>{umkm.status}</Badge>
            </div>
            <p className="mt-2 text-sm text-stone-500">Bergabung sejak {umkm.bergabungSejak}</p>

            <p className="mt-6 leading-relaxed text-stone-600">{umkm.deskripsi}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {info.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-3 rounded-xl bg-tempe-cream-50 p-4"
                >
                  <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-tempe-green-600" aria-hidden />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-sm font-medium break-words text-stone-900">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h2 className="flex items-center gap-2 text-base font-bold text-stone-900">
                <Wrench className="h-5 w-5 text-tempe-green-600" aria-hidden />
                Produk
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {umkm.produk.map((produk) => (
                  <Badge key={produk} tone="green">
                    {produk}
                  </Badge>
                ))}
              </div>
            </div>

            <motion.a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-500/25 transition-shadow hover:shadow-xl hover:shadow-green-500/40 sm:w-auto"
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
              Hubungi via WhatsApp
            </motion.a>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
