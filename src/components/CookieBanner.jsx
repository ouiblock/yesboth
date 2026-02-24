'use client'

import { useState, useEffect } from 'react'
import { useLanding } from '@/i18n/LandingContext'

export default function CookieBanner() {
  const { t, locale } = useLanding()
  const [visible, setVisible] = useState(false)
  const [detail, setDetail] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem('yesboth_cookies')
    if (!accepted) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('yesboth_cookies', '1')
    setVisible(false)
  }

  if (!visible) return null

  const cookieLabels = {
    fr: { title: 'Cookies & Confidentialité', accept: 'J\'accepte', detail: 'En savoir plus', close: 'Fermer', type: 'Type', purpose: 'Finalité', duration: 'Durée' },
    en: { title: 'Cookies & Privacy', accept: 'Accept', detail: 'Learn more', close: 'Close', type: 'Type', purpose: 'Purpose', duration: 'Duration' },
    es: { title: 'Cookies y Privacidad', accept: 'Aceptar', detail: 'Más información', close: 'Cerrar', type: 'Tipo', purpose: 'Finalidad', duration: 'Duración' },
    it: { title: 'Cookie e Privacy', accept: 'Accetto', detail: 'Scopri di più', close: 'Chiudi', type: 'Tipo', purpose: 'Finalità', duration: 'Durata' },
  }
  const l = cookieLabels[locale] || cookieLabels.fr
  const items = t('cookies.items')

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
      <div className="max-w-[480px] mx-auto bg-white border border-[#E1E8ED] rounded-2xl shadow-xl p-4">
        <div className="flex items-start gap-3 mb-3">
          <span className="text-2xl flex-shrink-0">🍪</span>
          <div className="flex-1">
            <p className="font-semibold text-[#2C3E50] text-sm mb-1">{l.title}</p>
            <p className="text-xs text-[#5A6C7D] leading-relaxed">{t('cookies.content')}</p>
          </div>
        </div>

        {detail && Array.isArray(items) && (
          <div className="mb-3 bg-gradient-to-br from-[#F0F4F8] to-white rounded-xl p-3 border border-[#E1E8ED]">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-[#5A6C7D]">
                  <th className="text-left pb-1 font-medium">Cookie</th>
                  <th className="text-left pb-1 font-medium">{l.purpose}</th>
                  <th className="text-left pb-1 font-medium">{l.duration}</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={i} className="border-t border-[#E1E8ED]">
                    <td className="py-1.5 font-mono text-[10px] text-[#5B9BD5]">{item.name}</td>
                    <td className="py-1.5 text-[#2C3E50]">{item.purpose}</td>
                    <td className="py-1.5 text-[#5A6C7D]">{item.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => setDetail(!detail)}
            className="flex-1 py-2 rounded-full border border-[#E1E8ED] text-[#5A6C7D] text-xs font-medium transition-all duration-200 hover:border-[#5B9BD5] hover:text-[#5B9BD5]"
          >
            {detail ? l.close : l.detail}
          </button>
          <button
            onClick={accept}
            className="flex-1 py-2 rounded-full bg-gradient-to-r from-[#F5A962] to-[#5B9BD5] text-white text-xs font-semibold transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
          >
            {l.accept}
          </button>
        </div>
      </div>
    </div>
  )
}
