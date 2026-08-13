import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
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
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({ resolver: zodResolver(profileSchema) })

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
      })
    }
  }, [profile, reset])

  const onSubmit = async (values: ProfileFormValues) => {
    setNotice(null)
    await api.updateSiteProfile({
      ...values,
      misi: values.misi.split('\n').map((m) => m.trim()).filter(Boolean),
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

        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={isSubmitting}>
            <Save className="h-4 w-4" aria-hidden />
            {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
          </Button>
        </div>
      </form>
    </div>
  )
}
