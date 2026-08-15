import express from 'express'
import type { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import profileRouter from './routes/profile.js'
import umkmRouter from './routes/umkm.js'
import newsRouter from './routes/news.js'
import galleryRouter from './routes/gallery.js'

const app = express()

const corsOrigins = process.env.CORS_ORIGIN?.split(',').map((o) => o.trim()).filter(Boolean)
app.use(
  cors({
    origin: corsOrigins && corsOrigins.length > 0 ? corsOrigins : true,
  }),
)
app.use(express.json({ limit: '8mb' }))

app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.use('/api/auth', authRouter)
app.use('/api/profile', profileRouter)
app.use('/api/umkm', umkmRouter)
app.use('/api/news', newsRouter)
app.use('/api/gallery', galleryRouter)

app.use((_req, res) => {
  res.status(404).json({ error: 'Endpoint tidak ditemukan' })
})

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err)
  res.status(500).json({ error: 'Terjadi kesalahan server' })
})

export default app
