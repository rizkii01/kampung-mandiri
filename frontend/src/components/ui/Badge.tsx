import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

type Tone = 'green' | 'gray' | 'amber'

const tones: Record<Tone, string> = {
  green: 'bg-tempe-green-100/70 text-tempe-green-700 ring-tempe-green-600/25',
  gray: 'bg-stone-100 text-stone-600 ring-stone-400/20',
  amber: 'bg-tempe-gold-100/70 text-tempe-gold-700 ring-tempe-gold-600/25',
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
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset tracking-wide backdrop-blur-[2px]',
        'shadow-sm shadow-stone-900/5',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
