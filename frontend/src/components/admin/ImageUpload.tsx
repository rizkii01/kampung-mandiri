import { useRef, useState } from 'react'
import { ImagePlus, Loader2, X } from 'lucide-react'
import { cn } from '../../lib/utils'

interface ImageUploadProps {
  label: string
  value: string
  onChange: (value: string) => void
  ratio?: string
  hint?: string
  className?: string
}

const MAX_DIMENSION = 1600
const MAX_FILE_SIZE = 8 * 1024 * 1024

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Gagal membaca file'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('Format gambar tidak didukung'))
      img.onload = () => {
        const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)
        const ctx = canvas.getContext('2d')
        if (!ctx) return reject(new Error('Gambar tidak dapat diproses'))
        const mime = file.type === 'image/png' ? 'image/png' : 'image/jpeg'
        if (mime === 'image/jpeg') {
          ctx.fillStyle = '#ffffff'
          ctx.fillRect(0, 0, canvas.width, canvas.height)
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL(mime, mime === 'image/png' ? undefined : 0.82))
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  })
}

export default function ImageUpload({
  label,
  value,
  onChange,
  ratio = 'aspect-video',
  hint,
  className,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFile = async (file?: File | null) => {
    if (!file) return
    setError(null)
    if (!file.type.startsWith('image/')) {
      setError('File harus berupa gambar (JPG/PNG/WebP).')
      return
    }
    if (file.size > MAX_FILE_SIZE) {
      setError('Ukuran gambar maksimal 8 MB.')
      return
    }
    setLoading(true)
    try {
      const dataUrl = await compressImage(file)
      onChange(dataUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memproses gambar.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn('space-y-2', className)}>
      <span className="mb-1.5 block text-sm font-medium text-stone-700">{label}</span>

      {value ? (
        <div className={cn('relative w-full overflow-hidden rounded-xl border border-stone-200', ratio)}>
          <img src={value} alt="" className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-red-600"
            aria-label="Hapus gambar"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={cn(
            'flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-stone-300 bg-stone-50 text-stone-500 transition-colors hover:border-tempe-green-600 hover:bg-tempe-green-50 hover:text-tempe-green-700',
            ratio,
          )}
        >
          <ImagePlus className="h-7 w-7" aria-hidden />
          <span className="text-sm font-medium">Pilih Gambar</span>
          {hint && <span className="px-4 text-center text-xs">{hint}</span>}
        </button>
      )}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-lg bg-stone-100 px-3 py-1.5 text-xs font-semibold text-stone-700 transition-colors hover:bg-stone-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
              Memproses...
            </>
          ) : (
            <>
              <ImagePlus className="h-3.5 w-3.5" aria-hidden />
              {value ? 'Ganti Gambar' : 'Unggah'}
            </>
          )}
        </button>
        {value && (
          <span className="text-xs text-emerald-700">Gambar terpasang, otomatis diperkecil</span>
        )}
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          handleFile(e.target.files?.[0])
          e.target.value = ''
        }}
      />
    </div>
  )
}
