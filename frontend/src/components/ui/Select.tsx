import type { SelectHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
  options: SelectOption[]
}

export default function Select({ label, error, options, className, id, ...props }: SelectProps) {
  const selectId = id ?? props.name
  return (
    <div>
      <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={selectId}
        className={cn(
          'w-full rounded-xl border bg-white px-4 py-2.5 text-sm shadow-sm outline-none transition-colors',
          error
            ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
            : 'border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20',
          className,
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  )
}
