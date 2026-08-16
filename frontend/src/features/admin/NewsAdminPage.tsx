import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { api } from '../../lib/api'
import { newsSchema, type NewsFormValues } from '../../types/schemas'
import type { NewsArticle } from '../../types/models'
import Alert from '../../components/ui/Alert'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import EmptyState from '../../components/ui/EmptyState'
import Input from '../../components/ui/Input'
import Modal from '../../components/ui/Modal'
import PageHeader from '../../components/admin/PageHeader'
import Select from '../../components/ui/Select'
import Spinner from '../../components/ui/Spinner'
import Textarea from '../../components/ui/Textarea'
import ImageUpload from '../../components/admin/ImageUpload'
import FormSection from '../../components/admin/FormSection'
import { formatTanggal } from '../../lib/utils'

const kategoriOptions = [
  { value: 'Program Kerja', label: 'Program Kerja' },
  { value: 'Kegiatan', label: 'Kegiatan' },
  { value: 'Berita', label: 'Berita' },
]

export default function NewsAdminPage() {
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({ queryKey: ['news'], queryFn: api.getNewsList })

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<NewsArticle | null>(null)
  const [deleting, setDeleting] = useState<NewsArticle | null>(null)
  const [notice, setNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<NewsFormValues>({ resolver: zodResolver(newsSchema) })

  const coverUrl = useWatch({ control, name: 'coverUrl' })

  const showNotice = (text: string) => {
    setNotice({ type: 'success', text })
    setTimeout(() => setNotice(null), 3000)
  }

  const openCreate = () => {
    setEditing(null)
    reset({
      judul: '',
      kategori: 'Kegiatan',
      tanggal: new Date().toISOString().slice(0, 10),
      penulis: 'Karang Taruna Bencongan',
      ringkasan: '',
      konten: '',
      coverUrl: '',
    })
    setModalOpen(true)
  }

  const openEdit = (item: NewsArticle) => {
    setEditing(item)
    reset({
      judul: item.judul,
      kategori: item.kategori,
      tanggal: item.tanggal,
      penulis: item.penulis,
      ringkasan: item.ringkasan,
      konten: item.konten,
      coverUrl: item.coverUrl ?? '',
    })
    setModalOpen(true)
  }

  const onSubmit = async (values: NewsFormValues) => {
    setNotice(null)
    const payload = { ...values, coverUrl: values.coverUrl?.trim() || null }
    if (editing) {
      await api.updateNews(editing.id, payload)
      showNotice('Berita berhasil diperbarui.')
    } else {
      await api.createNews(payload)
      showNotice('Berita berhasil ditambahkan.')
    }
    await queryClient.invalidateQueries({ queryKey: ['news'] })
    setModalOpen(false)
  }

  const onDelete = async () => {
    if (!deleting) return
    setNotice(null)
    await api.deleteNews(deleting.id)
    await queryClient.invalidateQueries({ queryKey: ['news'] })
    setDeleting(null)
    showNotice(`"${deleting.judul}" berhasil dihapus.`)
  }

  if (isLoading) return <Spinner />

  return (
    <div>
      <PageHeader
        title="Kegiatan & Berita"
        description="Kelola berita dan dokumentasi program kerja Karang Taruna."
        action={
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" aria-hidden />
            Tambah Berita
          </Button>
        }
      />

      {notice && (
        <Alert className="mt-5" type={notice.type} onClose={() => setNotice(null)}>
          {notice.text}
        </Alert>
      )}

      <div className="mt-6 space-y-4">
        {!data || data.length === 0 ? (
          <Card>
            <EmptyState
              title="Belum ada berita"
              description="Tambahkan berita atau kegiatan pertama kamu."
              action={
                <Button onClick={openCreate} variant="secondary" size="sm">
                  <Plus className="h-4 w-4" aria-hidden />
                  Tambah Berita
                </Button>
              }
            />
          </Card>
        ) : (
          data.map((item) => (
            <Card key={item.id} className="p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="green">{item.kategori}</Badge>
                    <span className="text-xs text-gray-500">{formatTanggal(item.tanggal)}</span>
                  </div>
                  <h2 className="mt-2 text-base font-bold text-gray-900">{item.judul}</h2>
                  <p className="mt-1 text-sm text-gray-500">Oleh {item.penulis}</p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button
                    type="button"
                    onClick={() => openEdit(item)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                    aria-label={`Edit ${item.judul}`}
                  >
                    <Pencil className="h-4 w-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleting(item)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
                    aria-label={`Hapus ${item.judul}`}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      <Modal
        open={modalOpen}
        title={editing ? 'Edit Berita' : 'Tambah Berita'}
        onClose={() => setModalOpen(false)}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <FormSection title="Informasi Dasar">
            <div className="sm:col-span-2">
              <Input
                label="Judul"
                placeholder="contoh: Pelatihan Pembuatan Tempe Higienis"
                error={errors.judul?.message}
                {...register('judul')}
              />
            </div>
            <Select
              label="Kategori"
              options={kategoriOptions}
              error={errors.kategori?.message}
              {...register('kategori')}
            />
            <Input label="Tanggal" type="date" error={errors.tanggal?.message} {...register('tanggal')} />
            <div className="sm:col-span-2">
              <Input label="Penulis" error={errors.penulis?.message} {...register('penulis')} />
            </div>
          </FormSection>

          <FormSection title="Isi Berita">
            <div className="sm:col-span-2">
              <Textarea
                label="Ringkasan"
                rows={3}
                placeholder="Tulis 1–2 kalimat ringkas tentang isi berita. Teks ini tampil di daftar berita."
                error={errors.ringkasan?.message}
                {...register('ringkasan')}
              />
            </div>
            <div className="sm:col-span-2">
              <Textarea
                label="Konten"
                rows={8}
                placeholder="Tulis isi berita secara lengkap. Pisahkan paragraf dengan baris kosong."
                error={errors.konten?.message}
                {...register('konten')}
              />
            </div>
          </FormSection>

          <FormSection title="Foto Sampul">
            <div className="sm:col-span-2">
              <ImageUpload
                label="Foto Sampul (opsional)"
                value={coverUrl ?? ''}
                onChange={(v) => setValue('coverUrl', v, { shouldDirty: true })}
                ratio="aspect-video"
                hint="JPG/PNG/WebP — otomatis diperkecil saat diunggah"
              />
            </div>
          </FormSection>

          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
              Batal
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Menyimpan...' : editing ? 'Simpan Perubahan' : 'Tambah Berita'}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleting)}
        title="Hapus Berita"
        message={`Yakin ingin menghapus "${deleting?.judul}"? Tindakan ini tidak dapat dibatalkan.`}
        onCancel={() => setDeleting(null)}
        onConfirm={onDelete}
      />
    </div>
  )
}
