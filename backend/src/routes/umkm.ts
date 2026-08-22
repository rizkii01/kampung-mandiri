import { Router } from 'express'
import { z } from 'zod'
import type { Umkm } from '@prisma/client'
import prisma from '../lib/prisma.js'
import { requireAuth, type AuthedRequest } from '../middleware/auth.js'
import { wrap, paramId } from '../lib/http.js'

const router = Router()

const umkmSchema = z.object({
  nama: z.string().min(1, 'Nama UMKM wajib diisi'),
  pemilik: z.string().min(1, 'Nama pemilik wajib diisi'),
  deskripsi: z.string().min(1, 'Deskripsi wajib diisi'),
  alamat: z.string().min(1, 'Alamat wajib diisi'),
  noHp: z.string().min(1, 'No HP wajib diisi'),
  kapasitas: z.string().min(1, 'Kapasitas wajib diisi'),
  status: z.enum(['AKTIF', 'NONAKTIF']),
  kategori: z.enum(['UMUM', 'TEMPE']),
  produk: z.array(z.string()).min(1, 'Produk wajib diisi'),
  bergabungSejak: z.string().min(1, 'Bergabung sejak wajib diisi'),
  imageUrl: z.string().nullable().optional(),
  whatsapp: z.string().nullable().optional(),
  instagram: z.string().nullable().optional(),
  tiktok: z.string().nullable().optional(),
  mapsUrl: z.string().nullable().optional(),
})

const splitProduk = (produk: string | null) =>
  (produk ?? '').split(',').map((p) => p.trim()).filter(Boolean)

const toUmkm = (umkm: Umkm) => ({
  id: umkm.id,
  nama: umkm.nama,
  pemilik: umkm.pemilik,
  deskripsi: umkm.deskripsi,
  alamat: umkm.alamat,
  noHp: umkm.noHp,
  kapasitas: umkm.kapasitas,
  status: umkm.status,
  kategori: umkm.kategori,
  produk: splitProduk(umkm.produk),
  bergabungSejak: umkm.bergabungSejak,
  imageUrl: umkm.imageUrl,
  whatsapp: umkm.whatsapp,
  instagram: umkm.instagram,
  tiktok: umkm.tiktok,
  mapsUrl: umkm.mapsUrl,
})

router.get(
  '/',
  wrap(async (_req, res) => {
    const umkms = await prisma.umkm.findMany({ orderBy: { createdAt: 'desc' } })
    return res.json(umkms.map(toUmkm))
  }),
)

router.get(
  '/:id',
  wrap(async (req, res) => {
    const umkm = await prisma.umkm.findUnique({ where: { id: paramId(req) } })
    if (!umkm) return res.status(404).json({ error: 'UMKM tidak ditemukan' })
    return res.json(toUmkm(umkm))
  }),
)

router.post(
  '/',
  requireAuth,
  wrap(async (req: AuthedRequest, res) => {
    const parsed = umkmSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message ?? 'Data tidak valid' })
    }
    const data = { ...parsed.data, produk: parsed.data.produk.join(', ') }
    const umkm = await prisma.umkm.create({ data: { id: `umkm-${Date.now()}`, ...data } })
    return res.status(201).json(toUmkm(umkm))
  }),
)

router.put(
  '/:id',
  requireAuth,
  wrap(async (req: AuthedRequest, res) => {
    const parsed = umkmSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message ?? 'Data tidak valid' })
    }
    const data = { ...parsed.data, produk: parsed.data.produk.join(', ') }
    const existing = await prisma.umkm.findUnique({ where: { id: paramId(req) } })
    if (!existing) return res.status(404).json({ error: 'UMKM tidak ditemukan' })
    const umkm = await prisma.umkm.update({ where: { id: paramId(req) }, data })
    return res.json(toUmkm(umkm))
  }),
)

router.delete(
  '/:id',
  requireAuth,
  wrap(async (req: AuthedRequest, res) => {
    const existing = await prisma.umkm.findUnique({ where: { id: paramId(req) } })
    if (!existing) return res.status(404).json({ error: 'UMKM tidak ditemukan' })
    await prisma.umkm.delete({ where: { id: paramId(req) } })
    return res.json({ ok: true })
  }),
)

export default router
