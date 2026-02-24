'use client'

import ProgressBar from '@/components/ProgressBar'

export default function Step1_Parties({ form, setForm, onNext }) {
  const { initiateur, partenaire, date, lieu } = form

  const handleChange = (who, field, value) => {
    setForm(prev => ({
      ...prev,
      [who]: { ...prev[who], [field]: value }
    }))
  }

  const handleLieuChange = (value) => {
    setForm(prev => ({ ...prev, lieu: value }))
  }

  const canProceed =
    initiateur.prenom.trim() &&
    initiateur.nom.trim() &&
    partenaire.prenom.trim() &&
    partenaire.nom.trim()

  return (
    <div className="min-h-screen flex flex-col max-w-[480px] mx-auto w-full px-5 pt-6 pb-8 bg-[#F8FAFB]">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-8">
        <img src="/logo.png" alt="YesBoth" className="h-8 sm:h-10 w-auto flex-shrink-0" />
        <ProgressBar current={1} />
      </div>

      {/* Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#2C3E50]">Qui signe cet accord ?</h2>
      </div>

      {/* Form */}
      <div className="space-y-5 flex-1">
        {/* Initiateur */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5E7EB]">
          <label className="block text-sm font-semibold text-[#2C3E50] mb-2">Vous</label>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-[#6B7280] font-medium mb-1 block">Prénom *</label>
              <input
                type="text"
                value={initiateur.prenom}
                onChange={e => handleChange('initiateur', 'prenom', e.target.value)}
                placeholder="Votre prénom"
                className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F8F7F4] text-[#1C1C1E] text-sm focus:border-[#1A6B6B] transition-all duration-200 ease-in-out"
              />
            </div>
            <div>
              <label className="text-xs text-[#6B7280] font-medium mb-1 block">Nom *</label>
              <input
                type="text"
                value={initiateur.nom}
                onChange={e => handleChange('initiateur', 'nom', e.target.value)}
                placeholder="Votre nom"
                className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F8F7F4] text-[#1C1C1E] text-sm focus:border-[#1A6B6B] transition-all duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>

        {/* Partenaire */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5E7EB]">
          <label className="block text-sm font-semibold text-[#2C3E50] mb-2">L'autre personne</label>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-[#6B7280] font-medium mb-1 block">Prénom *</label>
              <input
                type="text"
                value={partenaire.prenom}
                onChange={e => handleChange('partenaire', 'prenom', e.target.value)}
                placeholder="Son prénom"
                className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F8F7F4] text-[#1C1C1E] text-sm focus:border-[#1A6B6B] transition-all duration-200 ease-in-out"
              />
            </div>
            <div>
              <label className="text-xs text-[#6B7280] font-medium mb-1 block">Nom *</label>
              <input
                type="text"
                value={partenaire.nom}
                onChange={e => handleChange('partenaire', 'nom', e.target.value)}
                placeholder="Son nom"
                className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F8F7F4] text-[#1C1C1E] text-sm focus:border-[#1A6B6B] transition-all duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>

        {/* Date et Lieu */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5E7EB]">
          <label className="block text-sm font-semibold text-[#2C3E50] mb-3">Date et Lieu</label>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-[#6B7280] font-medium mb-1 block">Date de l'accord</label>
              <p className="text-sm font-medium text-[#1C1C1E] px-4 py-3 rounded-xl bg-[#F8F7F4] border border-[#E5E7EB]">{date}</p>
            </div>
            <div>
              <label className="text-xs text-[#6B7280] font-medium mb-1 block">Lieu (optionnel)</label>
              <input
                type="text"
                value={lieu}
                onChange={e => handleLieuChange(e.target.value)}
                placeholder="Ex: Paris, Biarritz, À domicile..."
                className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F8F7F4] text-[#1C1C1E] text-sm focus:border-[#5B9BD5] focus:ring-2 focus:ring-[#5B9BD5]/20 transition-all duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer disclaimer */}
      <div className="mt-4 mb-5 bg-amber-50 border border-amber-200 rounded-xl p-3">
        <p className="text-xs text-amber-800 leading-relaxed text-center">
          ⚠️ <strong>YesBoth n'est pas un contrat juridique.</strong> Les parties restent entièrement responsables de leurs actes.
        </p>
      </div>

      <button
        disabled={!canProceed}
        onClick={onNext}
        className="w-full py-4 bg-gradient-to-r from-[#F5A962] to-[#5B9BD5] text-white font-semibold rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg active:scale-[0.98] transition-all duration-200 ease-in-out"
      >
        Suivant →
      </button>
    </div>
  )
}
