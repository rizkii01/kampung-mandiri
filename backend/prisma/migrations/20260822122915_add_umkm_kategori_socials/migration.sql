-- AlterTable
ALTER TABLE "Umkm" ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "kategori" TEXT NOT NULL DEFAULT 'UMUM',
ADD COLUMN     "mapsUrl" TEXT,
ADD COLUMN     "tiktok" TEXT,
ADD COLUMN     "whatsapp" TEXT;
