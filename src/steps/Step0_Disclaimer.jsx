'use client'

import { useState, useRef, useEffect } from 'react'

export default function Step0_Disclaimer({ onAccept }) {
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
        {/* Logo */}
        <div className="flex-shrink-0 pt-10 pb-6 px-5 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1A6B6B] mb-3">
            <span className="text-white font-bold text-xl">YB</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1A6B6B]">YesBoth</h1>
          <p className="text-[#6B7280] text-sm mt-1">Both say yes.</p>
        </div>

        {/* Scrollable content */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-5 pb-4 space-y-4 scrollbar-hide touch-pan-y overscroll-contain"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <h2 className="text-lg font-bold text-[#1C1C1E]">À lire avant d'utiliser YesBoth</h2>

          {/* Bloc 1 */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5E7EB]">
            <h3 className="font-semibold text-[#1C1C1E] text-sm mb-2">⚖️ Outil de communication</h3>
            <p className="text-[#6B7280] text-sm leading-relaxed">
              YesBoth est <strong>uniquement un outil d'aide à la communication</strong>.<br />
              Il ne constitue <strong>pas un contrat juridiquement contraignant</strong>, un acte notarié, ni un service juridique certifié.<br /><br />
              <strong>La responsabilité juridique, morale et éthique repose exclusivement sur les parties</strong> qui utilisent cet outil. YesBoth décline toute responsabilité quant à l'usage des messages générés.
            </p>
          </div>

          {/* Bloc 2 — Avertissement rouge */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
            <h3 className="font-semibold text-[#EF4444] text-sm mb-2">⚠️ Primauté du consentement oral</h3>
            <p className="text-[#1C1C1E] text-sm leading-relaxed">
              Le <strong>refus verbal, gestuel ou physique prévaut TOUJOURS</strong> sur tout document écrit, sans exception et sans délai.<br /><br />
              Le <strong>silence ne vaut pas consentement</strong>.<br />
              Un accord passé ne couvre <strong>aucun acte futur non spécifié</strong>.
            </p>
          </div>

          {/* Bloc 3 */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5E7EB]">
            <h3 className="font-semibold text-[#1C1C1E] text-sm mb-2">🔄 Révocabilité absolue</h3>
            <p className="text-[#6B7280] text-sm leading-relaxed">
              Le consentement est <strong>révocable à tout moment, immédiatement, sans justification, sans préavis</strong>.<br /><br />
              <strong>Aucune clause de ce document ne peut limiter ce droit.</strong><br />
              Chaque personne reste <strong>entièrement responsable</strong> de ses actes et décisions, indépendamment de tout document généré.
            </p>
          </div>

          {/* Bloc 4 */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5E7EB]">
            <h3 className="font-semibold text-[#1C1C1E] text-sm mb-2">🛡️ Responsabilité</h3>
            <p className="text-[#6B7280] text-sm leading-relaxed">
              YesBoth <strong>décline toute responsabilité</strong> quant à l'usage des messages générés.<br /><br />
              La responsabilité juridique, morale et éthique repose <strong>exclusivement sur les parties</strong>. Ce document est une aide à la communication entre adultes consentants, rien de plus.
            </p>
          </div>

          {/* Bloc 5 */}
          <div className="bg-[#1A6B6B]/5 border border-[#1A6B6B]/20 rounded-2xl p-4">
            <h3 className="font-semibold text-[#1A6B6B] text-sm mb-2">🔞 Majorité obligatoire</h3>
            <p className="text-[#1C1C1E] text-sm leading-relaxed">
              Cette application est <strong>strictement réservée aux personnes majeures (18 ans et plus)</strong>.<br />
              En continuant, vous certifiez avoir l'âge légal requis dans votre pays de résidence.
            </p>
          </div>

          <div className="h-2" />
          
          {/* Indicateur de fin de scroll */}
          {!scrolled && (
            <div className="sticky bottom-0 left-0 right-0 py-3 bg-gradient-to-t from-white via-white to-transparent text-center">
              <p className="text-xs font-semibold text-[#1A6B6B] animate-pulse">
                ↑ Faites défiler vers le haut pour tout lire ↑
              </p>
            </div>
          )}
        </div>

        {/* Bottom fixed actions */}
        <div className="flex-shrink-0 px-5 pb-8 pt-4 bg-[#F8F7F4] border-t border-[#E5E7EB] space-y-4">
          {!scrolled && (
            <p className="text-center text-xs text-[#6B7280]">↓ Faites défiler jusqu'en bas pour continuer</p>
          )}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={checked}
              onChange={e => setChecked(e.target.checked)}
              className="mt-0.5 w-5 h-5 rounded accent-[#1A6B6B] flex-shrink-0"
            />
            <span className="text-sm text-[#1C1C1E] leading-relaxed">
              Je suis <strong>majeur(e)</strong> et j'ai lu et accepté ces conditions. Je comprends que <strong>YesBoth n'est pas un contrat juridique</strong> et que je reste <strong>entièrement responsable</strong> de mes actes.
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
            Commencer
          </button>
        </div>
      </div>
    </div>
  )
}
