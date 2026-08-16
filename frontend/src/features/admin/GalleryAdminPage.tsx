import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { api } from '../../lib/api'
import { gallerySchema, type GalleryFormValues } from '../../types/schemas'
import type { GalleryImage } from '../../types/models'
import Alert from '../../components/ui/Alert'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import EmptyState from '../../components/ui/EmptyState'
import Input from '../../components/ui/Input'
import Modal from '../../components/ui/Modal'
import PageHeader from '../../components/admin/PageHeader'
import Photo from '../../components/ui/Photo'
import Select from '../../components/ui/Select'
import Spinner from '../../components/ui/Spinner'
import ImageUpload from '../../components/admin/ImageUpload'
import FormSection from '../../components/admin/FormSection'
import { formatTanggalPendek } from '../../lib/utils'

const kategoriOptions = [
  { value: 'Kegiatan', label: 'Kegiatan' },
  { value: 'Produksi', label: 'Produksi' },
  { value: 'UMKM', label: 'UMKM' },
]

export default function GalleryAdminPage() {
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({ queryKey: ['gallery'], queryFn: api.getGallery })

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<GalleryImage | null>(null)
  const [deleting, setDeleting] = useState<GalleryImage | null>(null)
  const [notice, setNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<GalleryFormValues>({ resolver: zodResolver(gallerySchema) })

  const url = useWatch({ control, name: 'url' })

  const showNotice = (text: string) => {
    setNotice({ type: 'success', text })
    setTimeout(() => setNotice(null), 3000)
  }

  const openCreate = () => {
    setEditing(null)
    reset({
      caption: '',
      kategori: 'Kegiatan',
      tanggal: new Date().toISOString().slice(0, 10),
      url: '',
    })
    setModalOpen(true)
  }

  const openEdit = (item: GalleryImage) => {
    setEditing(item)
    reset({
      caption: item.caption,
      kategori: item.kategori,
      tanggal: item.tanggal,
      url: item.url ?? '',
    })
    setModalOpen(true)
  }

  const onSubmit = async (values: GalleryFormValues) => {
    setNotice(null)
    const payload = { ...values, url: values.url?.trim() || null, articleId: null }
    if (editing) {
      await api.updateGalleryImage(editing.id, payload)
      showNotice('Foto berhasil diperbarui.')
    } else {
      await api.createGalleryImage(payload)
      showNotice('Foto berhasil ditambahkan.')
    }
    await queryClient.invalidateQueries({ queryKey: ['gallery'] })
    setModalOpen(false)
  }

  const onDelete = async () => {
    if (!deleting) return
    setNotice(null)
    await api.deleteGalleryImage(deleting.id)
    await queryClient.invalidateQueries({ queryKey: ['gallery'] })
    setDeleting(null)
    showNotice('Foto berhasil dihapus.')
  }

  if (isLoading) return <Spinner />

  return (
    <div>
      <PageHeader
        title="Galeri Foto"
        description="Kelola dokumentasi foto kegiatan dan produksi kampung."
        action={
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" aria-hidden />
            Tambah Foto
          </Button>
        }
      />

      {notice && (
        <Alert className="mt-5" type={notice.type} onClose={() => setNotice(null)}>
          {notice.text}
        </Alert>
      )}

      {!data || data.length === 0 ? (
        <Card className="mt-6">
          <EmptyState
            title="Belum ada foto"
            description="Tambahkan foto dokumentasi pertama kamu."
            action={
              <Button onClick={openCreate} variant="secondary" size="sm">
                <Plus className="h-4 w-4" aria-hidden />
                Tambah Foto
              </Button>
            }
          />
        </Card>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <Card key={item.id}>
              <Photo src={item.url} alt={item.caption} ratio="aspect-square" className="rounded-b-none border-b border-gray-200" />
              <div className="flex items-start justify-between gap-3 p-4">
                <div>
                  <Badge tone="gray">{item.kategori}</Badge>
                  <p className="mt-1.5 text-sm font-medium text-gray-800">{item.caption}</p>
                  <p className="mt-0.5 text-xs text-gray-500">{formatTanggalPendek(item.tanggal)}</p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button
                    type="button"
                    onClick={() => openEdit(item)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                    aria-label={`Edit ${item.caption}`}
                  >
                    <Pencil className="h-4 w-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleting(item)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
                    aria-label={`Hapus ${item.caption}`}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        title={editing ? 'Edit Foto' : 'Tambah Foto'}
        onClose={() => setModalOpen(false)}
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <FormSection title="Informasi Foto">
            <div className="sm:col-span-2">
              <Input
                label="Keterangan Foto"
                placeholder="contoh: Proses perebusan kedelai"
                error={errors.caption?.message}
                {...register('caption')}
              />
            </div>
            <Select
              label="Kategori"
              options={kategoriOptions}
              error={errors.kategori?.message}
              {...register('kategori')}
            />
            <Input label="Tanggal" type="date" error={errors.tanggal?.message} {...register('tanggal')} />
          </FormSection>

          <FormSection title="Foto">
            <div className="sm:col-span-2">
              <ImageUpload
                label="Foto (opsional)"
                value={url ?? ''}
                onChange={(v) => setValue('url', v, { shouldDirty: true })}
                ratio="aspect-square"
                hint="JPG/PNG/WebP — otomatis diperkecil saat diunggah"
              />
            </div>
          </FormSection>

          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
              Batal
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Menyimpan...' : editing ? 'Simpan Perubahan' : 'Tambah Foto'}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleting)}
        title="Hapus Foto"
        message="Yakin ingin menghapus foto ini? Tindakan ini tidak dapat dibatalkan."
        onCancel={() => setDeleting(null)}
        onConfirm={onDelete}
      />
    </div>
  )
}
