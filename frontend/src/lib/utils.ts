import { SITE_URL } from '../components/Seo'

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

export function formatTanggal(iso: string): string {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatTanggalPendek(iso: string): string {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function resolveImageUrl(src?: string | null): string {
  if (!src) return ''
  if (/^(data:|https?:)/i.test(src)) return src
  return `${SITE_URL}${src}`
}
