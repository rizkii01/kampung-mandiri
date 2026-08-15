import { Router } from 'express'
import { z } from 'zod'
import prisma from '../lib/prisma.js'
import { requireAuth, type AuthedRequest } from '../middleware/auth.js'
import { wrap, paramId } from '../lib/http.js'

const router = Router()

const newsSchema = z.object({
  judul: z.string().min(1, 'Judul wajib diisi'),
  kategori: z.string().min(1, 'Kategori wajib diisi'),
  tanggal: z.string().min(1, 'Tanggal wajib diisi'),
  penulis: z.string().min(1, 'Penulis wajib diisi'),
  ringkasan: z.string().min(1, 'Ringkasan wajib diisi'),
  konten: z.string().min(1, 'Konten wajib diisi'),
  coverUrl: z.string().nullable().optional(),
})

router.get(
  '/',
  wrap(async (_req, res) => {
    const news = await prisma.news.findMany({ orderBy: { createdAt: 'desc' } })
    return res.json(news)
  }),
)

router.get(
  '/:id',
  wrap(async (req, res) => {
    const item = await prisma.news.findUnique({ where: { id: paramId(req) } })
    if (!item) return res.status(404).json({ error: 'Berita tidak ditemukan' })
    return res.json(item)
  }),
)

router.post(
  '/',
  requireAuth,
  wrap(async (req: AuthedRequest, res) => {
    const parsed = newsSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message ?? 'Data tidak valid' })
    }
    const item = await prisma.news.create({ data: { id: `news-${Date.now()}`, ...parsed.data } })
    return res.status(201).json(item)
  }),
)

router.put(
  '/:id',
  requireAuth,
  wrap(async (req: AuthedRequest, res) => {
    const parsed = newsSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message ?? 'Data tidak valid' })
    }
    const existing = await prisma.news.findUnique({ where: { id: paramId(req) } })
    if (!existing) return res.status(404).json({ error: 'Berita tidak ditemukan' })
    const item = await prisma.news.update({ where: { id: paramId(req) }, data: parsed.data })
    return res.json(item)
  }),
)

router.delete(
  '/:id',
  requireAuth,
  wrap(async (req: AuthedRequest, res) => {
    const existing = await prisma.news.findUnique({ where: { id: paramId(req) } })
    if (!existing) return res.status(404).json({ error: 'Berita tidak ditemukan' })
    await prisma.news.delete({ where: { id: paramId(req) } })
    return res.json({ ok: true })
  }),
)

export default router
