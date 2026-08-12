import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Factory, MapPin, Phone, User, Wrench } from 'lucide-react'
import { api } from '../../lib/api'
import Badge from '../../components/ui/Badge'
import Card from '../../components/ui/Card'
import EmptyState from '../../components/ui/EmptyState'
import Photo from '../../components/ui/Photo'
import Spinner from '../../components/ui/Spinner'

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
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
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

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        to="/umkm"
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-emerald-600"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Kembali ke daftar UMKM
      </Link>

      <Card className="mt-6 overflow-hidden">
        <Photo src={umkm.imageUrl} alt={umkm.nama} ratio="aspect-[4/3]" className="rounded-b-none" />
        <div className="p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{umkm.nama}</h1>
            <Badge tone={umkm.status === 'AKTIF' ? 'green' : 'gray'}>{umkm.status}</Badge>
          </div>
          <p className="mt-2 text-sm text-gray-500">Bergabung sejak {umkm.bergabungSejak}</p>

          <p className="mt-6 leading-relaxed text-gray-600">{umkm.deskripsi}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {info.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-3 rounded-xl bg-gray-50 p-4"
              >
                <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-gray-900">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="flex items-center gap-2 text-base font-bold text-gray-900">
              <Wrench className="h-5 w-5 text-emerald-600" aria-hidden />
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
        </div>
      </Card>
    </div>
  )
}
