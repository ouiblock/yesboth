'use client'

import { useLanguage } from '@/i18n/LanguageContext'
import LanguageSelector from '@/components/LanguageSelector'
import ShareBlock from '@/components/ShareBlock'
import RevokeBlock from '@/components/RevokeBlock'
import { generateMessage } from '@/utils/generateMessage'

export default function Step4_Result({ form, onBack }) {
  const { t, locale } = useLanguage()
  const message = generateMessage(form, t)

  return (
    <div className="min-h-screen flex flex-col max-w-[480px] mx-auto w-full px-5 pt-6 pb-10">
      {/* Language Selector */}
      <div className="flex justify-end mb-4">
        <LanguageSelector compact />
      </div>

      {/* Header */}
      <div className="mb-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#1A6B6B]/10 mb-3">
          <span className="text-2xl">✅</span>
        </div>
        <h2 className="text-2xl font-bold text-[#1C1C1E]">{t('step4.title')}</h2>
        <p className="text-[#6B7280] text-sm mt-1">
          {form.initiateur.prenom} & {form.partenaire.prenom} — {form.date}
        </p>
      </div>

      {/* Disclaimer banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
        <p className="text-xs text-amber-800 leading-relaxed text-center" dangerouslySetInnerHTML={{ __html: t('step4.disclaimer') }} />
      </div>

      {/* Message block */}
      <div className="bg-white border-2 border-[#1A6B6B]/30 rounded-2xl p-4 mb-5 max-h-64 overflow-y-auto scrollbar-hide shadow-sm">
        <pre className="text-xs text-[#1C1C1E] whitespace-pre-wrap font-mono leading-relaxed">{message}</pre>
      </div>

      {/* Share */}
      <div className="mb-5">
        <ShareBlock message={message} />
      </div>

      {/* Separator */}
      <div className="border-t border-[#E5E7EB] mb-5" />

      {/* Revoke block */}
      <div className="mb-6">
        <RevokeBlock form={form} />
      </div>

      {/* Legal disclaimer */}
      <div className="bg-[#F8F7F4] border border-[#E5E7EB] rounded-xl p-4 mb-5">
        <p className="text-xs text-[#6B7280] leading-relaxed" dangerouslySetInnerHTML={{ __html: t('step4.legalWarning') }} />
      </div>

      {/* Back button */}
      <button
        onClick={onBack}
        className="w-full py-3 rounded-full border border-[#E5E7EB] text-[#6B7280] text-sm font-medium transition-all duration-200 ease-in-out hover:border-[#1A6B6B] hover:text-[#1A6B6B]"
      >
        {t('step4.back')}
      </button>
    </div>
  )
}
