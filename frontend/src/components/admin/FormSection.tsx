import type { ReactNode } from 'react'

interface FormSectionProps {
  title: string
  hint?: string
  children: ReactNode
}

export default function FormSection({ title, hint, children }: FormSectionProps) {
  return (
    <fieldset className="rounded-2xl border border-gray-200 bg-gray-50/60 p-4 sm:p-5">
      <legend className="px-1.5 text-xs font-bold uppercase tracking-wider text-gray-500">{title}</legend>
      {hint && <p className="mb-3 text-xs leading-relaxed text-gray-400">{hint}</p>}
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </fieldset>
  )
}
