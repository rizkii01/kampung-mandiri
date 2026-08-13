import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { ArrowRight, Images, Info, Newspaper, Sprout, Store, Users } from 'lucide-react'
import { api } from '../../lib/api'
import Card from '../../components/ui/Card'
import Spinner from '../../components/ui/Spinner'

const quickLinks = [
  { to: '/admin/profil', icon: Info, label: 'Profil Kampung', description: 'Kelola profil digital kampung' },
  { to: '/admin/umkm', icon: Store, label: 'UMKM', description: 'Kelola data perajin tempe' },
  { to: '/admin/kegiatan', icon: Newspaper, label: 'Kegiatan & Berita', description: 'Kelola berita dan program kerja' },
  { to: '/admin/galeri', icon: Images, label: 'Galeri Foto', description: 'Kelola dokumentasi foto' },
]

export default function AdminDashboardPage() {
  const { data: umkm, isLoading: umkmLoading } = useQuery({
    queryKey: ['umkm'],
    queryFn: api.getUmkmList,
  })
  const { data: news } = useQuery({ queryKey: ['news'], queryFn: api.getNewsList })
  const { data: gallery } = useQuery({ queryKey: ['gallery'], queryFn: api.getGallery })

  if (umkmLoading) return <Spinner />

  const stats = [
    { icon: Users, label: 'UMKM Terdaftar', value: umkm?.length ?? 0 },
    { icon: Newspaper, label: 'Berita & Kegiatan', value: news?.length ?? 0 },
    { icon: Images, label: 'Foto Galeri', value: gallery?.length ?? 0 },
    { icon: Sprout, label: 'Status', value: 'Aktif' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p className="mt-1 text-sm text-gray-500">Ringkasan konten Kampung Mandiri Sentra Tempe.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-5">
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <stat.icon className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="text-2xl font-extrabold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <h2 className="mt-8 text-sm font-bold uppercase tracking-wider text-gray-500">
        Kelola Konten
      </h2>
      <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickLinks.map((item) => (
          <Link key={item.to} to={item.to}>
            <Card hover className="h-full p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
                <item.icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-3 text-sm font-bold text-gray-900">{item.label}</h3>
              <p className="mt-1 text-xs text-gray-500">{item.description}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                Buka
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
