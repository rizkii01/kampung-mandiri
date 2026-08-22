import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CalendarDays, MapPin, Phone, Search, User } from 'lucide-react'
import { api } from '../../lib/api'
import Badge from '../../components/ui/Badge'
import Card from '../../components/ui/Card'
import EmptyState from '../../components/ui/EmptyState'
import Photo from '../../components/ui/Photo'
import SectionHeading from '../../components/ui/SectionHeading'
import Spinner from '../../components/ui/Spinner'
import { containerStagger, itemStagger } from '../../lib/motion'
import Seo from '../../components/Seo'
import { siteProfile } from '../../data/mock'

export default function UmkmListPage() {
  const { data: profile } = useQuery({
    queryKey: ['site-profile'],
    queryFn: api.getSiteProfile,
  })
  const data = profile ?? siteProfile
  const { data: umkm, isLoading } = useQuery({
    queryKey: ['umkm'],
    queryFn: api.getUmkmList,
  })
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const kategori = searchParams.get('kategori') ?? 'SEMUA'

  const setKategori = (val: string) => {
    if (val === 'SEMUA') {
      searchParams.delete('kategori')
    } else {
      searchParams.set('kategori', val)
    }
    setSearchParams(searchParams, { replace: true })
  }

  const filtered = useMemo(() => {
    if (!umkm) return []
    const q = query.trim().toLowerCase()
    return umkm.filter(
      (item) => {
        const matchKategori = kategori === 'SEMUA' || item.kategori === kategori
        const matchQuery = !q || item.nama.toLowerCase().includes(q) || item.pemilik.toLowerCase().includes(q) || item.deskripsi.toLowerCase().includes(q)
        return matchKategori && matchQuery
      },
    )
  }, [umkm, query, kategori])

  return (
    <div>
      <Seo
        title="UMKM Perajin Tempe"
        description={`Daftar unit usaha UMKM tempe di ${data.nama}, Kelapa Dua, Tangerang — profil produsen, produk, kapasitas produksi, dan kontak perajin tempe Bencongan.`}
        keywords="umkm tempe, perajin tempe bencongan, produsen tempe karawang, tempe kedelai klari, jual tempe"
      />
      <section className="bg-gradient-to-br from-tempe-cream-50 via-white to-tempe-green-50/30">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Anggota Kampung"
            title="UMKM Perajin Tempe"
            subtitle={`Daftar unit usaha tempe yang tergabung dalam ${data.nama}.`}
          />
          <div className="relative mx-auto mt-8 flex max-w-lg items-center gap-3">
            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className="shrink-0 rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm shadow-sm outline-none transition-colors focus:border-tempe-green-600 focus:ring-2 focus:ring-tempe-green-600/20"
            >
              <option value="SEMUA">Semua Kategori</option>
              <option value="UMKM">UMKM Umum</option>
              <option value="TEMPE">UMKM Tempe</option>
            </select>
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" aria-hidden />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari nama UMKM atau pemilik..."
                className="w-full rounded-xl border border-stone-300 bg-white py-3 pl-12 pr-4 text-sm shadow-sm outline-none transition-colors placeholder:text-stone-400 focus:border-tempe-green-600 focus:ring-2 focus:ring-tempe-green-600/20"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {isLoading ? (
          <Spinner />
        ) : filtered.length === 0 ? (
          <EmptyState
            title="UMKM tidak ditemukan"
            description="Coba ubah kata kunci pencarian kamu."
          />
        ) : (
          <motion.div
            variants={containerStagger}
            initial="hidden"
            animate="visible"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((item) => (
              <motion.div key={item.id} variants={itemStagger} className="h-full">
                <Link to={`/umkm/${item.id}`} className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tempe-green-600 focus-visible:ring-offset-2 rounded-3xl">
                  <Card hover className="group flex h-full flex-col overflow-hidden">
                    <div className="relative">
                      <Photo
                        src={item.imageUrl}
                        alt={item.nama}
                        ratio="aspect-[4/3]"
                        className="rounded-b-none border-b border-stone-200"
                      />
                      <span className="absolute right-4 top-4 z-10">
                        <Badge tone={item.status === 'AKTIF' ? 'green' : 'gray'} className="bg-white/90 backdrop-blur">
                          {item.status}
                        </Badge>
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-lg font-bold tracking-tight text-stone-900">{item.nama}</h3>

                      <p className="mt-1.5 flex items-center gap-1.5 text-sm text-stone-500">
                        <User className="h-3.5 w-3.5 shrink-0 text-tempe-green-600" aria-hidden />
                        <span className="font-medium">{item.pemilik}</span>
                      </p>

                      <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-stone-600">
                        {item.deskripsi}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-1.5">
                        <span className="rounded-lg bg-tempe-gold-50 px-2.5 py-1 text-xs font-bold text-tempe-gold-700">
                          {item.kapasitas}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-stone-400">
                          <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                          sejak {item.bergabungSejak}
                        </span>
                      </div>

                      <div className="mt-3 space-y-1.5 text-sm text-stone-500">
                        <p className="flex items-start gap-1.5 line-clamp-1">
                          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-tempe-green-600" aria-hidden />
                          {item.alamat}
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5 shrink-0 text-tempe-green-600" aria-hidden />
                          {item.noHp}
                        </p>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {item.produk.slice(0, 3).map((produk) => (
                          <span
                            key={produk}
                            className="rounded-full bg-tempe-green-50 px-2.5 py-0.5 text-[11px] font-semibold text-tempe-green-700"
                          >
                            {produk}
                          </span>
                        ))}
                        {item.produk.length > 3 && (
                          <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[11px] font-semibold text-stone-500">
                            +{item.produk.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="mt-auto flex items-center justify-between border-t border-stone-100 pt-4">
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-tempe-green-600 group-hover:text-tempe-green-700">
                          Lihat detail
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  )
}
