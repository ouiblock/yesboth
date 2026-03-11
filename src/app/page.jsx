'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { LandingProvider, useLanding } from '@/i18n/LandingContext'
import CookieBanner from '@/components/CookieBanner'

const LANGS = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'it', label: 'IT' },
  { code: 'zh', label: '中文' },
  { code: 'ru', label: 'RU' },
  { code: 'uk', label: 'UA' },
  { code: 'ar', label: 'AR' },
]

function LandingInner() {
  const { t, locale, changeLocale } = useLanding()
  const [consentCount, setConsentCount] = useState(1855)

  useEffect(() => {
    // Animation du compteur au chargement
    const startCount = 1800
    const endCount = 1855
    const duration = 2000
    const increment = (endCount - startCount) / (duration / 50)
    let current = startCount

    const timer = setInterval(() => {
      current += increment
      if (current >= endCount) {
        setConsentCount(endCount)
        clearInterval(timer)
      } else {
        setConsentCount(Math.floor(current))
      }
    }, 50)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#F8FAFB] flex flex-col">

      {/* NAV */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E1E8ED] shadow-sm">
        <div className="max-w-[480px] mx-auto px-5 h-14 flex items-center justify-between">
          <img src="/logo.png" alt="YesBoth" className="h-12" />
          <div className="flex items-center gap-3">
            <a 
              href="https://t.me/yesbothbot" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-[#0088cc]/10 hover:bg-[#0088cc]/20 px-2 py-1 rounded-lg transition-all duration-200"
              title="Bot Telegram"
            >
              <img src="/telegram.webp" alt="Telegram" className="w-4 h-4" />
            </a>
            <Link href="/cgu" className="text-xs text-[#5A6C7D] hover:text-[#5B9BD5] transition-colors font-medium">
              {t('nav.cgu')}
            </Link>
            <div className="flex gap-1">
              {LANGS.map(l => (
                <button
                  key={l.code}
                  onClick={() => changeLocale(l.code)}
                  className={`px-2 py-1 text-[11px] font-semibold rounded-lg transition-all duration-200
                    ${locale === l.code ? 'bg-gradient-to-r from-[#F5A962] via-[#8B7BA8] to-[#5B9BD5] text-white' : 'text-[#5A6C7D] hover:text-[#5B9BD5]'}`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1">

        {/* HERO */}
        <section className="max-w-[480px] mx-auto px-5 pt-14 pb-12 text-center">
          <div className="flex flex-col items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F5A962]/10 via-[#8B7BA8]/10 to-[#5B9BD5]/10 text-[#5B9BD5] text-xs font-semibold px-4 py-2 rounded-full border border-[#5B9BD5]/20">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#F5A962] to-[#5B9BD5] animate-pulse" />
              {t('privacy.badge')}
            </div>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-teal-50 text-[#1A6B6B] text-xs font-bold px-4 py-2 rounded-full border border-[#1A6B6B]/20">
              <span className="text-lg">🔒</span>
              <span>{consentCount.toLocaleString()} {t('consentCounter.text')}</span>
            </div>
          </div>

          <div className="flex justify-center mb-8">
            <img src="/logo.png" alt="YesBoth" className="h-80 w-auto" />
          </div>

          <h1 className="text-4xl font-bold text-[#2C3E50] leading-tight mb-4 whitespace-pre-line">
            {t('hero.headline')}
          </h1>
          <p className="text-[#5A6C7D] text-base leading-relaxed mb-8">
            {t('hero.sub')}
          </p>

          <Link
            href="/wizard"
            className="inline-flex flex-col items-center gap-1"
          >
            <span className="px-8 py-4 bg-gradient-to-r from-[#F5A962] via-[#8B7BA8] to-[#5B9BD5] text-white font-bold text-base rounded-full shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-200 inline-block">
              {t('hero.cta')}
            </span>
            <span className="text-xs text-[#8B95A1]">{t('hero.ctaSub')}</span>
          </Link>
        </section>

        {/* PLATFORMS BANNER */}
        <section className="w-full bg-white border-y border-[#E1E8ED] py-8 overflow-hidden">
          <div className="max-w-[480px] mx-auto px-5 mb-4">
            <p className="text-center text-sm font-semibold text-[#2C3E50]">
              {t('platforms.title')}
            </p>
          </div>
          <div className="relative">
            <div className="flex animate-scroll">
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex items-center gap-8 px-6 flex-shrink-0">
                  <div className="flex flex-col items-center gap-2 min-w-[70px]">
                    <div className="w-12 h-12 flex items-center justify-center text-[#000000]">
                      <img src="/ios-logo.svg" alt="iOS" className="w-10 h-10" />
                    </div>
                    <span className="text-xs font-medium text-[#5A6C7D]">iOS</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 min-w-[70px]">
                    <div className="w-12 h-12 flex items-center justify-center text-[#3DDC84]">
                      <img src="/android-logo.svg" alt="Android" className="w-10 h-10" />
                    </div>
                    <span className="text-xs font-medium text-[#5A6C7D]">Android</span>
                  </div>
                  <a href="https://t.me/yesbothbot" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 min-w-[70px] hover:scale-110 transition-transform">
                    <div className="w-12 h-12 flex items-center justify-center">
                      <img src="/telegram.webp" alt="Telegram" className="w-10 h-10" />
                    </div>
                    <span className="text-xs font-medium text-[#5A6C7D]">Telegram</span>
                  </a>
                  <div className="flex flex-col items-center gap-2 min-w-[70px]">
                    <div className="w-12 h-12 flex items-center justify-center text-[#3A76F0]">
                      <img src="/signal-logo.svg" alt="Signal" className="w-10 h-10" />
                    </div>
                    <span className="text-xs font-medium text-[#5A6C7D]">Signal</span>
                  </div>
                  <a href="https://www.messenger.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 min-w-[70px] hover:scale-110 transition-transform">
                    <div className="w-12 h-12 flex items-center justify-center text-[#0084FF]">
                      <img src="/messenger-logo.svg" alt="Messenger" className="w-10 h-10" />
                    </div>
                    <span className="text-xs font-medium text-[#5A6C7D]">Messenger</span>
                  </a>
                  <a href="https://www.wechat.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 min-w-[70px] hover:scale-110 transition-transform">
                    <div className="w-12 h-12 flex items-center justify-center text-[#09B83E]">
                      <img src="/wechat-logo.svg" alt="WeChat" className="w-10 h-10" />
                    </div>
                    <span className="text-xs font-medium text-[#5A6C7D]">WeChat</span>
                  </a>
                  <a href="https://line.me" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 min-w-[70px] hover:scale-110 transition-transform">
                    <div className="w-12 h-12 flex items-center justify-center text-[#00B900]">
                      <img src="/line-logo.svg" alt="Line" className="w-10 h-10" />
                    </div>
                    <span className="text-xs font-medium text-[#5A6C7D]">Line</span>
                  </a>
                  <a href="https://vk.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 min-w-[70px] hover:scale-110 transition-transform">
                    <div className="w-12 h-12 flex items-center justify-center text-[#0077FF]">
                      <img src="/vk-logo.svg" alt="VK" className="w-10 h-10" />
                    </div>
                    <span className="text-xs font-medium text-[#5A6C7D]">VK</span>
                  </a>
                  <a href="https://www.kik.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 min-w-[70px] hover:scale-110 transition-transform">
                    <div className="w-12 h-12 flex items-center justify-center text-[#82BC23]">
                      <img src="/kik-logo.svg" alt="Kik" className="w-10 h-10" />
                    </div>
                    <span className="text-xs font-medium text-[#5A6C7D]">Kik</span>
                  </a>
                  <a href="https://www.viber.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 min-w-[70px] hover:scale-110 transition-transform">
                    <div className="w-12 h-12 flex items-center justify-center text-[#665CAC]">
                      <img src="/viber-logo.svg" alt="Viber" className="w-10 h-10" />
                    </div>
                    <span className="text-xs font-medium text-[#5A6C7D]">Viber</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
          <style jsx>{`
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .animate-scroll {
              animation: scroll 30s linear infinite;
            }
            .animate-scroll:hover {
              animation-play-state: paused;
            }
          `}</style>
        </section>

        {/* PRIVACY SECTION */}
        <section className="bg-white border-y border-[#E1E8ED] py-12">
          <div className="max-w-[480px] mx-auto px-5">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-[#2C3E50]">{t('privacy.title')}</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(t('privacy.items') || []).map((item, i) => (
                <div key={i} className="bg-gradient-to-br from-[#F0F4F8] to-white rounded-2xl p-4 border border-[#E1E8ED] hover:border-[#5B9BD5]/30 transition-all duration-200 hover:shadow-md">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <p className="font-semibold text-[#2C3E50] text-sm mb-1">{item.title}</p>
                  <p className="text-[#5A6C7D] text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="max-w-[480px] mx-auto px-5 py-12">
          <h2 className="text-xl font-bold text-[#2C3E50] text-center mb-8">{t('howItWorks.title')}</h2>
          <div className="space-y-4">
            {(t('howItWorks.steps') || []).map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#F5A962] to-[#5B9BD5] text-white font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-md">
                  {step.num}
                </div>
                <div className="flex-1 pt-1">
                  <p className="font-semibold text-[#2C3E50] text-sm">{step.title}</p>
                  <p className="text-[#5A6C7D] text-xs mt-0.5 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* INFOGRAPHIE */}
        <section className="w-full py-8">
          <img 
            src="/Info.jpeg" 
            alt="Infographie YesBoth - Fonctionnement de l'application" 
            className="w-full h-auto"
          />
        </section>

        {/* TELEGRAM BOT SECTION */}
        <section className="max-w-[480px] mx-auto px-5 py-12">
          <div className="bg-gradient-to-br from-[#0088cc]/5 to-[#0088cc]/10 border-2 border-[#0088cc]/20 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img src="/telegram.webp" alt="Telegram" className="w-12 h-12" />
              <h2 className="text-2xl font-bold text-[#2C3E50]">
                {t('telegram.title')}
              </h2>
            </div>
            <p className="text-[#5A6C7D] text-sm text-center mb-6 leading-relaxed">
              {t('telegram.description')}
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://t.me/yesbothbot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-4 bg-[#0088cc] text-white font-bold text-base rounded-full shadow-lg hover:shadow-xl hover:bg-[#0077b3] active:scale-[0.98] transition-all duration-200"
              >
                <img src="/telegram.webp" alt="" className="w-6 h-6" />
                {t('telegram.button')}
              </a>
              <p className="text-center text-xs text-[#8B95A1]">
                {t('telegram.footer')}
              </p>
            </div>
          </div>
        </section>

        {/* DISCLAIMER BANNER */}
        <section className="max-w-[480px] mx-auto px-5 pb-10">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-[#F5A962]/30 rounded-2xl p-5 shadow-sm">
            <p className="font-bold text-amber-900 text-sm mb-2">{t('disclaimer.title')}</p>
            <p className="text-amber-800 text-xs leading-relaxed">{t('disclaimer.text')}</p>
          </div>
        </section>

        {/* CTA BOTTOM */}
        <section className="bg-gradient-to-r from-[#F5A962] via-[#8B7BA8] to-[#5B9BD5] py-12">
          <div className="max-w-[480px] mx-auto px-5 text-center">
            <div className="flex justify-center mb-6">
              <img src="/logo.png" alt="YesBoth" className="h-16 brightness-0 invert" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Both say yes</h2>
            <p className="text-[#1A6B6B]/30 text-sm mb-6 text-white/70">YesBoth</p>
            <Link
              href="/wizard"
              className="inline-block px-8 py-4 bg-white text-[#5B9BD5] font-bold text-base rounded-full shadow-lg hover:shadow-xl hover:bg-[#F8FAFB] active:scale-[0.98] transition-all duration-200"
            >
              {t('hero.cta')} →
            </Link>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#2C3E50] text-white py-8">
        <div className="max-w-[480px] mx-auto px-5 space-y-4">
          <div className="flex items-center justify-between">
            <img src="/logo.png" alt="YesBoth" className="h-8 brightness-0 invert" />
            <div className="flex gap-1">
              {LANGS.map(l => (
                <button
                  key={l.code}
                  onClick={() => changeLocale(l.code)}
                  className={`px-2 py-1 text-[11px] font-semibold rounded-lg transition-all duration-200
                    ${locale === l.code ? 'bg-gradient-to-r from-[#F5A962] to-[#5B9BD5] text-white' : 'text-white/60 hover:text-white'}`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 pt-4 space-y-2">
            <p className="text-white/60 text-xs">{t('footer.owner')}</p>
            <p className="text-white/60 text-xs">
              {t('footer.dev')}{' '}
              <a href="https://www.arteandigital.fr" target="_blank" rel="noopener noreferrer" className="text-[#F5A962] hover:underline">
                Artean Digital
              </a>
            </p>
            <p className="text-white/40 text-[11px] leading-relaxed">{t('footer.legal')}</p>
          </div>

          <div className="border-t border-white/10 pt-4 flex flex-wrap gap-4">
            <Link href="/about" className="text-white/60 text-xs hover:text-white transition-colors">
              About
            </Link>
            <Link href="/cgu" className="text-white/60 text-xs hover:text-white transition-colors">
              {t('footer.cgu')}
            </Link>
            <Link href="/privacy" className="text-white/60 text-xs hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/license" className="text-white/60 text-xs hover:text-white transition-colors">
              {t('footer.license')}
            </Link>
            <a href="https://t.me/yesbothbot" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#0088cc] text-xs hover:text-[#0099dd] transition-colors font-semibold">
              <img src="/telegram.webp" alt="" className="w-4 h-4" />
              Telegram Bot
            </a>
          </div>
        </div>
      </footer>

      <CookieBanner />
    </div>
  )
}

export default function Home() {
  return (
    <LandingProvider>
      <LandingInner />
    </LandingProvider>
  )
}
