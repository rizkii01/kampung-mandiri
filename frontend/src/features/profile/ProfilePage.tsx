import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { CheckCircle2, History, Info, Target, ShieldCheck, Sprout } from 'lucide-react'
import { api } from '../../lib/api'
import Photo from '../../components/ui/Photo'
import SectionHeading from '../../components/ui/SectionHeading'
import Card from '../../components/ui/Card'
import { siteProfile } from '../../data/mock'
import Seo, { SITE_URL } from '../../components/Seo'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
}

export default function ProfilePage() {
  const { data: profile } = useQuery({
    queryKey: ['site-profile'],
    queryFn: api.getSiteProfile,
  })

  const data = profile ?? siteProfile
  const sejarahParagraf = data.sejarah.split('\n\n')

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: data.nama,
    description: data.deskripsi,
    url: `${SITE_URL}/profil`,
    logo: `${SITE_URL}${data.logoUrl}`,
    image: `${SITE_URL}${data.heroImageUrl}`,
    telephone: data.noHp,
    email: data.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kelapa Dua',
      addressRegion: 'Banten',
      addressCountry: 'ID',
    },
    openingHours: 'Mo-Su 06:00-18:00',
  }

  return (
    <div className="overflow-hidden">
      <Seo
        title="Profil Kampung Tempe"
        description={data.deskripsi}
        keywords="kampung tempe bencongan, sentra tempe kelapa dua, sejarah tempe tangerang, karang taruna bencongan"
        image={`${SITE_URL}${data.heroImageUrl}`}
        jsonLd={localBusinessJsonLd}
      />
      {/* Header Profile Section */}
      <section className="relative bg-gradient-to-br from-tempe-cream-50 via-tempe-cream-100 to-tempe-green-50/20 pt-16 pb-20 border-b border-stone-250/20 pattern-grid">
        <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-tempe-green-600/5 blur-3xl animate-pulse-glow" />
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeading
              eyebrow="Profil Kampung"
              title={data.nama}
              subtitle={data.tagline}
              className="max-w-3xl"
            />
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="flex items-start gap-3 rounded-2xl border border-tempe-green-200 bg-tempe-green-50/70 p-4 text-tempe-green-900">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-tempe-green-700" aria-hidden />
          <p className="text-sm leading-relaxed">
            <strong className="font-semibold">Disclaimer:</strong> Kampung Mandiri Sentra Tempe ini hanya ada di{' '}
            <strong className="font-semibold">RW 01 Kelurahan Bencongan</strong>, Kecamatan Kelapa Dua, Kabupaten
            Tangerang, Provinsi Banten. Website ini dikhususkan untuk wilayah RW 01 yang terdiri dari{' '}
            <strong className="font-semibold">9 RT</strong>.
          </p>
        </div>
      </div>

      {/* Sejarah dengan Lini Masa */}
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="relative overflow-hidden rounded-[2rem] p-2 bg-white shadow-card-hover border border-stone-200/50">
            <Photo
              src={data.heroImageUrl}
              alt={data.nama}
              ratio="aspect-video"
              className="rounded-[1.8rem]"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="pt-4 text-left">
            <h2 className="flex items-center gap-3 text-2xl font-extrabold text-stone-900 tracking-tight">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-tempe-green-50 text-tempe-green-700">
                <History className="h-5.5 w-5.5" />
              </span>
              Sejarah Kampung Tempe
            </h2>

            {/* Vertical timeline structure */}
            <div className="relative border-l-2 border-tempe-green-200/60 ml-5 mt-10 pl-8 space-y-10">
              {sejarahParagraf.map((paragraf, index) => (
                <div key={index} className="relative">
                  {/* Timeline dot */}
                  <span className="absolute -left-[41px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-tempe-green-100 ring-4 ring-tempe-cream-50 border border-tempe-green-600">
                    <span className="h-2 w-2 rounded-full bg-tempe-green-600" />
                  </span>
                  
                  {/* Timeline content box */}
                  <div className="rounded-2xl border border-stone-200/40 bg-white/70 backdrop-blur-sm p-6 shadow-sm">
                    <p className="leading-relaxed text-stone-600 text-sm sm:text-base">
                      {paragraf}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Visi & Misi Section */}
      <section className="bg-gradient-to-b from-stone-50 to-tempe-cream-100/60 border-t border-stone-200/50 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="grid gap-10 lg:grid-cols-2"
          >
            {/* Visi Card */}
            <motion.div variants={itemVariants}>
              <Card className="p-8 h-full bg-white flex flex-col justify-start border-l-4 border-l-tempe-gold-500 shadow-md">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-tempe-gold-50 text-tempe-gold-700">
                    <Target className="h-5.5 w-5.5" />
                  </span>
                  <h2 className="text-xl font-extrabold text-stone-900 tracking-tight">Visi Kampung</h2>
                </div>
                
                <p className="mt-6 leading-relaxed text-stone-600 text-lg font-medium italic relative pl-4 border-l border-stone-200">
                  "{data.visi}"
                </p>
              </Card>
            </motion.div>

            {/* Misi Card */}
            <motion.div variants={itemVariants}>
              <Card className="p-8 h-full bg-white flex flex-col justify-start border-l-4 border-l-tempe-green-600 shadow-md">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-tempe-green-50 text-tempe-green-700">
                    <ShieldCheck className="h-5.5 w-5.5" />
                  </span>
                  <h2 className="text-xl font-extrabold text-stone-900 tracking-tight">Misi Pemberdayaan</h2>
                </div>
                
                <ul className="mt-6 space-y-4">
                  {data.misi.map((item, index) => (
                    <motion.li
                      whileHover={{ x: 2 }}
                      key={index}
                      className="flex items-start gap-3.5 text-stone-600 text-sm sm:text-base"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-tempe-green-600" aria-hidden />
                      <span className="leading-relaxed text-left">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Nilai-Nilai Budaya/Tradisi */}
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 text-center">
        <SectionHeading
          eyebrow="Nilai Budaya"
          title="Prinsip Kampung Mandiri"
          subtitle="Tiga pilar utama pengembangan Sentra Tempe Bencongan oleh Karang Taruna."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            { title: 'Tradisi & Keahlian', desc: 'Diwariskan turun-temurun dengan resep alami yang terjaga keasliannya.', icon: Sprout },
            { title: 'Kemandirian Ekonomi', desc: 'Mendorong daya beli dan kesejahteraan warga secara kooperatif dan mandiri.', icon: Target },
            { title: 'Higienitas & Digital', desc: 'Menghadirkan teknologi modern untuk jaminan mutu dan ekspansi pemasaran digital.', icon: ShieldCheck },
          ].map((item, idx) => (
            <div key={idx} className="bg-white/60 border border-stone-200/30 rounded-2xl p-6 text-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-tempe-green-50 text-tempe-green-700 mx-auto mb-4">
                <item.icon className="h-5 w-5" />
              </span>
              <h3 className="font-bold text-stone-900 text-base">{item.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
