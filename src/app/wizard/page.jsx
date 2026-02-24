'use client'

import { useState, useEffect } from 'react'
import { LanguageProvider } from '@/i18n/LanguageContext'
import Step0_Disclaimer from '@/steps/Step0_Disclaimer'
import Step1_Parties from '@/steps/Step1_Parties'
import Step2_Category from '@/steps/Step2_Category'
import Step3_Clauses from '@/steps/Step3_Clauses'
import Step4_Result from '@/steps/Step4_Result'

const initialForm = {
  initiateur: { prenom: '', nom: '' },
  partenaire: { prenom: '', nom: '' },
  date: new Date().toLocaleDateString('fr-FR'),
  categorie: null,
  clauses: [],
  clauseLibre: '',
  safeword: '',
  validite: 'ce_soir',
}

export default function WizardPage() {
  const [step, setStep] = useState(null)
  const [form, setForm] = useState(initialForm)

  useEffect(() => {
    const seen = sessionStorage.getItem('yesboth_disclaimer')
    if (seen) setStep(1)
    else setStep(0)
  }, [])

  const handleDisclaimerAccept = () => {
    sessionStorage.setItem('yesboth_disclaimer', '1')
    setStep(1)
  }

  if (step === null) return null

  return (
    <LanguageProvider>
      <main>
        {step === 0 && <Step0_Disclaimer onAccept={handleDisclaimerAccept} />}
        {step === 1 && <Step1_Parties form={form} setForm={setForm} onNext={() => setStep(2)} />}
        {step === 2 && <Step2_Category form={form} setForm={setForm} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
        {step === 3 && <Step3_Clauses form={form} setForm={setForm} onNext={() => setStep(4)} onBack={() => setStep(2)} />}
        {step === 4 && <Step4_Result form={form} onBack={() => setStep(3)} />}
      </main>
    </LanguageProvider>
  )
}
