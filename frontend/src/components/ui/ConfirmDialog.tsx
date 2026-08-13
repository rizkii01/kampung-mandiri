import Modal from './Modal'
import Button from './Button'

interface ConfirmDialogProps {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  loading?: boolean
  onCancel: () => void
  onConfirm: () => void
}

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Hapus',
  loading = false,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} title={title} onClose={onCancel} maxWidth="max-w-sm">
      <p className="text-sm leading-relaxed text-gray-600">{message}</p>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline" onClick={onCancel} disabled={loading}>
          Batal
        </Button>
        <Button
          onClick={onConfirm}
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 focus-visible:ring-red-500"
        >
          {loading ? 'Menghapus...' : confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}
