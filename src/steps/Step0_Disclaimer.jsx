'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'

const LANGS = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'it', label: 'IT' },
  { code: 'zh', label: '中文' },
  { code: 'ru', label: 'RU' },
  { code: 'uk', label: 'UA' },
  { code: 'ar', label: 'AR' },
]

const BLOCKS = ['tool', 'primacy', 'revocable', 'responsibility', 'age']
const BLOCK_BG = {
  tool: 'bg-white rounded-2xl p-4 shadow-sm border border-[#E5E7EB]',
  primacy: 'bg-red-50 border border-red-200 rounded-2xl p-4',
  revocable: 'bg-white rounded-2xl p-4 shadow-sm border border-[#E5E7EB]',
  responsibility: 'bg-white rounded-2xl p-4 shadow-sm border border-[#E5E7EB]',
  age: 'bg-[#1A6B6B]/5 border border-[#1A6B6B]/20 rounded-2xl p-4',
}
const TITLE_COLOR = {
  tool: 'text-[#1C1C1E]',
  primacy: 'text-[#EF4444]',
  revocable: 'text-[#1C1C1E]',
  responsibility: 'text-[#1C1C1E]',
  age: 'text-[#1A6B6B]',
}

export default function Step0_Disclaimer({ onAccept }) {
  const { t, locale, changeLocale } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [checked, setChecked] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const handleScroll = () => {
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 20
      if (atBottom) setScrolled(true)
    }
    el.addEventListener('scroll', handleScroll)
    return () => el.removeEventListener('scroll', handleScroll)
  }, [])

  const canProceed = scrolled && checked

  return (
    <div className="h-screen bg-[#F8F7F4] flex flex-col z-50">
      <div className="flex-1 flex flex-col max-w-[480px] mx-auto w-full h-full">
        {/* Logo + lang selector */}
        <div className="flex-shrink-0 pt-8 pb-4 px-5">
          <div className="flex justify-end mb-3">
            <div className="flex gap-1 flex-wrap justify-end">
              {LANGS.map(l => (
                <button
                  key={l.code}
                  onClick={() => changeLocale(l.code)}
                  className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all ${locale === l.code ? 'bg-[#1A6B6B] text-white' : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:border-[#1A6B6B]'}`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1A6B6B] mb-3">
              <span className="text-white font-bold text-xl">YB</span>
            </div>
            <h1 className="text-2xl font-bold text-[#1A6B6B]">YesBoth</h1>
            <p className="text-[#6B7280] text-sm mt-1">{t('app.tagline')}</p>
          </div>
        </div>

        {/* Scrollable content */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-5 pb-4 space-y-4 scrollbar-hide touch-pan-y overscroll-contain"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <h2 className="text-lg font-bold text-[#1C1C1E]">{t('disclaimer.title')}</h2>

          {BLOCKS.map(block => (
            <div key={block} className={BLOCK_BG[block]}>
              <h3 className={`font-semibold text-sm mb-2 ${TITLE_COLOR[block]}`}>{t(`disclaimer.blocks.${block}.title`)}</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: t(`disclaimer.blocks.${block}.content`) }} />
            </div>
          ))}

          <div className="h-2" />
          
          {!scrolled && (
            <div className="sticky bottom-0 left-0 right-0 py-3 bg-gradient-to-t from-white via-white to-transparent text-center">
              <p className="text-xs font-semibold text-[#1A6B6B] animate-pulse">
                {t('disclaimer.scrollHint')}
              </p>
            </div>
          )}
        </div>

        {/* Bottom fixed actions */}
        <div className="flex-shrink-0 px-5 pb-8 pt-4 bg-[#F8F7F4] border-t border-[#E5E7EB] space-y-4">
          {!scrolled && (
            <p className="text-center text-xs text-[#6B7280]">{t('disclaimer.scrollHint')}</p>
          )}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={checked}
              onChange={e => setChecked(e.target.checked)}
              className="mt-0.5 w-5 h-5 rounded accent-[#1A6B6B] flex-shrink-0"
            />
            <span className="text-sm text-[#1C1C1E] leading-relaxed">
              {t('disclaimer.checkbox')}
            </span>
          </label>
          <button
            disabled={!canProceed}
            onClick={onAccept}
            className={`w-full py-4 rounded-full font-semibold text-white text-base transition-all duration-200 ease-in-out
              ${canProceed
                ? 'bg-[#FF6B5B] active:scale-[0.98] hover:bg-[#ff5744]'
                : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
              }
            `}
          >
            {t('disclaimer.button')}
          </button>
        </div>
      </div>
    </div>
  )
}
