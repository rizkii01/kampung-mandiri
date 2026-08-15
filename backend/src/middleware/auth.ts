import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET ?? 'sentra-tempe-dev-secret'

export interface AuthedRequest extends Request {
  adminId?: string
}

export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Tidak terautentikasi' })
  }
  try {
    const payload = jwt.verify(header.slice(7), JWT_SECRET) as { adminId: string }
    req.adminId = payload.adminId
    next()
  } catch {
    return res.status(401).json({ error: 'Token tidak valid atau kedaluwarsa' })
  }
}
