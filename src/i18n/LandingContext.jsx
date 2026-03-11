'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import fr from './locales/landing_fr.json'
import en from './locales/landing_en.json'
import es from './locales/landing_es.json'
import it from './locales/landing_it.json'
import zh from './locales/landing_zh.json'
import ru from './locales/landing_ru.json'
import uk from './locales/landing_uk.json'
import ar from './locales/landing_ar.json'

const translations = { fr, en, es, it, zh, ru, uk, ar }

const LandingContext = createContext()

export function LandingProvider({ children }) {
  const [locale, setLocale] = useState('fr')

  useEffect(() => {
    const saved = localStorage.getItem('yesboth_locale')
    if (saved && translations[saved]) setLocale(saved)
  }, [])

  const changeLocale = (l) => {
    if (translations[l]) {
      setLocale(l)
      localStorage.setItem('yesboth_locale', l)
    }
  }

  const t = (key) => {
    const keys = key.split('.')
    let value = translations[locale]
    for (const k of keys) value = value?.[k]
    return value || key
  }

  return (
    <LandingContext.Provider value={{ locale, changeLocale, t }}>
      {children}
    </LandingContext.Provider>
  )
}

export function useLanding() {
  return useContext(LandingContext)
}
