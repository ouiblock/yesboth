'use client'

export default function CategoryCard({ category, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 ease-in-out bg-white shadow-sm
        ${selected
          ? 'border-[#1A6B6B] bg-[#1A6B6B]/5'
          : 'border-[#E5E7EB] hover:border-[#1A6B6B]/40'
        }
      `}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="text-2xl leading-none mt-0.5">{category.emoji}</span>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-[#1C1C1E] text-sm">{category.label}</span>
              {category.badge && (
                <span
                  className="text-white text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: category.badgeColor }}
                >
                  {category.badge}
                </span>
              )}
            </div>
            <p className="text-[#6B7280] text-xs mt-0.5 leading-relaxed">{category.description}</p>
          </div>
        </div>
        {selected && (
          <div className="w-5 h-5 rounded-full bg-[#1A6B6B] flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>
    </button>
  )
}
