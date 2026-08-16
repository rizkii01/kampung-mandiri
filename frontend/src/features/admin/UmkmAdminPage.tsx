import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { api } from '../../lib/api'
import { umkmSchema, type UmkmFormValues } from '../../types/schemas'
import type { Umkm } from '../../types/models'
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

export default function UmkmAdminPage() {
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({ queryKey: ['umkm'], queryFn: api.getUmkmList })

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Umkm | null>(null)
  const [deleting, setDeleting] = useState<Umkm | null>(null)
  const [notice, setNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UmkmFormValues>({ resolver: zodResolver(umkmSchema) })

  const imageUrl = useWatch({ control, name: 'imageUrl' })

  const showNotice = (text: string) => {
    setNotice({ type: 'success', text })
    setTimeout(() => setNotice(null), 3000)
  }

  const openCreate = () => {
    setEditing(null)
    reset({
      nama: '',
      pemilik: '',
      deskripsi: '',
      alamat: '',
      noHp: '',
      kapasitas: '',
      status: 'AKTIF',
      produk: '',
      bergabungSejak: '',
      imageUrl: '',
    })
    setModalOpen(true)
  }

  const openEdit = (umkm: Umkm) => {
    setEditing(umkm)
    reset({
      nama: umkm.nama,
      pemilik: umkm.pemilik,
      deskripsi: umkm.deskripsi,
      alamat: umkm.alamat,
      noHp: umkm.noHp,
      kapasitas: umkm.kapasitas,
      status: umkm.status,
      produk: umkm.produk.join(', '),
      bergabungSejak: umkm.bergabungSejak,
      imageUrl: umkm.imageUrl ?? '',
    })
    setModalOpen(true)
  }

  const onSubmit = async (values: UmkmFormValues) => {
    setNotice(null)
    const payload = {
      ...values,
      produk: values.produk.split(',').map((p) => p.trim()).filter(Boolean),
      imageUrl: values.imageUrl?.trim() || null,
    }
    if (editing) {
      await api.updateUmkm(editing.id, payload)
      showNotice('UMKM berhasil diperbarui.')
    } else {
      await api.createUmkm(payload)
      showNotice('UMKM berhasil ditambahkan.')
    }
    await queryClient.invalidateQueries({ queryKey: ['umkm'] })
    setModalOpen(false)
  }

  const onDelete = async () => {
    if (!deleting) return
    setNotice(null)
    await api.deleteUmkm(deleting.id)
    await queryClient.invalidateQueries({ queryKey: ['umkm'] })
    setDeleting(null)
    showNotice(`"${deleting.nama}" berhasil dihapus.`)
  }

  if (isLoading) return <Spinner />

  return (
    <div>
      <PageHeader
        title="UMKM"
        description="Kelola data perajin tempe yang tergabung di kampung."
        action={
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" aria-hidden />
            Tambah UMKM
          </Button>
        }
      />

      {notice && (
        <Alert className="mt-5" type={notice.type} onClose={() => setNotice(null)}>
          {notice.text}
        </Alert>
      )}

      <Card className="mt-6 overflow-hidden">
        {!data || data.length === 0 ? (
          <EmptyState
            title="Belum ada UMKM"
            description="Tambahkan UMKM pertama kamu untuk mulai mengisi daftar."
            action={
              <Button onClick={openCreate} variant="secondary" size="sm">
                <Plus className="h-4 w-4" aria-hidden />
                Tambah UMKM
              </Button>
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <th className="px-5 py-3">Nama UMKM</th>
                  <th className="px-5 py-3">Pemilik</th>
                  <th className="hidden px-5 py-3 md:table-cell">Kapasitas</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.map((umkm) => (
                  <tr key={umkm.id} className="transition-colors hover:bg-gray-50">
                    <td className="px-5 py-3 font-medium text-gray-900">{umkm.nama}</td>
                    <td className="px-5 py-3 text-gray-600">{umkm.pemilik}</td>
                    <td className="hidden px-5 py-3 text-gray-600 md:table-cell">{umkm.kapasitas}</td>
                    <td className="px-5 py-3">
                      <Badge tone={umkm.status === 'AKTIF' ? 'green' : 'gray'}>{umkm.status}</Badge>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => openEdit(umkm)}
                          className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                          aria-label={`Edit ${umkm.nama}`}
                        >
                          <Pencil className="h-4 w-4" aria-hidden />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleting(umkm)}
                          className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
                          aria-label={`Hapus ${umkm.nama}`}
                        >
                          <Trash2 className="h-4 w-4" aria-hidden />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal
        open={modalOpen}
        title={editing ? 'Edit UMKM' : 'Tambah UMKM'}
        onClose={() => setModalOpen(false)}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <FormSection title="Data Usaha">
            <Input
              label="Nama UMKM"
              placeholder="contoh: Tempe Pak Slamet"
              error={errors.nama?.message}
              {...register('nama')}
            />
            <Input
              label="Nama Pemilik"
              placeholder="contoh: Slamet Riyadi"
              error={errors.pemilik?.message}
              {...register('pemilik')}
            />
            <Input
              label="Bergabung Sejak"
              placeholder="Januari 2024"
              error={errors.bergabungSejak?.message}
              {...register('bergabungSejak')}
            />
            <Select
              label="Status"
              options={[
                { value: 'AKTIF', label: 'Aktif' },
                { value: 'NONAKTIF', label: 'Nonaktif' },
              ]}
              error={errors.status?.message}
              {...register('status')}
            />
            <div className="sm:col-span-2">
              <Input
                label="Produk (pisahkan dengan koma)"
                placeholder="contoh: Tempe Kedelai, Tempe Gembus"
                error={errors.produk?.message}
                {...register('produk')}
              />
            </div>
          </FormSection>

          <FormSection title="Detail Usaha">
            <div className="sm:col-span-2">
              <Textarea
                label="Deskripsi"
                rows={4}
                placeholder="contoh: Usaha tempe rumahan sejak 1998. Memproduksi tempe kedelai higienis tanpa pengawet dengan kapasitas 100 kg kedelai per hari."
                error={errors.deskripsi?.message}
                {...register('deskripsi')}
              />
            </div>
            <div className="sm:col-span-2">
              <Input
                label="Alamat"
                placeholder="contoh: Kp. Bencongan, RT 01/RW 01, Kelapa Dua, Tangerang"
                error={errors.alamat?.message}
                {...register('alamat')}
              />
            </div>
            <Input
              label="No. HP"
              placeholder="contoh: 0812-3456-7890"
              error={errors.noHp?.message}
              {...register('noHp')}
            />
            <Input
              label="Kapasitas"
              placeholder="120 kg kedelai/hari"
              error={errors.kapasitas?.message}
              {...register('kapasitas')}
            />
          </FormSection>

          <FormSection title="Foto">
            <div className="sm:col-span-2">
              <ImageUpload
                label="Foto Produk (opsional)"
                value={imageUrl ?? ''}
                onChange={(v) => setValue('imageUrl', v, { shouldDirty: true })}
                ratio="aspect-[4/3]"
                hint="JPG/PNG/WebP — otomatis diperkecil saat diunggah"
              />
            </div>
          </FormSection>

          <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
              Batal
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Menyimpan...' : editing ? 'Simpan Perubahan' : 'Tambah UMKM'}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleting)}
        title="Hapus UMKM"
        message={`Yakin ingin menghapus "${deleting?.nama}"? Tindakan ini tidak dapat dibatalkan.`}
        onCancel={() => setDeleting(null)}
        onConfirm={onDelete}
      />
    </div>
  )
}
