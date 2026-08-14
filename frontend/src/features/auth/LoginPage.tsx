import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'
import Button from '../../components/ui/Button'
import { scaleIn } from '../../lib/motion'
import Seo from '../../components/Seo'

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

  const inputClass =
    'w-full rounded-xl border border-white/60 bg-white/80 px-4 py-2.5 text-sm shadow-sm outline-none backdrop-blur transition-colors placeholder:text-stone-400 focus:border-tempe-green-600 focus:ring-2 focus:ring-tempe-green-600/20'

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-tempe-green-800 via-tempe-green-900 to-tempe-green-950 px-4 py-10">
      <Seo title="Masuk Admin" noindex />
      {/* Decorative background */}
      <div className="absolute inset-0 bg-dots-gold opacity-40" />
      <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-tempe-green-500/20 blur-3xl animate-pulse-glow" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-tempe-gold-500/25 blur-3xl animate-pulse-glow" style={{ animationDelay: '-2.5s' }} />
      <motion.span
        aria-hidden
        animate={{ y: [0, -18, 0], rotate: [0, 14, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        className="absolute left-[12%] top-[18%] hidden h-4 w-4 rounded-full bg-gradient-to-br from-tempe-gold-500 to-tempe-gold-700 shadow-glow-gold md:block"
      />
      <motion.span
        aria-hidden
        animate={{ y: [0, -22, 0], rotate: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 6.5, ease: 'easeInOut', delay: 1 }}
        className="absolute right-[14%] bottom-[22%] hidden h-3.5 w-3.5 rounded-full bg-gradient-to-br from-tempe-gold-500 to-tempe-gold-600 shadow-glow-gold md:block"
      />

      <div className="relative z-10 w-full max-w-md">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-tempe-green-50/80 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Kembali ke beranda
        </Link>

        <motion.div variants={scaleIn} initial="hidden" animate="visible">
          <div className="glass rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col items-center text-center">
              <motion.img
                src="/favicon.svg"
                alt="Logo Sentra Tempe Bencongan"
                whileHover={{ rotate: 12 }}
                className="h-14 w-14 rounded-2xl shadow-glow"
              />
              <h1 className="mt-4 text-xl font-bold text-stone-900">Login Admin</h1>
              <p className="mt-1 text-sm text-stone-600">
                Akses khusus pengurus Karang Taruna
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4" noValidate>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-stone-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register('email')}
                  className={inputClass}
                  placeholder="admin@karangtaruna.id"
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-stone-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  {...register('password')}
                  className={inputClass}
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

            <p className="mt-6 rounded-lg bg-white/60 px-3 py-2.5 text-center text-xs text-stone-500">
              Mode pengembangan: kombinasi email & password apa pun dapat digunakan untuk login.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
