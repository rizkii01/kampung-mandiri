import { Router } from 'express'
import type { SiteProfile } from '@prisma/client'
import prisma from '../lib/prisma.js'
import { requireAuth, type AuthedRequest } from '../middleware/auth.js'
import { wrap } from '../lib/http.js'

const router = Router()

const PROFILE_ID = 'profile-1'

const splitLines = (text: string | null) =>
  (text ?? '').split('\n').map((line) => line.trim()).filter(Boolean)

const toProfile = (profile: SiteProfile) => ({
  id: profile.id,
  nama: profile.nama,
  tagline: profile.tagline,
  deskripsi: profile.deskripsi,
  sejarah: profile.sejarah,
  visi: profile.visi,
  misi: splitLines(profile.misi),
  alamat: profile.alamat,
  noHp: profile.noHp,
  email: profile.email,
  jamOperasional: profile.jamOperasional,
  instagram: profile.instagram,
  heroImageUrl: profile.heroImageUrl,
  heroImages: profile.heroImages,
  logoUrl: profile.logoUrl,
})

router.get(
  '/',
  wrap(async (_req, res) => {
    const profile = await prisma.siteProfile.findUnique({ where: { id: PROFILE_ID } })
    if (!profile) return res.status(404).json({ error: 'Profil belum tersedia' })
    return res.json(toProfile(profile))
  }),
)

router.patch(
  '/',
  requireAuth,
  wrap(async (req: AuthedRequest, res) => {
    const body: Record<string, unknown> = req.body ?? {}
    const data: Record<string, unknown> = { ...body }
    if (Array.isArray(body.misi)) data.misi = (body.misi as string[]).map((m) => m.trim()).filter(Boolean).join('\n')
    else delete data.misi

    if (Array.isArray(body.heroImages)) data.heroImages = (body.heroImages as string[]).filter(Boolean).slice(0, 3)
    else delete data.heroImages

    const profile = await prisma.siteProfile.update({ where: { id: PROFILE_ID }, data })
    return res.json(toProfile(profile))
  }),
)

export default router
