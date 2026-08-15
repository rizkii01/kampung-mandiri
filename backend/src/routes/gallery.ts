import { Router } from 'express'
import { z } from 'zod'
import prisma from '../lib/prisma'
import { requireAuth, type AuthedRequest } from '../middleware/auth'
import { wrap, paramId } from '../lib/http'

const router = Router()

const gallerySchema = z.object({
  caption: z.string().min(1, 'Keterangan foto wajib diisi'),
  kategori: z.string().min(1, 'Kategori wajib diisi'),
  tanggal: z.string().min(1, 'Tanggal wajib diisi'),
  url: z.string().nullable().optional(),
  articleId: z.string().nullable().optional(),
})

router.get(
  '/',
  wrap(async (_req, res) => {
    const gallery = await prisma.gallery.findMany({ orderBy: { createdAt: 'desc' } })
    return res.json(gallery)
  }),
)

router.post(
  '/',
  requireAuth,
  wrap(async (req: AuthedRequest, res) => {
    const parsed = gallerySchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message ?? 'Data tidak valid' })
    }
    const item = await prisma.gallery.create({ data: { id: `gal-${Date.now()}`, ...parsed.data } })
    return res.status(201).json(item)
  }),
)

router.put(
  '/:id',
  requireAuth,
  wrap(async (req: AuthedRequest, res) => {
    const parsed = gallerySchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message ?? 'Data tidak valid' })
    }
    const existing = await prisma.gallery.findUnique({ where: { id: paramId(req) } })
    if (!existing) return res.status(404).json({ error: 'Foto tidak ditemukan' })
    const item = await prisma.gallery.update({ where: { id: paramId(req) }, data: parsed.data })
    return res.json(item)
  }),
)

router.delete(
  '/:id',
  requireAuth,
  wrap(async (req: AuthedRequest, res) => {
    const existing = await prisma.gallery.findUnique({ where: { id: paramId(req) } })
    if (!existing) return res.status(404).json({ error: 'Foto tidak ditemukan' })
    await prisma.gallery.delete({ where: { id: paramId(req) } })
    return res.json({ ok: true })
  }),
)

export default router
