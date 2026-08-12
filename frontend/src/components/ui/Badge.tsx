import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

type Tone = 'green' | 'gray' | 'amber'

const tones: Record<Tone, string> = {
  green: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  gray: 'bg-gray-100 text-gray-600 ring-gray-500/20',
  amber: 'bg-amber-50 text-amber-700 ring-amber-600/20',
}

interface BadgeProps {
  tone?: Tone
  children: ReactNode
  className?: string
}

export default function Badge({ tone = 'gray', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
