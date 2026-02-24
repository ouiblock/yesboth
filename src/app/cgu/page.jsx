'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { LandingProvider, useLanding } from '@/i18n/LandingContext'

const LANGS = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'it', label: 'IT' },
]

function CGUInner() {
  const { locale, changeLocale } = useLanding()
  const [content, setContent] = useState(null)

  useEffect(() => {
    import(`@/i18n/locales/cgu_${locale}.json`).then(m => setContent(m.default)).catch(() => {
      import('@/i18n/locales/cgu_fr.json').then(m => setContent(m.default))
    })
  }, [locale])

  if (!content) return null

  return (
    <div className="min-h-screen bg-[#F8FAFB] flex flex-col">
      {/* NAV */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E1E8ED] shadow-sm">
        <div className="max-w-[480px] mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/">
            <img src="/logo.png" alt="YesBoth" className="h-9" />
          </Link>
          <div className="flex gap-1">
            {LANGS.map(l => (
              <button key={l.code} onClick={() => changeLocale(l.code)}
                className={`px-2 py-1 text-[11px] font-semibold rounded-lg transition-all duration-200 ${locale === l.code ? 'bg-gradient-to-r from-[#F5A962] to-[#5B9BD5] text-white' : 'text-[#5A6C7D] hover:text-[#5B9BD5]'}`}>
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-[480px] mx-auto w-full px-5 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-block bg-gradient-to-r from-[#F5A962]/10 to-[#5B9BD5]/10 text-[#5B9BD5] text-xs font-semibold px-3 py-1 rounded-full mb-3 border border-[#5B9BD5]/20">
            Herrichain — Artean Digital
          </div>
          <h1 className="text-2xl font-bold text-[#2C3E50] mb-1">{content.title}</h1>
          <p className="text-[#5A6C7D] text-xs">{content.lastUpdate}</p>
        </div>

        {/* Warning box */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-[#F5A962]/30 rounded-2xl p-4 mb-8 shadow-sm">
          <p className="text-xs text-amber-800 leading-relaxed font-medium">
            ⚠️ {content.warningBox}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {(content.sections || []).map((section, i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#E1E8ED] p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
              <h2 className="font-bold bg-gradient-to-r from-[#F5A962] to-[#5B9BD5] bg-clip-text text-transparent text-sm mb-3 leading-snug">{section.title}</h2>
              <div className="text-[#5A6C7D] text-xs leading-relaxed whitespace-pre-line">{section.content}</div>
            </div>
          ))}
        </div>

        {/* Footer links */}
        <div className="mt-8 pt-6 border-t border-[#E5E7EB] flex gap-4 justify-center">
          <Link href="/" className="text-xs text-[#5A6C7D] hover:text-[#5B9BD5] transition-colors">← {locale === 'fr' ? 'Accueil' : locale === 'en' ? 'Home' : locale === 'es' ? 'Inicio' : 'Home'}</Link>
          <Link href="/wizard" className="text-xs bg-gradient-to-r from-[#F5A962] to-[#5B9BD5] bg-clip-text text-transparent font-semibold hover:underline">
            {locale === 'fr' ? 'Lancer l\'app →' : locale === 'en' ? 'Launch app →' : locale === 'es' ? 'Abrir app →' : 'Apri app →'}
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function CGUPage() {
  return (
    <LandingProvider>
      <CGUInner />
    </LandingProvider>
  )
}
