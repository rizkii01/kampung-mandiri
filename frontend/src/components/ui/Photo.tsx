import { ImageIcon } from 'lucide-react'
import { cn } from '../../lib/utils'

type Ratio = 'aspect-video' | 'aspect-square' | 'aspect-[4/3]'

interface PhotoProps {
  src?: string | null
  alt: string
  ratio?: Ratio
  className?: string
}

export default function Photo({ src, alt, ratio = 'aspect-video', className }: PhotoProps) {
  const base = cn('w-full overflow-hidden', ratio, className)

  if (src) {
    return <img src={src} alt={alt} loading="lazy" className={cn(base, 'h-full object-cover')} />
  }

  return (
    <div
      className={cn(
        base,
        'flex items-center justify-center bg-gradient-to-br from-tempe-green-50 via-tempe-cream-50 to-tempe-gold-50',
      )}
    >
      <ImageIcon className="h-8 w-8 text-tempe-green-200" aria-hidden />
    </div>
  )
}
