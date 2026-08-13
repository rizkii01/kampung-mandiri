import { motion } from 'framer-motion'
import type { ComponentProps, HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

export default function Card({ hover = false, className, ...props }: CardProps) {
  const cardClassName = cn(
    'rounded-3xl border border-stone-200/50 bg-white/80 shadow-sm transition-colors duration-300',
    className,
  )

  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={cn(cardClassName, 'hover:border-tempe-green-200/80 hover:shadow-card-hover')}
        {...(props as ComponentProps<typeof motion.div>)}
      />
    )
  }

  return <div className={cardClassName} {...props} />
}
