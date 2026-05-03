'use client'

import { useState } from 'react'
import Link from 'next/link'
import ProgressBar from '@/components/ProgressBar'
import CategoryCard from '@/components/CategoryCard'
import { useLanguage } from '@/i18n/LanguageContext'

const CATEGORY_META = [
  { id: 'general', emoji: '🌿', badgeColor: '#10B981' },
  { id: 'relation', emoji: '🤝', badgeColor: '#3B82F6' },
  { id: 'intimite', emoji: '💋', badgeColor: '#F59E0B' },
  { id: 'nsfw', emoji: '🔴', badge: '18+', badgeColor: '#EF4444', nsfw: true },
]

export default function Step2_Category({ form, setForm, onNext }) {
  const { t } = useLanguage()
  const [nsfwModal, setNsfwModal] = useState(false)

  const CATEGORIES = CATEGORY_META.map(meta => ({
    ...meta,
    label: t(`step2.categories.${meta.id}.label`),
    description: t(`step2.categories.${meta.id}.description`),
  }))

  const handleSelect = (cat) => {
    if (cat.nsfw) {
      setNsfwModal(true)
      return
    }
    setForm(prev => ({ ...prev, categorie: cat.id, clauses: [] }))
  }

  const confirmNsfw = () => {
    setNsfwModal(false)
    setForm(prev => ({ ...prev, categorie: 'nsfw', clauses: [] }))
  }

  return (
    <div className="min-h-screen flex flex-col max-w-[480px] mx-auto w-full px-5 pt-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <Link href="/">
          <img src="/logo.png" alt="YesBoth" className="h-8 sm:h-10 w-auto flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity" />
        </Link>
        <ProgressBar current={2} />
      </div>

      {/* Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#1C1C1E]">{t('step2.title')}</h2>
        <p className="text-[#6B7280] text-sm mt-1">{t('step2.subtitle')}</p>
      </div>

      {/* Categories */}
      <div className="space-y-3 flex-1">
        {CATEGORIES.map(cat => (
          <CategoryCard
            key={cat.id}
            category={cat}
            selected={form.categorie === cat.id}
            onClick={() => handleSelect(cat)}
          />
        ))}
      </div>

      {/* Footer disclaimer */}
      <div className="mt-5 mb-5 bg-amber-50 border border-amber-200 rounded-xl p-3">
        <p className="text-xs text-amber-800 leading-relaxed text-center" dangerouslySetInnerHTML={{ __html: t('step2.disclaimer') }} />
      </div>

      <button
        disabled={!form.categorie}
        onClick={onNext}
        className={`w-full py-4 rounded-full font-semibold text-white text-base transition-all duration-200 ease-in-out
          ${form.categorie
            ? 'bg-[#FF6B5B] active:scale-[0.98] hover:bg-[#ff5744]'
            : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
          }
        `}
      >
        {t('step2.next')}
      </button>

      {/* NSFW Modal */}
      {nsfwModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-5">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-lg">
            <div className="text-center mb-4">
              <span className="text-4xl">⚠️</span>
            </div>
            <h3 className="font-bold text-[#1C1C1E] text-lg text-center mb-3">{t('step2.nsfwModal.title')}</h3>
            <p className="text-[#6B7280] text-sm leading-relaxed text-center mb-3">
              {t('step2.nsfwModal.content')}
            </p>
            <p className="text-[#EF4444] text-sm font-semibold text-center mb-4">
              {t('step2.nsfwModal.safeword')}
            </p>
            <p className="text-xs text-[#6B7280] text-center mb-5 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('step2.nsfwModal.warning') }} />
            <div className="space-y-2">
              <button
                onClick={confirmNsfw}
                className="w-full py-3 rounded-full bg-[#EF4444] text-white font-semibold text-sm transition-all duration-200 ease-in-out hover:bg-red-600"
              >
                {t('step2.nsfwModal.confirm')}
              </button>
              <button
                onClick={() => setNsfwModal(false)}
                className="w-full py-3 rounded-full border border-[#E5E7EB] text-[#6B7280] font-semibold text-sm transition-all duration-200 ease-in-out hover:bg-gray-50"
              >
                {t('step2.nsfwModal.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
