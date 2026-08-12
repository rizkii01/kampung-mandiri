import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, Sprout } from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'

const schema = z.object({
  email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
})

type FormValues = z.infer<typeof schema>

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/admin'

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = async (values: FormValues) => {
    setError(null)
    const success = await login(values.email, values.password)
    if (success) {
      navigate(from, { replace: true })
    } else {
      setError('Email atau password tidak valid.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-gray-50 to-gray-100 px-4 py-10">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-emerald-600"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Kembali ke beranda
        </Link>

        <Card className="p-8">
          <div className="flex flex-col items-center text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white">
              <Sprout className="h-6 w-6" aria-hidden />
            </span>
            <h1 className="mt-4 text-xl font-bold text-gray-900">Login Admin</h1>
            <p className="mt-1 text-sm text-gray-500">
              Akses khusus pengurus Karang Taruna
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4" noValidate>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register('email')}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm shadow-sm outline-none transition-colors placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="admin@karangtaruna.id"
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                {...register('password')}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm shadow-sm outline-none transition-colors placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-600">{errors.password.message}</p>
              )}
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting} size="lg">
              {isSubmitting ? 'Memproses...' : 'Masuk'}
            </Button>
          </form>

          <p className="mt-6 rounded-lg bg-gray-50 px-3 py-2.5 text-center text-xs text-gray-500">
            Mode pengembangan: kombinasi email & password apa pun dapat digunakan untuk login.
          </p>
        </Card>
      </div>
    </div>
  )
}
