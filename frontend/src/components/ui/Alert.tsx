import type { ReactNode } from 'react'
import { CheckCircle2, X, XCircle } from 'lucide-react'
import { cn } from '../../lib/utils'

interface AlertProps {
  type?: 'success' | 'error'
  children: ReactNode
  onClose?: () => void
  className?: string
}

export default function Alert({ type = 'success', children, onClose, className }: AlertProps) {
  const Icon = type === 'success' ? CheckCircle2 : XCircle
  return (
    <div
      className={cn(
        'flex items-start justify-between gap-3 rounded-xl border px-4 py-3 text-sm',
        type === 'success'
          ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
          : 'border-red-200 bg-red-50 text-red-800',
        className,
      )}
      role="status"
    >
      <div className="flex items-start gap-2.5">
        <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        <span>{children}</span>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-md p-0.5 text-current opacity-60 transition-opacity hover:opacity-100"
          aria-label="Tutup"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      )}
    </div>
  )
}
