# Kampung Mandiri Sentra Tempe Bencongan

Portal profil digital "Kampung Mandiri Sentra Tempe" — program kerja Karang Taruna RW 01 Kelurahan Bencongan, Kecamatan Kelapa Dua, Kabupaten Tangerang, Provinsi Banten.

## Struktur

- `frontend/` — Website React SPA (Vite + TypeScript + Tailwind)
- `backend/` — API REST (Express + Prisma + PostgreSQL) + autentikasi admin (JWT)
- `database/` — (dipindah ke `backend/prisma/`) skema Prisma + migrasi

## Frontend

Halaman publik: Landing, Profil Kampung, UMKM, Kegiatan (berita + galeri foto), Kontak.
Halaman admin: Login, Dashboard, Profil, UMKM, Kegiatan, Galeri (CRUD).

```bash
cd frontend
npm install
npm run dev
```

Data publik diambil dari API backend. Bila API tidak dapat dijangkau, frontend otomatis memakai data statis (`src/data/mock.ts`) agar situs tetap tampil. Service layer ada di `src/lib/api.ts`; token sesi admin disimpan di `localStorage` (key `kt-token`).

## Backend

```bash
cd backend
npm install
cp .env.example .env   # isi DATABASE_URL, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
npx prisma migrate dev # terapkan skema ke database
npm run seed           # isi data awal (profil, umkm, berita, galeri, akun admin)
npm run dev            # API di http://localhost:4000
```

Endpoint utama (semua di bawah `/api`): `auth/login`, `auth/me`, `profile`, `umkm`, `news`, `gallery`. Endpoint penulisan (POST/PUT/PATCH/DELETE) butuh header `Authorization: Bearer <token>`.

## Variabel Lingkungan

### Frontend (`frontend/.env`)

| Variabel | Keterangan |
| --- | --- |
| `VITE_API_BASE_URL` | URL API di produksi, contoh `https://<nama-project>.vercel.app`. Kosong saat dev (memakai proxy Vite ke `localhost:4000`). |

### Backend (`backend/.env`)

| Variabel | Keterangan |
| --- | --- |
| `DATABASE_URL` | Koneksi PostgreSQL (Neon/Prisma, `?sslmode=require`). |
| `JWT_SECRET` | Rahasia tanda tangan token. |
| `ADMIN_EMAIL` | Email akun admin (dipakai seed). |
| `ADMIN_PASSWORD` | Password akun admin (dipakai seed). |
| `CORS_ORIGIN` | Daftar origin yang diizinkan, pisahkan koma (contoh `https://kampung-mandiri.vercel.app`). |
| `PORT` | Port lokal (default `4000`). |

## Deploy (Vercel, dua project)

1. **Frontend**: root direktori `frontend/`, build `npm run build`, output `dist`. Tambahkan env `VITE_API_BASE_URL=https://<backend-project>.vercel.app` di dashboard.
2. **Backend**: root direktori `backend/` (proyek baru dari repo yang sama). `vercel.json` sudah mengarahkan seluruh `/api*` ke entry serverless `api/index.ts`. Tambahkan env `DATABASE_URL`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `CORS_ORIGIN=https://<frontend-project>.vercel.app`.
