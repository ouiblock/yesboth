'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import fr from './locales/fr.json'
import en from './locales/en.json'
import es from './locales/es.json'
import it from './locales/it.json'

const translations = { fr, en, es, it }

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState('fr')

  useEffect(() => {
    const saved = localStorage.getItem('yesboth_locale')
    if (saved && translations[saved]) {
      setLocale(saved)
    }
  }, [])

  const changeLocale = (newLocale) => {
    if (translations[newLocale]) {
      setLocale(newLocale)
      localStorage.setItem('yesboth_locale', newLocale)
    }
  }

  const t = (key) => {
    const keys = key.split('.')
    let value = translations[locale]
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }

  return (
    <LanguageContext.Provider value={{ locale, changeLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
