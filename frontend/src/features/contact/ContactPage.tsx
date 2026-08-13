import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { AtSign, Clock, Mail, MapPin, Phone, PhoneCall } from 'lucide-react'
import { api } from '../../lib/api'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import SectionHeading from '../../components/ui/SectionHeading'
import Spinner from '../../components/ui/Spinner'
import { containerStagger, itemStagger } from '../../lib/motion'
import { siteProfile } from '../../data/mock'

export default function ContactPage() {
  const { data: profile, isLoading } = useQuery({
    queryKey: ['site-profile'],
    queryFn: api.getSiteProfile,
  })

  const data = profile ?? siteProfile

  const items = [
    { icon: MapPin, title: 'Alamat', value: data.alamat },
    { icon: Phone, title: 'Telepon', value: data.noHp },
    { icon: Mail, title: 'Email', value: data.email },
    { icon: Clock, title: 'Jam Operasional', value: data.jamOperasional },
  ]

  if (isLoading) return <Spinner />

  return (
    <div>
      <section className="bg-gradient-to-br from-tempe-cream-50 via-white to-tempe-green-50/30">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Hubungi Kami"
            title="Kontak Kampung Tempe"
            subtitle="Butuh informasi lebih lanjut tentang Kampung Mandiri Sentra Tempe Bencongan? Hubungi kami melalui kanal berikut."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          variants={containerStagger}
          initial="hidden"
          animate="visible"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((item) => (
            <motion.div key={item.title} variants={itemStagger}>
              <Card hover className="h-full p-6">
                <motion.span
                  whileHover={{ rotate: 12, scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 16 }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-tempe-green-50 text-tempe-green-700 shadow-sm"
                >
                  <item.icon className="h-5 w-5" aria-hidden />
                </motion.span>
                <h3 className="mt-4 text-sm font-bold text-stone-900">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-stone-600">{item.value}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <Card className="mt-10 overflow-hidden">
          <div className="grid items-center gap-8 bg-gradient-to-br from-tempe-green-800 to-tempe-green-900 p-8 sm:p-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-white">Bekerja sama dengan kami?</h2>
              <p className="mt-3 leading-relaxed text-tempe-green-50">
                Untuk kerja sama pemasaran, pemesanan partai, atau kunjungan, silakan hubungi
                Karang Taruna Desa Bencongan langsung melalui WhatsApp atau media sosial kami.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/62${data.noHp.replace(/[^0-9]/g, '').replace(/^0/, '')}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button size="lg" className="bg-white text-tempe-green-800 hover:bg-tempe-cream-50 shadow-glow-gold">
                    <PhoneCall className="h-4 w-4" aria-hidden />
                    Chat WhatsApp
                  </Button>
                </a>
                {data.instagram && (
                  <a
                    href={`https://instagram.com/${data.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button
                      size="lg"
                      className="border border-white/30 bg-white/10 text-white hover:bg-white/20"
                    >
                      <AtSign className="h-4 w-4" aria-hidden />
                      {data.instagram}
                    </Button>
                  </a>
                )}
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="rounded-2xl bg-white/10 p-6 text-sm leading-relaxed text-tempe-green-50">
                <p className="text-base font-semibold text-white">{data.nama}</p>
                <p className="mt-2">{data.alamat}</p>
                <p className="mt-3">
                  <Phone className="mr-2 inline h-4 w-4" aria-hidden />
                  {data.noHp}
                </p>
                <p className="mt-1.5">
                  <Mail className="mr-2 inline h-4 w-4" aria-hidden />
                  {data.email}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}
