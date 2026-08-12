# Kampung Mandiri Sentra Tempe Bencongan

Portal profil digital Kampung Tempe Bencongan — program kerja Karang Taruna Desa Bencongan, Klari, Karawang.

## Struktur

- `frontend/` — Website React SPA (Vite + TypeScript + Tailwind) — fase 1 selesai
- `backend/` — API (Express + Prisma) — belum dibangun
- `database/` — Skema Prisma + migrasi (PostgreSQL) — belum dibangun

## Frontend

Halaman publik: Landing, Profil Kampung, UMKM, Kegiatan (berita + galeri foto), Kontak.
Halaman admin (kerangka): Login & Dashboard.

```bash
cd frontend
npm install
npm run dev
```

Data saat ini menggunakan mock di `src/data/mock.ts`. Service layer di `src/lib/api.ts` siap dihubungkan ke backend.
