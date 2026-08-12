import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays } from 'lucide-react'
import { api } from '../../lib/api'
import Badge from '../../components/ui/Badge'
import Card from '../../components/ui/Card'
import EmptyState from '../../components/ui/EmptyState'
import Photo from '../../components/ui/Photo'
import SectionHeading from '../../components/ui/SectionHeading'
import Spinner from '../../components/ui/Spinner'
import { formatTanggalPendek } from '../../lib/utils'

type Tab = 'berita' | 'galeri'

export default function NewsListPage() {
  const [tab, setTab] = useState<Tab>('berita')
  const { data: news, isLoading: newsLoading } = useQuery({
    queryKey: ['news'],
    queryFn: api.getNewsList,
  })
  const { data: gallery, isLoading: galleryLoading } = useQuery({
    queryKey: ['gallery'],
    queryFn: api.getGallery,
  })

  const tabClass = (active: boolean) =>
    active
      ? 'border-emerald-600 text-emerald-700'
      : 'border-transparent text-gray-500 hover:text-gray-700'

  return (
    <div>
      <section className="bg-gradient-to-br from-emerald-50 via-white to-gray-50">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Kabar Kampung"
            title="Kegiatan & Program Kerja"
            subtitle="Dokumentasi kegiatan Karang Taruna dan perkembangan Kampung Tempe Bencongan."
          />
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-center gap-2 border-b border-gray-200">
          <button
            type="button"
            onClick={() => setTab('berita')}
            className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${tabClass(tab === 'berita')}`}
          >
            Berita & Kegiatan
          </button>
          <button
            type="button"
            onClick={() => setTab('galeri')}
            className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${tabClass(tab === 'galeri')}`}
          >
            Galeri Foto
          </button>
        </div>
      </div>

      {tab === 'berita' && (
        <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
          {newsLoading ? (
            <Spinner />
          ) : news?.length === 0 ? (
            <EmptyState title="Belum ada berita" description="Kegiatan terbaru akan segera ditampilkan di sini." />
          ) : (
            <div className="space-y-6">
              {news?.map((item) => (
                <Card key={item.id} hover>
                  <div className="grid sm:grid-cols-[260px_1fr]">
                    <Photo src={item.coverUrl} alt={item.judul} ratio="aspect-video" className="rounded-none sm:rounded-l-2xl sm:rounded-r-none" />
                    <div className="flex flex-col p-6">
                      <div className="flex items-center gap-3">
                        <Badge tone="green">{item.kategori}</Badge>
                        <span className="flex items-center gap-1.5 text-xs text-gray-500">
                          <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                          {formatTanggalPendek(item.tanggal)}
                        </span>
                      </div>
                      <h2 className="mt-3 text-lg font-bold leading-snug text-gray-900">
                        <Link to={`/kegiatan/${item.id}`} className="transition-colors hover:text-emerald-700">
                          {item.judul}
                        </Link>
                      </h2>
                      <p className="mt-2 line-clamp-2 text-sm text-gray-600">{item.ringkasan}</p>
                      <Link
                        to={`/kegiatan/${item.id}`}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                      >
                        Baca selengkapnya
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>
      )}

      {tab === 'galeri' && (
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          {galleryLoading ? (
            <Spinner />
          ) : gallery?.length === 0 ? (
            <EmptyState title="Belum ada foto" description="Dokumentasi foto akan segera ditampilkan di sini." />
          ) : (
            <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
              {gallery?.map((item) => (
                <div key={item.id} className="mb-6 break-inside-avoid">
                  <Photo src={item.url} alt={item.caption} ratio="aspect-square" className="rounded-2xl" />
                  <div className="mt-2 px-1">
                    <Badge tone="gray">{item.kategori}</Badge>
                    <p className="mt-1.5 text-sm font-medium text-gray-800">{item.caption}</p>
                    <p className="text-xs text-gray-500">{formatTanggalPendek(item.tanggal)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  )
}
