'use client'

import { useState } from 'react'
import ProgressBar from '@/components/ProgressBar'
import CategoryCard from '@/components/CategoryCard'

const CATEGORIES = [
  {
    id: 'general',
    emoji: '🌿',
    label: 'Général & Quotidien',
    description: 'Activités, partage, responsabilités communes',
    badgeColor: '#10B981',
  },
  {
    id: 'relation',
    emoji: '🤝',
    label: 'Relation & Cadre',
    description: 'Flirt, intentions, type de relation, exclusivité',
    badgeColor: '#3B82F6',
  },
  {
    id: 'intimite',
    emoji: '💋',
    label: 'Intimité',
    description: 'Consentement intime, contraception, contenu',
    badgeColor: '#F59E0B',
  },
  {
    id: 'nsfw',
    emoji: '🔴',
    label: 'Pratiques spécifiques',
    description: 'Pratiques, limites, safeword',
    badge: '18+',
    badgeColor: '#EF4444',
    nsfw: true,
  },
]

export default function Step2_Category({ form, setForm, onNext }) {
  const [nsfwModal, setNsfwModal] = useState(false)

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
        <img src="/logo.png" alt="YesBoth" className="h-8 sm:h-10 w-auto flex-shrink-0" />
        <ProgressBar current={2} />
      </div>

      {/* Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#1C1C1E]">Quel type d'accord ?</h2>
        <p className="text-[#6B7280] text-sm mt-1">Choisis le niveau qui correspond à votre situation</p>
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
        <p className="text-xs text-amber-800 leading-relaxed text-center">
          ⚠️ <strong>Outil de communication uniquement.</strong> Pas un acte juridique. Chaque partie reste responsable de son consentement et de ses actes.
        </p>
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
        Suivant →
      </button>

      {/* NSFW Modal */}
      {nsfwModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-5">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-lg">
            <div className="text-center mb-4">
              <span className="text-4xl">⚠️</span>
            </div>
            <h3 className="font-bold text-[#1C1C1E] text-lg text-center mb-3">Pratiques élaborées</h3>
            <p className="text-[#6B7280] text-sm leading-relaxed text-center mb-3">
              Vous allez accéder à des pratiques intimes plus élaborées nécessitant une communication claire et des limites définies.
            </p>
            <p className="text-[#EF4444] text-sm font-semibold text-center mb-4">
              Le safeword que vous définirez prévaut sur tout document, sans exception.
            </p>
            <p className="text-xs text-[#6B7280] text-center mb-5 leading-relaxed">
              Ce document n'est <strong>pas un contrat juridique</strong>. Les parties restent entièrement responsables de leurs actes.
            </p>
            <div className="space-y-2">
              <button
                onClick={confirmNsfw}
                className="w-full py-3 rounded-full bg-[#EF4444] text-white font-semibold text-sm transition-all duration-200 ease-in-out hover:bg-red-600"
              >
                Continuer
              </button>
              <button
                onClick={() => setNsfwModal(false)}
                className="w-full py-3 rounded-full border border-[#E5E7EB] text-[#6B7280] font-semibold text-sm transition-all duration-200 ease-in-out hover:bg-gray-50"
              >
                Retour
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
