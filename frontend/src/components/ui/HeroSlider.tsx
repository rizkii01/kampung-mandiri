import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn, resolveImageUrl } from '../../lib/utils'

const AUTOPLAY_MS = 5000

type Ratio = 'aspect-video' | 'aspect-square' | 'aspect-[4/3]'

interface HeroSliderProps {
  images?: (string | null)[]
  alt: string
  ratio?: Ratio
  className?: string
}

export default function HeroSlider({ images = [], alt, ratio = 'aspect-video', className }: HeroSliderProps) {
  const slides = images.filter((src): src is string => Boolean(src)).map(resolveImageUrl)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    if (slides.length <= 1 || paused) return
    timer.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, AUTOPLAY_MS)
    return () => {
      if (timer.current !== null) window.clearInterval(timer.current)
    }
  }, [slides.length, paused])

  if (slides.length === 0) {
    return (
      <div
        className={cn(
          'flex w-full items-center justify-center overflow-hidden bg-gradient-to-br from-tempe-green-50 via-tempe-cream-50 to-tempe-gold-50',
          ratio,
          className,
        )}
      >
        <ImageIcon className="h-10 w-10 text-tempe-green-200" aria-hidden />
      </div>
    )
  }

  if (slides.length === 1) {
    return <img src={slides[0]} alt={alt} className={cn('w-full object-cover', ratio, className)} />
  }

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)
  const next = () => setIndex((i) => (i + 1) % slides.length)

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Gambar hero kampung"
      className={cn('group relative overflow-hidden', ratio, className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={index}
          src={slides[index]}
          alt={alt}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" aria-hidden />

      <button
        type="button"
        onClick={prev}
        aria-label="Gambar sebelumnya"
        className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-stone-700 shadow-md backdrop-blur transition-all hover:scale-105 hover:bg-white"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Gambar berikutnya"
        className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-stone-700 shadow-md backdrop-blur transition-all hover:scale-105 hover:bg-white"
      >
        <ChevronRight className="h-5 w-5" aria-hidden />
      </button>

      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Tampilkan gambar ke-${i + 1}`}
            className={cn(
              'h-2 rounded-full transition-all',
              i === index ? 'w-6 bg-white' : 'w-2 bg-white/60 hover:bg-white/90',
            )}
          />
        ))}
      </div>
    </div>
  )
}
