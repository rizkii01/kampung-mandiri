# Rencana Implementasi: Modernisasi UI & Animasi Kampung Mandiri Sentra Tempe

Dokumen ini berisi rencana teknis untuk mendesain ulang antarmuka portal digital **Kampung Mandiri Sentra Tempe Bencongan** dengan estetika modern, premium, penuh animasi interaktif, serta tema warna yang sesuai dengan karakter sentra tempe (kombinasi warna hijau daun pisang, kuning emas kedelai, dan krem hangat).

---

## Desain & Tema Baru
- **Palette Warna Tematik**:
  - `tempe-green` (Hijau Daun): HSL `142, 60%, 20%` (primer/deep green) & `142, 70%, 40%` (accent green)
  - `soy-gold` (Kuning Kedelai): HSL `38, 92%, 50%` (kuning hangat kedelai) & `45, 93%, 47%`
  - `warm-cream` (Krem Hangat): HSL `33, 30%, 96%` (background halus untuk kesan organik)
- **Desain Modern & Glassmorphism**:
  - Border tipis semi transparan (`border-emerald-500/10` atau `border-white/20`).
  - Backdrop blur pada navigasi dan kartu melayang.
  - Ornamen berpola titik-titik (grid) atau lingkaran abstrak yang melambangkan spora fermentasi tempe.
- **Sistem Animasi (Framer Motion)**:
  - **Framer Motion Stagger**: Menampilkan list kartu UMKM dan berita secara berurutan.
  - **Framer Motion LayoutId**: Transisi tab "Berita" & "Galeri" yang mulus.
  - **Count-Up Stat**: Angka statistik (UMKM, kapasitas harian) beranimasi naik saat scroll sampai ke posisinya.
  - **Floating Elements**: Ilustrasi/ikon kecil kedelai dan daun yang melayang lambat di hero section.
  - **Page Transition**: Transisi masuk halaman baru secara meluncur dan pudar.

---

## User Review Required

> [!NOTE]
> Seluruh aset gambar bertema pembuatan tempe, kedelai, dan kehidupan desa akan dihasilkan secara otomatis menggunakan tool AI generator kami agar tampilan website tampak nyata dan profesional (bebas dari placeholder ikon rusak).

---

## Proposed Changes

### 1. Konfigurasi & Styling Global

#### [MODIFY] [tailwind.config.js](file:///d:/ProjekApp/React/sentra_tempe/frontend/tailwind.config.js)
- Menambahkan extend warna baru (`tempe-green`, `soy-gold`, `warm-cream`).
- Menambahkan konfigurasi font dan bayangan modern (`shadow-card`, `shadow-glow`).

#### [MODIFY] [index.css](file:///d:/ProjekApp/React/sentra_tempe/frontend/src/index.css)
- Menambahkan rule base background krem hangat dan gradien global.
- Menambahkan styling utility untuk grid background dan glow effect.

---

### 2. Komponen UI Shared & Layout

#### [MODIFY] [Navbar.tsx](file:///d:/ProjekApp/React/sentra_tempe/frontend/src/components/layout/Navbar.tsx)
- Mendesain ulang header menjadi model floating glassmorphic (mengambang dengan blur saat scroll ke bawah).
- Menambahkan animasi spring pada logo dan item menu.

#### [MODIFY] [Footer.tsx](file:///d:/ProjekApp/React/sentra_tempe/frontend/src/components/layout/Footer.tsx)
- Menata ulang grid footer agar lebih luas dan bersih, dengan aksen hijau-emas yang modern.

#### [MODIFY] [Button.tsx](file:///d:/ProjekApp/React/sentra_tempe/frontend/src/components/ui/Button.tsx)
- Membungkus element dengan `<motion.button>` untuk mendukung micro-interactions (efek memantul/spring saat hover & tap).

#### [MODIFY] [Card.tsx](file:///d:/ProjekApp/React/sentra_tempe/frontend/src/components/ui/Card.tsx)
- Mengubah ke `<motion.div>` dengan animasi hover scale, glow border, dan tilt halus.

#### [MODIFY] [Badge.tsx](file:///d:/ProjekApp/React/sentra_tempe/frontend/src/components/ui/Badge.tsx)
- Mempercantik varian warna dengan skema baru.

#### [MODIFY] [Spinner.tsx](file:///d:/ProjekApp/React/sentra_tempe/frontend/src/components/ui/Spinner.tsx)
- Mengganti spinner biasa dengan loader modern berbentuk kedelai berputar atau cincin gradasi hijau-emas.

---

### 3. Halaman Utama & Fitur Publik

#### [MODIFY] [LandingPage.tsx](file:///d:/ProjekApp/React/sentra_tempe/frontend/src/features/landing/LandingPage.tsx)
- Membuat Hero Section ultra modern dengan visualisasi dinamis (foto bergradasi, latar grid bergerak, elemen kedelai/daun mengambang).
- Implementasi counter angka otomatis menggunakan framer-motion `animate` ketika mendeteksi scroll masuk (`whileInView`).
- Staggered list untuk showcase UMKM dan Kegiatan terbaru.

#### [MODIFY] [ProfilePage.tsx](file:///d:/ProjekApp/React/sentra_tempe/frontend/src/features/profile/ProfilePage.tsx)
- Layout garis waktu (Timeline) interaktif untuk menceritakan Sejarah Kampung Tempe.
- Animasi bertahap untuk Visi & Misi dengan kartu modern.

#### [MODIFY] [UmkmListPage.tsx](file:///d:/ProjekApp/React/sentra_tempe/frontend/src/features/umkm/UmkmListPage.tsx) & [UmkmDetailPage.tsx](file:///d:/ProjekApp/React/sentra_tempe/frontend/src/features/umkm/UmkmDetailPage.tsx)
- Menambahkan filter kategori dengan animasi transisi list yang mulus.
- Desain detail UMKM yang mengutamakan media foto produk besar, spesifikasi kapasitas produksi, serta tombol hubungi langsung via WhatsApp dengan hover glow.

#### [MODIFY] [NewsListPage.tsx](file:///d:/ProjekApp/React/sentra_tempe/frontend/src/features/news/NewsListPage.tsx) & [NewsDetailPage.tsx](file:///d:/ProjekApp/React/sentra_tempe/frontend/src/features/news/NewsDetailPage.tsx)
- Tab transisi Berita vs Galeri menggunakan `layoutId` untuk pergerakan garis yang dinamis.
- Efek Lightbox sederhana pada galeri foto dengan transisi pop-up melayang.

#### [MODIFY] [ContactPage.tsx](file:///d:/ProjekApp/React/sentra_tempe/frontend/src/features/contact/ContactPage.tsx)
- Grid kontak dengan ikon animasi 3D dan kartu informasi interaktif.

#### [MODIFY] [LoginPage.tsx](file:///d:/ProjekApp/React/sentra_tempe/frontend/src/features/auth/LoginPage.tsx)
- Desain login modern minimalis dengan glassmorphic card berlatarkan gradasi warna kedelai dan daun.

---

### 4. Mock Data & Aset Gambar
Untuk menghilangkan placeholder kosong:
- Menghasilkan gambar bertema tempe berkualitas tinggi menggunakan tool `generate_image` dan menyimpannya di folder `frontend/public/images/`.
- Memperbarui data URL gambar di [mock.ts](file:///d:/ProjekApp/React/sentra_tempe/frontend/src/data/mock.ts) untuk merujuk pada gambar-gambar lokal yang baru dibuat.

---

## Rencana Verifikasi

### Pengujian Manual
1. Menjalankan `npm run dev` pada direktori `frontend`.
2. Menguji responsivitas layout di layar HP, Tablet, dan Desktop.
3. Memastikan semua interaksi tombol, transisi halaman, tab berita, dan dropdown berjalan lancar tanpa ada error typescript/lint.
4. Mengamati kelancaran animasi Framer Motion di browser.
5. Memvalidasi bahwa build project berhasil tanpa kendala (`npm run build`).
