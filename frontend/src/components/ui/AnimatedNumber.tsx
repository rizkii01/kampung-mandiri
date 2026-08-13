import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

interface AnimatedNumberProps {
  value: number
  suffix?: string
  suffixClassName?: string
  duration?: number
  className?: string
}

export default function AnimatedNumber({
  value,
  suffix = '',
  suffixClassName,
  duration = 1.8,
  className,
}: AnimatedNumberProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setCount(Math.round(latest)),
    })
    return () => controls.stop()
  }, [isInView, value, duration])

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix && (
        <span className={suffixClassName ?? 'ml-0.5'}>
          {suffix}
        </span>
      )}
    </span>
  )
}
