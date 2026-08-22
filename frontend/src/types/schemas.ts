import { z } from 'zod'

export const umkmSchema = z.object({
  nama: z.string().min(1, 'Nama UMKM wajib diisi'),
  pemilik: z.string().min(1, 'Nama pemilik wajib diisi'),
  deskripsi: z.string().min(1, 'Deskripsi wajib diisi'),
  alamat: z.string().min(1, 'Alamat wajib diisi'),
  noHp: z.string().min(1, 'No HP wajib diisi'),
  kapasitas: z.string().min(1, 'Kapasitas produksi wajib diisi'),
  status: z.enum(['AKTIF', 'NONAKTIF']),
  kategori: z.enum(['UMUM', 'TEMPE']),
  produk: z.string().min(1, 'Pisahkan produk dengan tanda koma'),
  bergabungSejak: z.string().min(1, 'Bergabung sejak wajib diisi'),
  imageUrl: z.string().optional(),
  whatsapp: z.string().optional(),
  instagram: z.string().optional(),
  tiktok: z.string().optional(),
  mapsUrl: z.string().optional(),
})

export type UmkmFormValues = z.infer<typeof umkmSchema>

export const newsSchema = z.object({
  judul: z.string().min(1, 'Judul wajib diisi'),
  kategori: z.string().min(1, 'Kategori wajib diisi'),
  tanggal: z.string().min(1, 'Tanggal wajib diisi'),
  penulis: z.string().min(1, 'Penulis wajib diisi'),
  ringkasan: z.string().min(1, 'Ringkasan wajib diisi'),
  konten: z.string().min(1, 'Konten wajib diisi'),
  coverUrl: z.string().optional(),
})

export type NewsFormValues = z.infer<typeof newsSchema>

export const gallerySchema = z.object({
  caption: z.string().min(1, 'Keterangan foto wajib diisi'),
  kategori: z.string().min(1, 'Kategori wajib diisi'),
  tanggal: z.string().min(1, 'Tanggal wajib diisi'),
  url: z.string().optional(),
})

export type GalleryFormValues = z.infer<typeof gallerySchema>

export const profileSchema = z.object({
  nama: z.string().min(1, 'Nama kampung wajib diisi'),
  tagline: z.string().min(1, 'Tagline wajib diisi'),
  deskripsi: z.string().min(1, 'Deskripsi wajib diisi'),
  sejarah: z.string().min(1, 'Sejarah wajib diisi'),
  visi: z.string().min(1, 'Visi wajib diisi'),
  misi: z.string().min(1, 'Misi wajib diisi (satu per baris)'),
  alamat: z.string().min(1, 'Alamat wajib diisi'),
  noHp: z.string().min(1, 'No HP wajib diisi'),
  email: z.string().email('Format email tidak valid'),
  jamOperasional: z.string().min(1, 'Jam operasional wajib diisi'),
  instagram: z.string().optional(),
  heroImageUrl: z.string().optional(),
  heroImages: z.array(z.string()).max(3).optional(),
  logoUrl: z.string().optional(),
})

export type ProfileFormValues = z.infer<typeof profileSchema>
