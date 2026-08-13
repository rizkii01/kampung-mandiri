import { motion } from 'framer-motion'
import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from 'react'
import { cn } from '../../lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  children: ReactNode
}

const variants: Record<Variant, string> = {
  primary: 'bg-tempe-green-600 text-white hover:bg-tempe-green-700 shadow-glow hover:shadow-tempe-green-600/20 active:bg-tempe-green-800',
  secondary: 'bg-tempe-green-100 text-tempe-green-800 hover:bg-tempe-green-200',
  ghost: 'text-stone-700 hover:bg-tempe-cream-200/50 hover:text-stone-950',
  outline: 'border border-stone-300/80 bg-white/40 backdrop-blur-sm text-stone-700 hover:bg-white/80 hover:text-stone-950 hover:border-tempe-green-600/30',
}

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-4.5 py-2 text-sm rounded-xl',
  lg: 'px-6 py-3 text-base rounded-xl',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98, y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold transition-colors outline-none',
        'focus-visible:ring-2 focus-visible:ring-tempe-green-600 focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className,
      )}
      {...(props as ComponentProps<typeof motion.button>)}
    >
      {children}
    </motion.button>
  )
}
