import * as db from '../data/db'
import type { GalleryImage, NewsArticle, SiteProfile, Umkm } from '../types/models'

export type UmkmInput = Omit<Umkm, 'id'>
export type NewsInput = Omit<NewsArticle, 'id'>
export type GalleryInput = Omit<GalleryImage, 'id'>

const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Service layer untuk seluruh data frontend.
 * Saat ini menggunakan penyimpanan in-memory (db.ts). Saat backend siap,
 * cukup ganti implementasi fungsi di bawah ini dengan pemanggilan fetch
 * tanpa mengubah UI.
 */
export const api = {
  async getSiteProfile(): Promise<SiteProfile> {
    await delay(250)
    return db.profile
  },

  async updateSiteProfile(data: Partial<SiteProfile>): Promise<SiteProfile> {
    await delay(500)
    Object.assign(db.profile, data)
    return db.profile
  },

  async getUmkmList(): Promise<Umkm[]> {
    await delay(250)
    return [...db.umkms]
  },

  async getUmkmById(id: string): Promise<Umkm | null> {
    await delay(150)
    return db.umkms.find((umkm) => umkm.id === id) ?? null
  },

  async createUmkm(data: UmkmInput): Promise<Umkm> {
    await delay(400)
    const item: Umkm = { id: db.nextId('umkm'), ...data }
    db.umkms.unshift(item)
    return item
  },

  async updateUmkm(id: string, data: UmkmInput): Promise<Umkm | null> {
    await delay(400)
    const index = db.umkms.findIndex((umkm) => umkm.id === id)
    if (index === -1) return null
    db.umkms[index] = { ...db.umkms[index], ...data }
    return db.umkms[index]
  },

  async deleteUmkm(id: string): Promise<boolean> {
    await delay(300)
    const index = db.umkms.findIndex((umkm) => umkm.id === id)
    if (index === -1) return false
    db.umkms.splice(index, 1)
    return true
  },

  async getNewsList(): Promise<NewsArticle[]> {
    await delay(250)
    return [...db.news]
  },

  async getNewsById(id: string): Promise<NewsArticle | null> {
    await delay(150)
    return db.news.find((item) => item.id === id) ?? null
  },

  async createNews(data: NewsInput): Promise<NewsArticle> {
    await delay(400)
    const item: NewsArticle = { id: db.nextId('news'), ...data }
    db.news.unshift(item)
    return item
  },

  async updateNews(id: string, data: NewsInput): Promise<NewsArticle | null> {
    await delay(400)
    const index = db.news.findIndex((item) => item.id === id)
    if (index === -1) return null
    db.news[index] = { ...db.news[index], ...data }
    return db.news[index]
  },

  async deleteNews(id: string): Promise<boolean> {
    await delay(300)
    const index = db.news.findIndex((item) => item.id === id)
    if (index === -1) return false
    db.news.splice(index, 1)
    return true
  },

  async getGallery(): Promise<GalleryImage[]> {
    await delay(250)
    return [...db.gallery]
  },

  async createGalleryImage(data: GalleryInput): Promise<GalleryImage> {
    await delay(400)
    const item: GalleryImage = { id: db.nextId('gal'), ...data }
    db.gallery.unshift(item)
    return item
  },

  async updateGalleryImage(id: string, data: GalleryInput): Promise<GalleryImage | null> {
    await delay(400)
    const index = db.gallery.findIndex((item) => item.id === id)
    if (index === -1) return null
    db.gallery[index] = { ...db.gallery[index], ...data }
    return db.gallery[index]
  },

  async deleteGalleryImage(id: string): Promise<boolean> {
    await delay(300)
    const index = db.gallery.findIndex((item) => item.id === id)
    if (index === -1) return false
    db.gallery.splice(index, 1)
    return true
  },
}
