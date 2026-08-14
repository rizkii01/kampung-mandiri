import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const SITE_URL = 'https://kampung-mandiri.vercel.app'
export const SITE_NAME = 'Kampung Mandiri Sentra Tempe'
export const SITE_TITLE = 'Sentra Tempe Bencongan — Kampung Mandiri'
export const DEFAULT_DESCRIPTION =
  'Portal digital Kampung Mandiri Sentra Tempe Bencongan, Klari, Karawang. Profil kampung tempe, daftar UMKM perajin tempe, kegiatan Karang Taruna, galeri foto, dan kontak.'

const DEFAULT_IMAGE = `${SITE_URL}/images/hero-tempe.svg`

interface SeoProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const setLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

const upsertJsonLd = (data?: SeoProps['jsonLd']) => {
  const existing = document.head.querySelector<HTMLScriptElement>('script[data-seo="jsonld"]')
  if (!data) {
    existing?.remove()
    return
  }
  const script =
    existing ??
    (() => {
      const s = document.createElement('script')
      s.type = 'application/ld+json'
      s.dataset.seo = 'jsonld'
      document.head.appendChild(s)
      return s
    })()
  script.textContent = JSON.stringify(data)
}

export default function Seo({
  title,
  description,
  keywords,
  image,
  type = 'website',
  noindex = false,
  jsonLd,
}: SeoProps) {
  const { pathname } = useLocation()
  const url = `${SITE_URL}${pathname === '/' ? '' : pathname.replace(/\/$/, '')}`

  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_TITLE
    const desc = description ?? DEFAULT_DESCRIPTION
    const img = image ?? DEFAULT_IMAGE

    document.title = fullTitle
    setMeta('name', 'description', desc)
    if (keywords) setMeta('name', 'keywords', keywords)
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
    setLink('canonical', url)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('property', 'og:image', img)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', desc)
    setMeta('name', 'twitter:image', img)
    upsertJsonLd(jsonLd)
    return () => upsertJsonLd(undefined)
  }, [title, description, keywords, image, type, noindex, jsonLd, url])

  return null
}
