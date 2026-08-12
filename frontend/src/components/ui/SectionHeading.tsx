import { cn } from '../../lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-600">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h2>
      {subtitle && <p className="mt-3 text-gray-600">{subtitle}</p>}
    </div>
  )
}
