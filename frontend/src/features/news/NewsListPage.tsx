import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CalendarDays, Expand, X } from 'lucide-react'
import { api } from '../../lib/api'
import Badge from '../../components/ui/Badge'
import Card from '../../components/ui/Card'
import EmptyState from '../../components/ui/EmptyState'
import Photo from '../../components/ui/Photo'
import SectionHeading from '../../components/ui/SectionHeading'
import Spinner from '../../components/ui/Spinner'
import { containerStagger, itemStagger } from '../../lib/motion'
import { formatTanggalPendek } from '../../lib/utils'
import type { GalleryImage } from '../../types/models'
import Seo from '../../components/Seo'

type Tab = 'berita' | 'galeri'

export default function NewsListPage() {
  const [tab, setTab] = useState<Tab>('berita')
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null)
  const { data: news, isLoading: newsLoading } = useQuery({
    queryKey: ['news'],
    queryFn: api.getNewsList,
  })
  const { data: gallery, isLoading: galleryLoading } = useQuery({
    queryKey: ['gallery'],
    queryFn: api.getGallery,
  })

  const tabs: { key: Tab; label: string }[] = [
    { key: 'berita', label: 'Berita & Kegiatan' },
    { key: 'galeri', label: 'Galeri Foto' },
  ]

  return (
    <div>
      <Seo
        title="Kegiatan & Program Kerja"
        description="Berita dan dokumentasi kegiatan Karang Taruna Kampung Mandiri Sentra Tempe Kelurahan Bencongan, Kelapa Dua, Tangerang — pelatihan, pembinaan UMKM, hingga galeri foto kampung tempe."
        keywords="kegiatan karang taruna, berita kampung tempe, program kerja kampung mandiri, galeri foto bencongan"
      />
      <section className="bg-gradient-to-br from-tempe-cream-50 via-white to-tempe-green-50/30">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Kabar Kampung"
            title="Kegiatan & Program Kerja"
            subtitle="Dokumentasi kegiatan Karang Taruna dan perkembangan Kampung Tempe Bencongan."
          />
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-md justify-center gap-1 rounded-full border border-stone-200/60 bg-white/80 p-1 shadow-sm backdrop-blur">
          {tabs.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setTab(item.key)}
              className={`relative flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                tab === item.key ? 'text-tempe-green-700' : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              {tab === item.key && (
                <motion.span
                  layoutId="tab-pill"
                  transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                  className="absolute inset-0 rounded-full bg-tempe-green-100/80 shadow-sm"
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {tab === 'berita' ? (
          <motion.section
            key="berita"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8"
          >
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
                          <span className="flex items-center gap-1.5 text-xs text-stone-500">
                            <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                            {formatTanggalPendek(item.tanggal)}
                          </span>
                        </div>
                        <h2 className="mt-3 text-lg font-bold leading-snug text-stone-900">
                          <Link to={`/kegiatan/${item.id}`} className="transition-colors hover:text-tempe-green-700">
                            {item.judul}
                          </Link>
                        </h2>
                        <p className="mt-2 line-clamp-2 text-sm text-stone-600">{item.ringkasan}</p>
                        <Link
                          to={`/kegiatan/${item.id}`}
                          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-tempe-green-600 hover:text-tempe-green-700"
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
          </motion.section>
        ) : (
          <motion.section
            key="galeri"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8"
          >
            {galleryLoading ? (
              <Spinner />
            ) : gallery?.length === 0 ? (
              <EmptyState title="Belum ada foto" description="Dokumentasi foto akan segera ditampilkan di sini." />
            ) : (
              <motion.div
                variants={containerStagger}
                initial="hidden"
                animate="visible"
                className="columns-1 gap-6 sm:columns-2 lg:columns-3"
              >
                {gallery?.map((item) => (
                  <motion.button
                    key={item.id}
                    variants={itemStagger}
                    type="button"
                    onClick={() => setLightbox(item)}
                    className="group relative mb-6 block w-full break-inside-avoid text-left"
                  >
                    <Photo src={item.url} alt={item.caption} ratio="aspect-square" className="rounded-2xl" />
                    <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                      <Expand className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="absolute inset-x-3 bottom-3 rounded-xl bg-gradient-to-t from-black/70 to-transparent p-3 pt-8 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="block text-sm font-semibold text-white">{item.caption}</span>
                      <span className="mt-0.5 block text-xs text-white/80">
                        {item.kategori} · {formatTanggalPendek(item.tanggal)}
                      </span>
                    </span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </motion.section>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="max-h-full w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Photo src={lightbox.url} alt={lightbox.caption} ratio="aspect-video" className="rounded-b-none" />
              <div className="flex items-center justify-between gap-4 p-5">
                <div>
                  <p className="font-semibold text-stone-900">{lightbox.caption}</p>
                  <p className="mt-0.5 text-xs text-stone-500">
                    {lightbox.kategori} · {formatTanggalPendek(lightbox.tanggal)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setLightbox(null)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition-colors hover:bg-stone-200"
                  aria-label="Tutup galeri"
                >
                  <X className="h-4.5 w-4.5" aria-hidden />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
