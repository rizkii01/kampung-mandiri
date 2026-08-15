import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, CalendarDays, PenLine } from 'lucide-react'
import { api } from '../../lib/api'
import Badge from '../../components/ui/Badge'
import Card from '../../components/ui/Card'
import EmptyState from '../../components/ui/EmptyState'
import Photo from '../../components/ui/Photo'
import Spinner from '../../components/ui/Spinner'
import { fadeUp } from '../../lib/motion'
import { formatTanggal } from '../../lib/utils'
import Seo, { SITE_URL } from '../../components/Seo'

export default function NewsDetailPage() {
  const { id = '' } = useParams()
  const { data: news, isLoading } = useQuery({
    queryKey: ['news', id],
    queryFn: () => api.getNewsById(id),
    enabled: Boolean(id),
  })

  if (isLoading) return <Spinner />

  if (!news) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <EmptyState
          title="Berita tidak ditemukan"
          description="Artikel yang kamu cari tidak tersedia atau sudah dihapus."
          action={
            <Link
              to="/kegiatan"
              className="inline-flex items-center gap-2 text-sm font-semibold text-tempe-green-600 hover:text-tempe-green-700"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Kembali ke kegiatan
            </Link>
          }
        />
      </div>
    )
  }

  const paragraf = news.konten.split('\n\n')

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: news.judul,
    description: news.ringkasan,
    image: `${SITE_URL}${news.coverUrl}`,
    datePublished: news.tanggal,
    dateModified: news.tanggal,
    author: { '@type': 'Organization', name: news.penulis },
    publisher: { '@type': 'Organization', name: 'Karang Taruna Kelurahan Bencongan' },
  }

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8"
    >
      <Seo
        title={news.judul}
        description={news.ringkasan}
        type="article"
        image={`${SITE_URL}${news.coverUrl}`}
        keywords={`${news.kategori}, kegiatan karang taruna, kampung tempe bencongan`}
        jsonLd={articleJsonLd}
      />
      <Link
        to="/kegiatan"
        className="inline-flex items-center gap-2 text-sm font-semibold text-stone-500 transition-colors hover:text-tempe-green-600"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Kembali ke kegiatan
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Badge tone="green">{news.kategori}</Badge>
        <span className="flex items-center gap-1.5 text-sm text-stone-500">
          <CalendarDays className="h-4 w-4" aria-hidden />
          {formatTanggal(news.tanggal)}
        </span>
        <span className="flex items-center gap-1.5 text-sm text-stone-500">
          <PenLine className="h-4 w-4" aria-hidden />
          {news.penulis}
        </span>
      </div>

      <h1 className="mt-4 text-2xl font-extrabold leading-tight text-stone-900 sm:text-3xl">
        {news.judul}
      </h1>

      <Card className="mt-6 overflow-hidden">
        <Photo src={news.coverUrl} alt={news.judul} ratio="aspect-video" className="rounded-b-none" />
        <div className="p-8">
          <div className="space-y-4">
            {paragraf.map((paragrafItem, index) => (
              <p key={index} className="leading-relaxed text-stone-600">
                {paragrafItem}
              </p>
            ))}
          </div>
        </div>
      </Card>
    </motion.article>
  )
}
