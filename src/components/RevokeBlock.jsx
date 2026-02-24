'use client'

import { useState } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'
import { generateRevoke } from '@/utils/generateRevoke'

const ShareButton = ({ href, label, icon, target }) => (
  <a
    href={href}
    target={target || '_blank'}
    rel="noopener noreferrer"
    className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-red-200 bg-white text-sm font-medium text-[#EF4444] hover:border-[#EF4444] transition-all duration-200 ease-in-out shadow-sm"
  >
    <span className="w-5 h-5 flex-shrink-0">{icon}</span>
    <span>{label}</span>
  </a>
)

export default function RevokeBlock({ form }) {
  const { t, locale } = useLanguage()
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const message = open ? generateRevoke(form, t, locale) : ''
  const encoded = encodeURIComponent(message)
  const isIOS = typeof navigator !== 'undefined' && /iPhone|iPad|iPod/.test(navigator.userAgent)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = message
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const shareLinks = [
    { label: 'WhatsApp', href: `https://wa.me/?text=${encoded}`, icon: <svg viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
    { label: 'Telegram', href: `https://t.me/share/url?text=${encoded}`, icon: <svg viewBox="0 0 24 24" fill="#229ED9"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg> },
    { label: 'SMS', href: isIOS ? `sms:&body=${encoded}` : `sms:?body=${encoded}`, target: '_self', icon: <svg viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
    { label: 'Email', href: `mailto:?body=${encoded}`, target: '_self', icon: <svg viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg> },
  ]

  return (
    <div className="rounded-2xl border border-red-200 bg-red-50/50 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left transition-all duration-200 ease-in-out"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">🔴</span>
          <span className="font-semibold text-[#EF4444] text-sm">{t('step4.revokeTitle')}</span>
        </div>
        <svg
          className={`w-4 h-4 text-[#EF4444] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-3">
          <div className="bg-white border border-red-200 rounded-2xl p-3">
            <pre className="text-xs text-[#1C1C1E] whitespace-pre-wrap font-mono leading-relaxed">{message}</pre>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {shareLinks.map((link) => (
              <ShareButton key={link.label} {...link} />
            ))}
          </div>
          <button
            onClick={handleCopy}
            className="w-full py-2.5 rounded-full font-semibold text-sm border border-red-200 bg-white text-[#EF4444] transition-all duration-200 ease-in-out hover:bg-red-50"
          >
            {copied ? t('step4.copied') : t('step4.revokeCopy')}
          </button>
        </div>
      )}
    </div>
  )
}
