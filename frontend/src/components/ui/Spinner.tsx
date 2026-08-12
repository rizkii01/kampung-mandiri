import { Loader2 } from 'lucide-react'
import { cn } from '../../lib/utils'

interface SpinnerProps {
  className?: string
  label?: string
}

export default function Spinner({ className, label = 'Memuat data...' }: SpinnerProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 py-16 text-gray-500', className)}>
      <Loader2 className="h-8 w-8 animate-spin text-emerald-600" aria-hidden />
      <p className="text-sm">{label}</p>
    </div>
  )
}
