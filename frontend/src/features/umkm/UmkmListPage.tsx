import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { ArrowRight, Search } from 'lucide-react'
import { api } from '../../lib/api'
import Badge from '../../components/ui/Badge'
import Card from '../../components/ui/Card'
import EmptyState from '../../components/ui/EmptyState'
import Photo from '../../components/ui/Photo'
import SectionHeading from '../../components/ui/SectionHeading'
import Spinner from '../../components/ui/Spinner'
import { siteProfile } from '../../data/mock'

export default function UmkmListPage() {
  const { data: umkm, isLoading } = useQuery({
    queryKey: ['umkm'],
    queryFn: api.getUmkmList,
  })
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!umkm) return []
    const q = query.trim().toLowerCase()
    if (!q) return umkm
    return umkm.filter(
      (item) =>
        item.nama.toLowerCase().includes(q) ||
        item.pemilik.toLowerCase().includes(q) ||
        item.deskripsi.toLowerCase().includes(q),
    )
  }, [umkm, query])

  return (
    <div>
      <section className="bg-gradient-to-br from-emerald-50 via-white to-gray-50">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Anggota Kampung"
            title="UMKM Perajin Tempe"
            subtitle={`Daftar unit usaha tempe yang tergabung dalam ${siteProfile.nama}.`}
          />
          <div className="relative mx-auto mt-8 max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" aria-hidden />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nama UMKM atau pemilik..."
              className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 text-sm shadow-sm outline-none transition-colors placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
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
                  <p className="mt-1 text-sm font-medium text-gray-500">Pemilik: {item.pemilik}</p>
                  <p className="mt-3 text-sm text-gray-600">{item.kapasitas}</p>
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
      </section>
    </div>
  )
}
