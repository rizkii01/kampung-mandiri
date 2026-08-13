import { galleryImages, newsList, siteProfile, umkmList } from './mock'
import type { GalleryImage, NewsArticle, SiteProfile, Umkm } from '../types/models'

let counter = 0
export const nextId = (prefix: string) => `${prefix}-${Date.now()}-${counter++}`

export const profile: SiteProfile = { ...siteProfile }

export const umkms: Umkm[] = [...umkmList]
export const news: NewsArticle[] = [...newsList]
export const gallery: GalleryImage[] = [...galleryImages]
