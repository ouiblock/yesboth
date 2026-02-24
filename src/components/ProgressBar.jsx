'use client'

export default function ProgressBar({ current, total = 4 }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: total }, (_, i) => {
        const step = i + 1
        const isPast = step < current
        const isActive = step === current
        return (
          <div key={step} className="flex items-center">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-200 ease-in-out
                ${isActive ? 'bg-[#1A6B6B] text-white' : ''}
                ${isPast ? 'bg-[#1A6B6B]/20 text-[#1A6B6B]' : ''}
                ${!isActive && !isPast ? 'bg-[#E5E7EB] text-[#6B7280]' : ''}
              `}
            >
              {isPast ? '✓' : step}
            </div>
            {step < total && (
              <div
                className={`w-5 h-0.5 mx-0.5 transition-all duration-200 ease-in-out
                  ${isPast ? 'bg-[#1A6B6B]/40' : 'bg-[#E5E7EB]'}
                `}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
