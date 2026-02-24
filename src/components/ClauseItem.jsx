'use client'

export default function ClauseItem({ clause, value, onChange }) {
  const isLocked = clause.locked

  if (clause.tristate) {
    const states = ['yes', 'no', 'maybe']
    const labels = { yes: '✅ Oui', no: '❌ Non', maybe: '🟡 À discuter' }
    const colors = {
      yes: 'bg-green-50 border-green-300',
      no: 'bg-red-50 border-red-300',
      maybe: 'bg-yellow-50 border-yellow-300',
    }
    const current = value || 'maybe'

    const cycle = () => {
      const idx = states.indexOf(current)
      onChange(states[(idx + 1) % states.length])
    }

    return (
      <div className={`p-3 rounded-2xl border transition-all duration-200 ease-in-out ${colors[current]}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <p className="font-semibold text-[#1C1C1E] text-sm">{clause.label}</p>
            <p className="text-[#6B7280] text-xs mt-0.5 leading-relaxed">{clause.description}</p>
          </div>
          <button
            onClick={cycle}
            className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-200 ease-in-out bg-white/80 hover:bg-white"
          >
            {labels[current]}
          </button>
        </div>
      </div>
    )
  }

  const isOn = value === true || value === 'yes'

  return (
    <div className="flex items-start justify-between gap-3 py-3 border-b border-[#E5E7EB] last:border-0">
      <div className="flex-1">
        <p className={`font-semibold text-sm ${isLocked ? 'text-[#1A6B6B]' : 'text-[#1C1C1E]'}`}>
          {clause.label}
          {isLocked && <span className="ml-1.5 text-[10px] bg-[#1A6B6B]/10 text-[#1A6B6B] px-1.5 py-0.5 rounded-full font-medium">Obligatoire</span>}
        </p>
        <p className="text-[#6B7280] text-xs mt-0.5 leading-relaxed">{clause.description}</p>
      </div>
      <button
        onClick={() => !isLocked && onChange(!isOn)}
        disabled={isLocked}
        className={`flex-shrink-0 w-12 h-6 rounded-full transition-all duration-200 ease-in-out relative ${
          isOn ? 'bg-[#1A6B6B]' : 'bg-[#E5E7EB]'
        } ${isLocked ? 'opacity-70 cursor-default' : 'cursor-pointer'}`}
        aria-label={isOn ? 'Désactiver' : 'Activer'}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-200 ease-in-out
            ${isOn ? 'left-[calc(100%-1.375rem)]' : 'left-0.5'}
          `}
        />
      </button>
    </div>
  )
}
