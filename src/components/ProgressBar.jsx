'use client'

export default function ProgressBar({ current, total = 4 }) {
  return (
    <div className="flex items-center gap-0.5 sm:gap-1">
      {Array.from({ length: total }, (_, i) => {
        const step = i + 1
        const isPast = step < current
        const isActive = step === current
        return (
          <div key={step} className="flex items-center">
            <div
              className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-semibold transition-all duration-200 ease-in-out
                ${isActive ? 'bg-gradient-to-r from-[#F5A962] via-[#8B7BA8] to-[#5B9BD5] text-white' : ''}
                ${isPast ? 'bg-[#5B9BD5]/20 text-[#5B9BD5]' : ''}
                ${!isActive && !isPast ? 'bg-[#E1E8ED] text-[#8B95A1]' : ''}
              `}
            >
              {isPast ? '✓' : step}
            </div>
            {step < total && (
              <div
                className={`w-3 sm:w-5 h-0.5 mx-0.5 transition-all duration-200 ease-in-out
                  ${isPast ? 'bg-[#5B9BD5]/40' : 'bg-[#E1E8ED]'}
                `}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
