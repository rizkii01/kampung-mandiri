import { cn } from '../../lib/utils'

export default function Spinner({ className }: { className?: string }) {
  return (
    <div className="flex justify-center items-center py-16">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing pulsing circle */}
        <div className="absolute h-12 w-12 rounded-full bg-tempe-green-600/10 animate-ping" />
        
        {/* Inner rotating gradient circle */}
        <svg
          className={cn('h-10 w-10 animate-spin text-tempe-green-600', className)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>

        {/* Small gold center dot representing soybean */}
        <div className="absolute h-2.5 w-2.5 rounded-full bg-tempe-gold-500 shadow-glow-gold" />
      </div>
      <span className="sr-only">Memuat data...</span>
    </div>
  )
}
