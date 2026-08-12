import { useQuery } from '@tanstack/react-query'
import { CheckCircle2 } from 'lucide-react'
import { api } from '../../lib/api'
import Spinner from '../../components/ui/Spinner'
import Photo from '../../components/ui/Photo'
import SectionHeading from '../../components/ui/SectionHeading'
import Card from '../../components/ui/Card'
import { siteProfile } from '../../data/mock'

export default function ProfilePage() {
  const { data: profile, isLoading } = useQuery({
    queryKey: ['site-profile'],
    queryFn: api.getSiteProfile,
  })

  const data = profile ?? siteProfile
  const sejarahParagraf = data.sejarah.split('\n\n')

  if (isLoading) return <Spinner />

  return (
    <div>
      <section className="bg-gradient-to-br from-emerald-50 via-white to-gray-50">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Profil Kampung"
            title={data.nama}
            subtitle={data.tagline}
          />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <Card className="overflow-hidden">
          <Photo
            src={data.heroImageUrl}
            alt={data.nama}
            ratio="aspect-video"
            className="rounded-b-none"
          />
          <div className="p-8">
            <h2 className="text-xl font-bold text-gray-900">Sejarah Kampung</h2>
            <div className="mt-4 space-y-4">
              {sejarahParagraf.map((paragraf, index) => (
                <p key={index} className="leading-relaxed text-gray-600">
                  {paragraf}
                </p>
              ))}
            </div>
          </div>
        </Card>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Card className="p-8">
            <h2 className="text-lg font-bold text-gray-900">Visi</h2>
            <p className="mt-4 leading-relaxed text-gray-600">{data.visi}</p>
          </Card>
          <Card className="p-8">
            <h2 className="text-lg font-bold text-gray-900">Misi</h2>
            <ul className="mt-4 space-y-3">
              {data.misi.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-600">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>
    </div>
  )
}
