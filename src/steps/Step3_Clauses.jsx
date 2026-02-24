'use client'

import { useEffect, useState } from 'react'
import ProgressBar from '@/components/ProgressBar'
import ClauseItem from '@/components/ClauseItem'
import clausesGeneral from '@/data/clauses_general.json'
import clausesRelation from '@/data/clauses_relation.json'
import clausesIntimiite from '@/data/clauses_intimite.json'
import clausesNsfw from '@/data/clauses_nsfw.json'

const DATA_MAP = {
  general: clausesGeneral,
  relation: clausesRelation,
  intimite: clausesIntimiite,
  nsfw: clausesNsfw,
}

const VALIDITE_OPTIONS = [
  { id: 'ce_soir', label: 'Ce soir' },
  { id: '24h', label: '24h' },
  { id: '7j', label: '7 jours' },
  { id: '30j', label: '30 jours' },
  { id: 'indefini', label: 'Indéfini' },
]

export default function Step3_Clauses({ form, setForm, onNext, onBack }) {
  const clauseData = DATA_MAP[form.categorie] || []
  const [cguAccepted, setCguAccepted] = useState(false)

  useEffect(() => {
    if (form.clauses.length === 0) {
      const initial = clauseData.map(c => ({
        id: c.id,
        label: c.label,
        tristate: c.tristate || false,
        locked: c.locked || false,
        state: c.locked ? true : c.default ? true : (c.tristate ? 'maybe' : false),
      }))
      setForm(prev => ({ ...prev, clauses: initial }))
    }
  }, [form.categorie])

  const updateClause = (id, value) => {
    setForm(prev => ({
      ...prev,
      clauses: prev.clauses.map(c => c.id === id ? { ...c, state: value } : c)
    }))
  }

  const isNsfw = form.categorie === 'nsfw'
  const canProceed = (!isNsfw || form.safeword.trim().length > 0) && cguAccepted

  return (
    <div className="min-h-screen flex flex-col max-w-[480px] mx-auto w-full pt-6 pb-32">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-6 px-5">
        <img src="/logo.png" alt="YesBoth" className="h-8 sm:h-10 w-auto flex-shrink-0" />
        <ProgressBar current={3} />
      </div>

      <div className="px-5 mb-4">
        <h2 className="text-2xl font-bold text-[#1C1C1E]">Construis ton accord</h2>
        <p className="text-[#6B7280] text-sm mt-1">
          {form.initiateur.prenom} & {form.partenaire.prenom}
        </p>
      </div>

      {/* Clauses */}
      <div className="px-5 flex-1 space-y-4">
        {/* Standard clauses */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] px-4 py-2">
          {form.clauses.map(c => {
            const meta = clauseData.find(d => d.id === c.id)
            if (!meta) return null
            return (
              <ClauseItem
                key={c.id}
                clause={meta}
                value={c.state}
                onChange={(val) => updateClause(c.id, val)}
              />
            )
          })}
        </div>

        {/* NSFW Safeword */}
        {isNsfw && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
            <label className="block text-sm font-semibold text-[#EF4444] mb-2">
              🔑 Safeword <span className="text-red-400 font-normal">(obligatoire)</span>
            </label>
            <input
              type="text"
              value={form.safeword}
              onChange={e => setForm(prev => ({ ...prev, safeword: e.target.value }))}
              placeholder="ex : ananas"
              className="w-full px-4 py-3 rounded-xl border border-red-200 bg-white text-[#1C1C1E] text-sm focus:border-[#EF4444] transition-all duration-200 ease-in-out"
            />
            <p className="text-xs text-[#EF4444] mt-2 leading-relaxed">
              ⚠️ Le safeword stoppe <strong>immédiatement</strong> tout acte, sans exception. Il prévaut sur tout accord écrit.
            </p>
          </div>
        )}

        {/* Clause libre */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-4">
          <label className="block text-sm font-semibold text-[#1C1C1E] mb-2">
            📝 Clause personnalisée <span className="text-[#6B7280] font-normal">(optionnel)</span>
          </label>
          <textarea
            value={form.clauseLibre}
            onChange={e => setForm(prev => ({ ...prev, clauseLibre: e.target.value }))}
            placeholder="Ajoutez une clause spécifique à votre situation..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F8F7F4] text-[#1C1C1E] text-sm focus:border-[#1A6B6B] transition-all duration-200 ease-in-out resize-none"
          />
        </div>

        {/* Durée de validité */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-4">
          <p className="text-sm font-semibold text-[#1C1C1E] mb-3">⏱ Durée de validité</p>
          <div className="flex gap-2 flex-wrap">
            {VALIDITE_OPTIONS.map(opt => (
              <button
                key={opt.id}
                onClick={() => setForm(prev => ({ ...prev, validite: opt.id }))}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out
                  ${form.validite === opt.id
                    ? 'bg-[#1A6B6B] text-white'
                    : 'bg-[#F8F7F4] text-[#6B7280] border border-[#E5E7EB] hover:border-[#1A6B6B]'
                  }
                `}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* CGU Acceptance */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mb-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={cguAccepted}
              onChange={(e) => setCguAccepted(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <div className="flex-1">
              <p className="text-xs text-blue-900 leading-relaxed">
                <strong>J'ai lu et j'accepte les </strong>
                <a 
                  href="/cgu" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline font-medium"
                >
                  Conditions Générales d'Utilisation
                </a>
                <br />
                Je comprends que YesBoth est un outil de communication et non un contrat juridique.
              </p>
            </div>
          </label>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
          <p className="text-xs text-amber-800 leading-relaxed text-center">
            ⚠️ <strong>Rappel :</strong> Ce document est un outil de communication, non un contrat juridique. Le consentement verbal prévaut toujours. Chaque partie reste <strong>entièrement responsable</strong> de ses actes.
          </p>
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 px-5 pb-8 pt-4 bg-white/95 backdrop-blur-md border-t border-[#E1E8ED] max-w-[480px] mx-auto">
        <button
          disabled={!canProceed}
          onClick={onNext}
          className={`w-full py-4 rounded-full font-semibold text-white text-base transition-all duration-200 ease-in-out
            ${canProceed
              ? 'bg-gradient-to-r from-[#F5A962] via-[#8B7BA8] to-[#5B9BD5] active:scale-[0.98] hover:shadow-lg'
              : 'bg-[#E1E8ED] text-[#8B95A1] cursor-not-allowed'
            }
          `}
        >
          Générer le message →
        </button>
      </div>
    </div>
  )
}
