'use client'

import { useLanguage } from '@/i18n/LanguageContext'

const LANGUAGES = [
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'it', label: 'IT', name: 'Italiano' },
]

export default function LanguageSelector({ compact = false }) {
  const { locale, changeLocale } = useLanguage()

  if (compact) {
    return (
      <div className="flex gap-1">
        {LANGUAGES.map(lang => (
          <button
            key={lang.code}
            onClick={() => changeLocale(lang.code)}
            className={`px-2 py-1 text-xs font-medium rounded transition-all duration-200 ease-in-out
              ${locale === lang.code
                ? 'bg-[#1A6B6B] text-white'
                : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:border-[#1A6B6B]'
              }
            `}
            title={lang.name}
          >
            {lang.label}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      {LANGUAGES.map(lang => (
        <button
          key={lang.code}
          onClick={() => changeLocale(lang.code)}
          className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out
            ${locale === lang.code
              ? 'bg-[#1A6B6B] text-white'
              : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:border-[#1A6B6B]'
            }
          `}
        >
          {lang.name}
        </button>
      ))}
    </div>
  )
}
