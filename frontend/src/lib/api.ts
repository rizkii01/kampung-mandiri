import * as db from '../data/db'
import type { GalleryImage, NewsArticle, SiteProfile, Umkm } from '../types/models'

export type UmkmInput = Omit<Umkm, 'id'>
export type NewsInput = Omit<NewsArticle, 'id'>
export type GalleryInput = Omit<GalleryImage, 'id'>

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ''
export const TOKEN_KEY = 'kt-token'

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY)

const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms))

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken()
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  })
  const text = await res.text()
  let data: unknown
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = null
  }
  if (!res.ok) {
    throw new Error((data as { error?: string } | null)?.error ?? `Permintaan gagal (${res.status})`)
  }
  if (data === null) {
    throw new Error('Respons API tidak valid')
  }
  return data as T
}

async function mutate<T>(path: string, options: RequestInit, fallback: () => Promise<T>): Promise<T> {
  try {
    return await request<T>(path, options)
  } catch {
    await delay(200)
    return fallback()
  }
}

/**
 * Service layer untuk seluruh data frontend.
 * Menggunakan API backend bila tersedia; bila tidak, kembali ke data statis.
 */
export const api = {
  async getSiteProfile(): Promise<SiteProfile> {
    try {
      return await request<SiteProfile>('/api/profile')
    } catch {
      await delay(250)
      return db.profile
    }
  },

  async updateSiteProfile(data: Partial<SiteProfile>): Promise<SiteProfile> {
    return mutate(
      '/api/profile',
      { method: 'PATCH', body: JSON.stringify(data) },
      async () => {
        await delay(300)
        Object.assign(db.profile, data)
        return db.profile
      },
    )
  },

  async getUmkmList(): Promise<Umkm[]> {
    try {
      return await request<Umkm[]>('/api/umkm')
    } catch {
      await delay(250)
      return [...db.umkms]
    }
  },

  async getUmkmById(id: string): Promise<Umkm | null> {
    try {
      return await request<Umkm>(`/api/umkm/${id}`)
    } catch {
      await delay(150)
      return db.umkms.find((umkm) => umkm.id === id) ?? null
    }
  },

  async createUmkm(data: UmkmInput): Promise<Umkm> {
    return mutate(
      '/api/umkm',
      { method: 'POST', body: JSON.stringify(data) },
      async () => {
        await delay(300)
        const item: Umkm = { id: db.nextId('umkm'), ...data }
        db.umkms.unshift(item)
        return item
      },
    )
  },

  async updateUmkm(id: string, data: UmkmInput): Promise<Umkm | null> {
    return mutate(
      `/api/umkm/${id}`,
      { method: 'PUT', body: JSON.stringify(data) },
      async () => {
        await delay(300)
        const index = db.umkms.findIndex((umkm) => umkm.id === id)
        if (index === -1) return null
        db.umkms[index] = { ...db.umkms[index], ...data }
        return db.umkms[index]
      },
    )
  },

  async deleteUmkm(id: string): Promise<boolean> {
    return mutate(
      `/api/umkm/${id}`,
      { method: 'DELETE' },
      async () => {
        await delay(200)
        const index = db.umkms.findIndex((umkm) => umkm.id === id)
        if (index === -1) return false
        db.umkms.splice(index, 1)
        return true
      },
    )
  },

  async getNewsList(): Promise<NewsArticle[]> {
    try {
      return await request<NewsArticle[]>('/api/news')
    } catch {
      await delay(250)
      return [...db.news]
    }
  },

  async getNewsById(id: string): Promise<NewsArticle | null> {
    try {
      return await request<NewsArticle>(`/api/news/${id}`)
    } catch {
      await delay(150)
      return db.news.find((item) => item.id === id) ?? null
    }
  },

  async createNews(data: NewsInput): Promise<NewsArticle> {
    return mutate(
      '/api/news',
      { method: 'POST', body: JSON.stringify(data) },
      async () => {
        await delay(300)
        const item: NewsArticle = { id: db.nextId('news'), ...data }
        db.news.unshift(item)
        return item
      },
    )
  },

  async updateNews(id: string, data: NewsInput): Promise<NewsArticle | null> {
    return mutate(
      `/api/news/${id}`,
      { method: 'PUT', body: JSON.stringify(data) },
      async () => {
        await delay(300)
        const index = db.news.findIndex((item) => item.id === id)
        if (index === -1) return null
        db.news[index] = { ...db.news[index], ...data }
        return db.news[index]
      },
    )
  },

  async deleteNews(id: string): Promise<boolean> {
    return mutate(
      `/api/news/${id}`,
      { method: 'DELETE' },
      async () => {
        await delay(200)
        const index = db.news.findIndex((item) => item.id === id)
        if (index === -1) return false
        db.news.splice(index, 1)
        return true
      },
    )
  },

  async getGallery(): Promise<GalleryImage[]> {
    try {
      return await request<GalleryImage[]>('/api/gallery')
    } catch {
      await delay(250)
      return [...db.gallery]
    }
  },

  async createGalleryImage(data: GalleryInput): Promise<GalleryImage> {
    return mutate(
      '/api/gallery',
      { method: 'POST', body: JSON.stringify(data) },
      async () => {
        await delay(300)
        const item: GalleryImage = { id: db.nextId('gal'), ...data }
        db.gallery.unshift(item)
        return item
      },
    )
  },

  async updateGalleryImage(id: string, data: GalleryInput): Promise<GalleryImage | null> {
    return mutate(
      `/api/gallery/${id}`,
      { method: 'PUT', body: JSON.stringify(data) },
      async () => {
        await delay(300)
        const index = db.gallery.findIndex((item) => item.id === id)
        if (index === -1) return null
        db.gallery[index] = { ...db.gallery[index], ...data }
        return db.gallery[index]
      },
    )
  },

  async deleteGalleryImage(id: string): Promise<boolean> {
    return mutate(
      `/api/gallery/${id}`,
      { method: 'DELETE' },
      async () => {
        await delay(200)
        const index = db.gallery.findIndex((item) => item.id === id)
        if (index === -1) return false
        db.gallery.splice(index, 1)
        return true
      },
    )
  },
}
