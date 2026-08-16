import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Save } from 'lucide-react'
import { api } from '../../lib/api'
import { profileSchema, type ProfileFormValues } from '../../types/schemas'
import Alert from '../../components/ui/Alert'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import PageHeader from '../../components/admin/PageHeader'
import Spinner from '../../components/ui/Spinner'
import Textarea from '../../components/ui/Textarea'
import ImageUpload from '../../components/admin/ImageUpload'

export default function ProfileAdminPage() {
  const queryClient = useQueryClient()
  const { data: profile, isLoading } = useQuery({
    queryKey: ['site-profile'],
    queryFn: api.getSiteProfile,
  })
  const [notice, setNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({ resolver: zodResolver(profileSchema) })

  const heroImages = useWatch({ control, name: 'heroImages' }) ?? []
  const logoUrl = useWatch({ control, name: 'logoUrl' })

  useEffect(() => {
    if (profile) {
      reset({
        nama: profile.nama,
        tagline: profile.tagline,
        deskripsi: profile.deskripsi,
        sejarah: profile.sejarah,
        visi: profile.visi,
        misi: profile.misi.join('\n'),
        alamat: profile.alamat,
        noHp: profile.noHp,
        email: profile.email,
        jamOperasional: profile.jamOperasional,
        instagram: profile.instagram ?? '',
        heroImageUrl: profile.heroImageUrl ?? '',
        heroImages: profile.heroImages && profile.heroImages.length > 0 ? profile.heroImages : profile.heroImageUrl ? [profile.heroImageUrl] : [],
        logoUrl: profile.logoUrl ?? '',
      })
    }
  }, [profile, reset])

  const onSubmit = async (values: ProfileFormValues) => {
    setNotice(null)
    const cleanHero = (values.heroImages ?? []).filter(Boolean).slice(0, 3)
    await api.updateSiteProfile({
      ...values,
      misi: values.misi.split('\n').map((m) => m.trim()).filter(Boolean),
      heroImages: cleanHero,
      heroImageUrl: cleanHero[0] ?? null,
    })
    await queryClient.invalidateQueries({ queryKey: ['site-profile'] })
    setNotice({ type: 'success', text: 'Profil kampung berhasil disimpan.' })
  }

  if (isLoading) return <Spinner />

  return (
    <div>
      <PageHeader
        title="Profil Kampung"
        description="Kelola informasi profil digital yang tampil di website."
      />

      {notice && (
        <Alert
          className="mt-5"
          type={notice.type}
          onClose={() => setNotice(null)}
        >
          {notice.text}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6" noValidate>
        <Card className="p-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">
            Informasi Utama
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Input label="Nama Kampung" placeholder="Kampung Mandiri Sentra Tempe" error={errors.nama?.message} {...register('nama')} />
            <Input label="Tagline" placeholder="Sentra Produksi Tempe Bencongan" error={errors.tagline?.message} {...register('tagline')} />
            <div className="sm:col-span-2">
              <Textarea label="Deskripsi" rows={3} error={errors.deskripsi?.message} {...register('deskripsi')} />
            </div>
            <div className="sm:col-span-2">
              <Textarea label="Sejarah" rows={6} error={errors.sejarah?.message} {...register('sejarah')} />
            </div>
            <div className="sm:col-span-2">
              <Textarea label="Visi" rows={3} error={errors.visi?.message} {...register('visi')} />
            </div>
            <div className="sm:col-span-2">
              <Textarea
                label="Misi (satu per baris)"
                rows={5}
                error={errors.misi?.message}
                {...register('misi')}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">Foto</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <ImageUpload
              label="Gambar Hero 1 (halaman depan)"
              value={heroImages[0] ?? ''}
              onChange={(v) => setValue('heroImages', [v, heroImages[1] ?? '', heroImages[2] ?? ''], { shouldDirty: true })}
              ratio="aspect-[4/3]"
              hint="JPG/PNG/WebP — otomatis diperkecil saat diunggah"
            />
            <ImageUpload
              label="Gambar Hero 2 (opsional)"
              value={heroImages[1] ?? ''}
              onChange={(v) => setValue('heroImages', [heroImages[0] ?? '', v, heroImages[2] ?? ''], { shouldDirty: true })}
              ratio="aspect-[4/3]"
              hint="Bisa diisi untuk slide kedua"
            />
            <ImageUpload
              label="Gambar Hero 3 (opsional)"
              value={heroImages[2] ?? ''}
              onChange={(v) => setValue('heroImages', [heroImages[0] ?? '', heroImages[1] ?? '', v], { shouldDirty: true })}
              ratio="aspect-[4/3]"
              hint="Bisa diisi untuk slide ketiga — maksimal 3 gambar"
            />
            <ImageUpload
              label="Logo Kampung"
              value={logoUrl ?? ''}
              onChange={(v) => setValue('logoUrl', v, { shouldDirty: true })}
              ratio="aspect-square"
              hint="JPG/PNG/WebP — otomatis diperkecil saat diunggah"
            />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">Kontak</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Input label="Alamat" error={errors.alamat?.message} {...register('alamat')} />
            </div>
            <Input label="No. HP" placeholder="0812-3456-7890" error={errors.noHp?.message} {...register('noHp')} />
            <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
            <Input label="Jam Operasional" placeholder="Senin – Minggu, 06.00 – 18.00 WIB" error={errors.jamOperasional?.message} {...register('jamOperasional')} />
            <Input label="Instagram" placeholder="@sentratempebencongan" error={errors.instagram?.message} {...register('instagram')} />
          </div>
        </Card>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button type="submit" size="lg" disabled={isSubmitting}>
            <Save className="h-4 w-4" aria-hidden />
            {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
          </Button>
        </div>
      </form>
    </div>
  )
}
