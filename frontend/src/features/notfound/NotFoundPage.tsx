import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-6xl font-extrabold text-emerald-600">404</p>
      <h1 className="mt-4 text-2xl font-bold text-gray-900">Halaman tidak ditemukan</h1>
      <p className="mt-2 max-w-md text-gray-600">
        Halaman yang kamu cari mungkin telah dipindahkan atau tidak tersedia.
      </p>
      <Link to="/" className="mt-6">
        <Button>Kembali ke Beranda</Button>
      </Link>
    </div>
  )
}
