import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const siteProfile = {
  id: 'profile-1',
  nama: 'Kampung Mandiri Sentra Tempe',
  tagline: 'Sentra Produksi Tempe Bencongan · RW 01, Kelapa Dua, Tangerang',
  deskripsi:
    'Kampung Mandiri Sentra Tempe merupakan kawasan kampung tempe yang berada di RW 01 Kelurahan Bencongan, Kecamatan Kelapa Dua, Kabupaten Tangerang, Provinsi Banten. Kampung Mandiri Sentra Tempe ini hanya ada di RW 01 dan dikelola oleh masyarakat. Berawal dari tradisi perajin tempe turun-temurun, kawasan ini kini berkembang menjadi sentra produksi tempe yang melibatkan puluhan unit usaha mikro, kecil, dan menengah (UMKM) dari 9 RT di lingkup RW 01.',
  sejarah:
    'Tradisi pembuatan tempe di Kelurahan Bencongan sudah ada sejak beberapa dekade lalu. Sebagian besar warga RW 01 menggantungkan hidupnya pada usaha produksi tempe yang diwariskan secara turun-temurun, mulai dari pengolahan kedelai, fermentasi, hingga distribusi ke pasar-pasar tradisional di Tangerang dan sekitarnya.\n\nDengan potensi yang besar tersebut, Karang Taruna Kelurahan Bencongan menggagas program kerja "Kampung Mandiri" yang dikhususkan untuk wilayah RW 01 yang terdiri dari 9 RT. Program ini membina, mengorganisir, dan mendigitalkan potensi UMKM tempe di kawasan tersebut, menjadikannya kampung tempe yang mandiri secara ekonomi, terorganisir dengan baik, dan dikenal luas oleh masyarakat.\n\nMelalui pendampingan produksi, peningkatan higienitas, serta pemasaran bersama, para perajin kini dapat memasarkan produknya lebih luas — tidak hanya pasar lokal, tetapi juga ke kota-kota besar di sekitar Jabodetabek.',
  visi:
    'Menjadi kampung mandiri yang unggul dalam produksi tempe berkualitas, berdaya saing, dan mampu mensejahterakan seluruh masyarakatnya.',
  misi: [
    'Membina dan memberdayakan perajin tempe melalui pendampingan usaha secara berkelanjutan.',
    'Meningkatkan kualitas, higienitas, dan standar produksi tempe kampung.',
    'Membangun pemasaran bersama untuk memperluas jangkauan produk tempe Bencongan.',
    'Mendigitalkan profil dan promosi kampung tempe agar dikenal masyarakat luas.',
    'Menumbuhkan regenerasi perajin muda melalui pembinaan Karang Taruna.',
  ].join('\n'),
  alamat: 'RW 01, Kelurahan Bencongan, Kecamatan Kelapa Dua, Kabupaten Tangerang, Provinsi Banten',
  noHp: '0812-3456-7890',
  email: 'karangtaruna.bencongan@gmail.com',
  jamOperasional: 'Senin – Minggu, 06.00 – 18.00 WIB',
  instagram: '@sentratempebencongan',
  heroImageUrl: '/images/hero-tempe.svg',
  heroImages: ['/images/hero-tempe.svg'],
  logoUrl: '/favicon.svg',
}

const umkms = [
  {
    id: 'umkm-1',
    nama: 'Tempe Pak Slamet',
    pemilik: 'Slamet Riyadi',
    deskripsi:
      'Produksi tempe kedelai dan tempe gembus setiap hari. Melayani pesanan pasar, warung, dan rumah tangga. Menjaga kualitas dengan pemilihan kedelai lokal dan proses fermentasi yang bersih.',
    alamat: 'RT 03/RW 02, Kelurahan Bencongan, Kelapa Dua, Tangerang',
    noHp: '0812-1111-2233',
    kapasitas: '120 kg kedelai/hari',
    status: 'AKTIF',
    produk: 'Tempe Kedelai, Tempe Gembus',
    bergabungSejak: 'Januari 2024',
    imageUrl: '/images/umkm-tempe-1.svg',
    createdAt: new Date('2024-06-01'),
  },
  {
    id: 'umkm-2',
    nama: 'Tempe Mbok Yati',
    pemilik: 'Yati Sumiati',
    deskripsi:
      'Usaha rumahan dengan produksi tempe kedelai yang dijemur tanpa bahan pengawet. Fokus pada pemasaran ke tetangga dan pedagang sayur keliling.',
    alamat: 'RT 01/RW 01, Kelurahan Bencongan, Kelapa Dua, Tangerang',
    noHp: '0857-2222-3344',
    kapasitas: '80 kg kedelai/hari',
    status: 'AKTIF',
    produk: 'Tempe Kedelai',
    bergabungSejak: 'Maret 2024',
    imageUrl: '/images/umkm-tempe-2.svg',
    createdAt: new Date('2024-05-01'),
  },
  {
    id: 'umkm-3',
    nama: 'Tempe Barokah',
    pemilik: 'Ahmad Fauzi',
    deskripsi:
      'Produsen tempe kedelai premium dengan kapasitas produksi terbesar di kampung. Melayani supplier dan pasar induk, serta pemesanan partai besar.',
    alamat: 'RT 05/RW 03, Kelurahan Bencongan, Kelapa Dua, Tangerang',
    noHp: '0896-3333-4455',
    kapasitas: '150 kg kedelai/hari',
    status: 'AKTIF',
    produk: 'Tempe Kedelai Premium, Tempe Bungkus',
    bergabungSejak: 'Februari 2024',
    imageUrl: '/images/activity-tempe-2.svg',
    createdAt: new Date('2024-04-01'),
  },
  {
    id: 'umkm-4',
    nama: 'Tempe Sehat Bencongan',
    pemilik: 'Siti Nurjanah',
    deskripsi:
      'Menghadirkan tempe higienis dengan proses produksi yang terstandar. Menjadi percontohan higienitas dalam program pembinaan Karang Taruna.',
    alamat: 'RT 02/RW 02, Kelurahan Bencongan, Kelapa Dua, Tangerang',
    noHp: '0821-4444-5566',
    kapasitas: '60 kg kedelai/hari',
    status: 'AKTIF',
    produk: 'Tempe Kedelai, Tempe Bumbu',
    bergabungSejak: 'April 2024',
    imageUrl: '/images/umkm-tempe-2.svg',
    createdAt: new Date('2024-03-01'),
  },
  {
    id: 'umkm-5',
    nama: 'Tempe Jaya Bersama',
    pemilik: 'Mulyadi',
    deskripsi:
      'Usaha kelompok yang dikelola bersama beberapa perajin muda binaan Karang Taruna. Memasarkan tempe ke beberapa kantin dan warung makan.',
    alamat: 'RT 04/RW 03, Kelurahan Bencongan, Kelapa Dua, Tangerang',
    noHp: '0813-5555-6677',
    kapasitas: '100 kg kedelai/hari',
    status: 'AKTIF',
    produk: 'Tempe Kedelai, Tempe Goreng Frozen',
    bergabungSejak: 'Mei 2024',
    imageUrl: '/images/activity-tempe-1.svg',
    createdAt: new Date('2024-02-01'),
  },
  {
    id: 'umkm-6',
    nama: 'Tempe Ramadhan',
    pemilik: 'Ramadhan',
    deskripsi:
      'Usaha produksi tempe dengan skala rumahan. Saat ini sedang dalam pembinaan untuk meningkatkan kualitas dan kapasitas produksi.',
    alamat: 'RT 06/RW 04, Kelurahan Bencongan, Kelapa Dua, Tangerang',
    noHp: '0859-6666-7788',
    kapasitas: '50 kg kedelai/hari',
    status: 'NONAKTIF',
    produk: 'Tempe Kedelai',
    bergabungSejak: 'Juni 2024',
    imageUrl: '/images/activity-tempe-2.svg',
    createdAt: new Date('2024-01-01'),
  },
]

const news = [
  {
    id: 'news-1',
    judul: 'Resmi Diluncurkan! Profil Digital Kampung Mandiri Sentra Tempe',
    ringkasan:
      'Karang Taruna Kelurahan Bencongan meluncurkan website profil digital kampung tempe sebagai bagian dari program kerja Kampung Mandiri.',
    konten:
      'Kelurahan Bencongan, Kelapa Dua — Karang Taruna Kelurahan Bencongan resmi meluncurkan website profil digital Kampung Mandiri Sentra Tempe. Website ini menjadi langkah awal digitalisasi potensi kampung tempe agar dikenal oleh masyarakat luas.\n\nMelalui website ini, pengunjung dapat mengenal profil kampung, melihat daftar UMKM perajin tempe, hingga berita dan dokumentasi kegiatan yang telah dilakukan. Website ini juga menjadi salah satu bentuk transparansi program kerja Karang Taruna kepada masyarakat.\n\n"Kami berharap dengan adanya profil digital ini, Kampung Tempe Bencongan semakin dikenal and para perajin semakin terbantu dalam pemasarannya," ujar perwakilan Karang Taruna.\n\nKegiatan peluncuran dihadiri oleh perangkat desa, tokoh masyarakat, dan para perajin tempe setempat.',
    penulis: 'Karang Taruna Bencongan',
    tanggal: '2026-08-01',
    kategori: 'Program Kerja',
    coverUrl: '/images/activity-tempe-1.svg',
    createdAt: new Date('2026-08-01'),
  },
  {
    id: 'news-2',
    judul: 'Panen Raya Tempe: Bencongan Pasok Ratusan Kilogram Setiap Hari',
    ringkasan:
      'Produksi tempe di Kampung Bencongan mencapai ratusan kilogram per hari dan memenuhi kebutuhan pasar di Tangerang hingga sekitarnya.',
    konten:
      'Kampung Tempe Bencongan menunjukkan kapasitas produksinya. Dari puluhan UMKM yang aktif, total produksi tempe diperkirakan mencapai ratusan kilogram kedelai per hari.\n\nProduksi tersebut didistribusikan ke pasar-pasar tradisional di Tangerang, serta melayani pesanan warung, kantin, dan supplier di kota-kota sekitar.\n\nPeningkatan produksi ini tidak lepas dari pendampingan yang dilakukan Karang Taruna, mulai dari kualitas bahan baku, proses fermentasi, hingga pemasaran bersama.\n\nKe depan, para perajin berharap produksi dapat terus meningkat dan menjangkau pasar yang lebih luas lagi.',
    penulis: 'Pengurus Karang Taruna',
    tanggal: '2026-07-18',
    kategori: 'Berita',
    coverUrl: '/images/umkm-tempe-2.svg',
    createdAt: new Date('2026-07-18'),
  },
  {
    id: 'news-3',
    judul: 'Pelatihan Higienitas Produksi Tempe untuk Perajin Muda',
    ringkasan:
      'Program pembinaan Karang Taruna menghadirkan pelatihan higienitas untuk meningkatkan kualitas produksi tempe para perajin muda.',
    konten:
      'Karang Taruna Kelurahan Bencongan menggelar pelatihan higienitas produksi tempe bagi perajin muda. Pelatihan ini bertujuan meningkatkan standar kebersihan dalam proses produksi.\n\nMateri yang diberikan meliputi pengelolaan air, kebersihan alat produksi, penyimpanan kedelai, serta proses fermentasi yang baik dan benar.\n\nPara peserta sangat antusias mengikuti pelatihan ini. Beberapa perajin mengaku mendapatkan pengetahuan baru yang sebelumnya belum diterapkan dalam usahanya.\n\nProgram ini akan berlanjut dengan pendampingan rutin dan pemantauan penerapan higienitas di setiap UMKM.',
    penulis: 'Pengurus Karang Taruna',
    tanggal: '2026-06-25',
    kategori: 'Kegiatan',
    coverUrl: '/images/activity-tempe-2.svg',
    createdAt: new Date('2026-06-25'),
  },
  {
    id: 'news-4',
    judul: 'Gelar UMKM Sentra Tempe: Raih Pembeli dari Tangerang Hingga Jakarta',
    ringkasan:
      'Gelar UMKM yang diselenggarakan Karang Taruna berhasil menarik pembeli dari berbagai kota, termasuk Jakarta dan sekitarnya.',
    konten:
      'Karang Taruna Kelurahan Bencongan menyelenggarakan Gelar UMKM Sentra Tempe yang diikuti oleh seluruh perajin binaan. Acara ini menjadi ajang promosi produk tempe kampung.\n\nPengunjung dapat membeli langsung berbagai varian tempe, mulai dari tempe kedelai, tempe gembus, hingga tempe goreng frozen.\n\nAcara ini berhasil menarik pembeli dari Tangerang hingga Jakarta. Beberapa pengunjung bahkan melakukan pemesanan rutin untuk dikirim ke luar kota.\n\nGelar UMKM akan dijadwalkan kembali secara berkala sebagai bagian dari strategi pemasaran bersama kampung tempe.',
    penulis: 'Pengurus Karang Taruna',
    tanggal: '2026-05-30',
    kategori: 'Kegiatan',
    coverUrl: '/images/activity-tempe-1.svg',
    createdAt: new Date('2026-05-30'),
  },
]

const gallery = [
  { id: 'gal-1', url: '/images/activity-tempe-1.svg', caption: 'Peluncuran profil digital Kampung Mandiri', kategori: 'Kegiatan', tanggal: '2026-08-01', articleId: 'news-1', createdAt: new Date('2026-08-01') },
  { id: 'gal-2', url: '/images/activity-tempe-2.svg', caption: 'Suasana produksi tempe pagi hari', kategori: 'Produksi', tanggal: '2026-07-20', articleId: null, createdAt: new Date('2026-07-20') },
  { id: 'gal-3', url: '/images/activity-tempe-2.svg', caption: 'Perajin muda menerima pelatihan higienitas', kategori: 'Kegiatan', tanggal: '2026-06-25', articleId: 'news-3', createdAt: new Date('2026-06-25') },
  { id: 'gal-4', url: '/images/activity-tempe-1.svg', caption: 'Gelar UMKM Sentra Tempe Bencongan', kategori: 'Kegiatan', tanggal: '2026-05-30', articleId: 'news-4', createdAt: new Date('2026-05-30') },
  { id: 'gal-5', url: '/images/umkm-tempe-2.svg', caption: 'Tempe kedelai siap distribusi', kategori: 'Produksi', tanggal: '2026-07-12', articleId: null, createdAt: new Date('2026-07-12') },
  { id: 'gal-6', url: '/images/hero-tempe.svg', caption: 'Pembinaan usaha oleh Karang Taruna', kategori: 'UMKM', tanggal: '2026-06-10', articleId: null, createdAt: new Date('2026-06-10') },
  { id: 'gal-7', url: '/images/umkm-tempe-2.svg', caption: 'Penjemuran dan fermentasi tempe', kategori: 'Produksi', tanggal: '2026-05-15', articleId: null, createdAt: new Date('2026-05-15') },
  { id: 'gal-8', url: '/images/activity-tempe-2.svg', caption: 'Kunjungan perangkat desa ke sentra produksi', kategori: 'UMKM', tanggal: '2026-07-05', articleId: null, createdAt: new Date('2026-07-05') },
]

async function main() {
  await prisma.siteProfile.createMany({ data: [siteProfile], skipDuplicates: true })
  await prisma.umkm.createMany({ data: umkms, skipDuplicates: true })
  await prisma.news.createMany({ data: news, skipDuplicates: true })
  await prisma.gallery.createMany({ data: gallery, skipDuplicates: true })

  const email = (process.env.ADMIN_EMAIL ?? 'karangtarunarw01@gmail.com').toLowerCase()
  const password = process.env.ADMIN_PASSWORD ?? 'benconganhebat'
  const existingAdmin = await prisma.admin.findUnique({ where: { email } })
  if (!existingAdmin) {
    const hashed = await bcrypt.hash(password, 10)
    await prisma.admin.create({ data: { email, password: hashed, name: 'Admin Karang Taruna' } })
    console.log('Akun admin dibuat:', email)
  } else {
    console.log('Akun admin sudah ada:', email)
  }
}

main()
  .then(() => console.log('Seed selesai.'))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
