import { Router } from 'express'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import prisma from '../lib/prisma.js'
import { requireAuth, type AuthedRequest } from '../middleware/auth.js'
import { wrap } from '../lib/http.js'

const router = Router()

const JWT_SECRET = process.env.JWT_SECRET ?? 'sentra-tempe-dev-secret'

const loginSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(1, 'Password wajib diisi'),
})

router.post(
  '/login',
  wrap(async (req, res) => {
    const parsed = loginSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message ?? 'Data tidak valid' })
    }
    const email = parsed.data.email.toLowerCase()
    const admin = await prisma.admin.findUnique({ where: { email } })
    if (!admin) return res.status(401).json({ error: 'Email atau password tidak valid' })

    const valid = await bcrypt.compare(parsed.data.password, admin.password)
    if (!valid) return res.status(401).json({ error: 'Email atau password tidak valid' })

    const token = jwt.sign({ adminId: admin.id }, JWT_SECRET, { expiresIn: '7d' })
    return res.json({ token, user: { name: admin.name, email: admin.email, role: 'ADMIN' } })
  }),
)

router.get(
  '/me',
  requireAuth,
  wrap(async (req: AuthedRequest, res) => {
    const admin = await prisma.admin.findUnique({ where: { id: req.adminId } })
    if (!admin) return res.status(401).json({ error: 'Akun tidak ditemukan' })
    return res.json({ name: admin.name, email: admin.email, role: 'ADMIN' })
  }),
)

export default router
