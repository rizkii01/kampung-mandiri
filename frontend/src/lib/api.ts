import { galleryImages, newsList, siteProfile, umkmList } from '../data/mock'
import type { GalleryImage, NewsArticle, SiteProfile, Umkm } from '../types/models'

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Service layer untuk seluruh data frontend.
 * Saat ini mengembalikan mock data; nantinya cukup mengganti implementasi
 * fungsi di bawah ini dengan pemanggilan fetch ke backend tanpa mengubah UI.
 */
export const api = {
  async getSiteProfile(): Promise<SiteProfile> {
    await delay()
    return siteProfile
  },

  async getUmkmList(): Promise<Umkm[]> {
    await delay()
    return umkmList
  },

  async getUmkmById(id: string): Promise<Umkm | null> {
    await delay(250)
    return umkmList.find((umkm) => umkm.id === id) ?? null
  },

  async getNewsList(): Promise<NewsArticle[]> {
    await delay()
    return newsList
  },

  async getNewsById(id: string): Promise<NewsArticle | null> {
    await delay(250)
    return newsList.find((news) => news.id === id) ?? null
  },

  async getGallery(): Promise<GalleryImage[]> {
    await delay()
    return galleryImages
  },
}
