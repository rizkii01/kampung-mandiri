export interface SiteProfile {
  id: string
  nama: string
  tagline: string
  deskripsi: string
  sejarah: string
  visi: string
  misi: string[]
  alamat: string
  noHp: string
  email: string
  jamOperasional: string
  instagram?: string
  heroImageUrl?: string | null
  heroImages?: string[]
  logoUrl?: string | null
}

export type UmkmStatus = 'AKTIF' | 'NONAKTIF'

export interface Umkm {
  id: string
  nama: string
  pemilik: string
  deskripsi: string
  alamat: string
  noHp: string
  kapasitas: string
  status: UmkmStatus
  produk: string[]
  bergabungSejak: string
  imageUrl?: string | null
}

export interface NewsArticle {
  id: string
  judul: string
  ringkasan: string
  konten: string
  penulis: string
  tanggal: string
  kategori: string
  coverUrl?: string | null
}

export interface GalleryImage {
  id: string
  url?: string | null
  caption: string
  kategori: string
  tanggal: string
  articleId?: string | null
}
