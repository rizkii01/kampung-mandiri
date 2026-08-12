import { useQuery } from '@tanstack/react-query'
import { Images, Newspaper, Sprout, Users } from 'lucide-react'
import { api } from '../../lib/api'
import Card from '../../components/ui/Card'
import Spinner from '../../components/ui/Spinner'

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

      <Card className="mt-6 border-dashed p-8 text-center">
        <Sprout className="mx-auto h-8 w-8 text-emerald-400" aria-hidden />
        <h2 className="mt-3 text-base font-bold text-gray-900">
          Pengelolaan konten akan segera hadir
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
          Pada tahap berikutnya, kamu dapat mengelola profil kampung, data UMKM, berita, dan
          galeri foto langsung dari panel ini.
        </p>
      </Card>
    </div>
  )
}
