import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

export default function Card({ hover = false, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-gray-200 bg-white shadow-card',
        hover && 'transition-shadow hover:shadow-md',
        className,
      )}
      {...props}
    />
  )
}
