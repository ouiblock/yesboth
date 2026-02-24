'use client'

import { useState } from 'react'

const ShareButton = ({ href, label, icon, target }) => (
  <a
    href={href}
    target={target || '_blank'}
    rel="noopener noreferrer"
    className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#E5E7EB] bg-white text-sm font-medium text-[#1C1C1E] hover:border-[#1A6B6B] hover:text-[#1A6B6B] transition-all duration-200 ease-in-out shadow-sm"
  >
    <span className="w-5 h-5 flex-shrink-0">{icon}</span>
    <span>{label}</span>
  </a>
)

export default function ShareBlock({ message }) {
  const [copied, setCopied] = useState(false)
  const encoded = encodeURIComponent(message)
  const isIOS = typeof navigator !== 'undefined' && /iPhone|iPad|iPod/.test(navigator.userAgent)
  const isMobile = typeof navigator !== 'undefined' && /iPhone|Android|iPad/.test(navigator.userAgent)
  const canShare = typeof navigator !== 'undefined' && !!navigator.share

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

  const handleNativeShare = async () => {
    try {
      await navigator.share({ text: message })
    } catch {}
  }

  const shareLinks = [
    {
      label: 'WhatsApp',
      href: `https://wa.me/?text=${encoded}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      ),
    },
    {
      label: 'Telegram',
      href: `https://t.me/share/url?text=${encoded}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="#229ED9"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
      ),
    },
    {
      label: 'VK',
      href: `https://vk.com/share.php?comment=${encoded}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="#4C75A3"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1.01-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.6v1.575c0 .425-.135.68-1.253.68-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.6-.491h1.744c.449 0 .619.204.792.686.864 2.507 2.303 4.709 2.896 4.709.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.743c.373 0 .508.204.508.643v3.473c0 .373.169.508.271.508.22 0 .407-.135.813-.542 1.253-1.405 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .779.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/></svg>
      ),
    },
    {
      label: 'SMS / iMessage',
      href: isIOS ? `sms:&body=${encoded}` : `sms:?body=${encoded}`,
      target: '_self',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#1C1C1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
    },
    {
      label: 'Signal',
      href: `https://signal.me/#p/${encoded}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="#3A76F0"><path d="m9.12.35-.27 1.09a10.86 10.86 0 0 0-4.6 2.68L3.16 3.72l-.9.9 1.07.86A10.9 10.9 0 0 0 1.44 9.1L.35 9.37v1.28l1.09.27a10.9 10.9 0 0 0 2.68 4.6l-.4 1.09.9.9 1.08-1.07c1.35.91 2.9 1.47 4.55 1.59l.27 1.09h1.28l.27-1.09a10.9 10.9 0 0 0 4.6-2.68l1.09.4.9-.9-1.07-1.09a10.9 10.9 0 0 0 1.59-4.55l1.09-.27V9.6l-1.09-.27a10.9 10.9 0 0 0-2.68-4.6l.4-1.09-.9-.9-1.09 1.07A10.9 10.9 0 0 0 10.4.44L10.13.35zm.88 3.44a7.64 7.64 0 1 1 0 15.28 7.64 7.64 0 0 1 0-15.28z"/></svg>
      ),
    },
    {
      label: 'Email',
      href: `mailto:?body=${encoded}`,
      target: '_self',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#1C1C1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <polyline points="2,4 12,13 22,4"/>
        </svg>
      ),
    },
  ]

  return (
    <div className="space-y-3">
      {canShare && isMobile && (
        <button
          onClick={handleNativeShare}
          className="w-full py-3 rounded-full font-semibold text-white text-sm transition-all duration-200 ease-in-out active:scale-[0.98]"
          style={{ backgroundColor: '#FF6B5B' }}
        >
          📤 Envoyer via...
        </button>
      )}

      <div className="grid grid-cols-2 gap-2">
        {shareLinks.map((link) => (
          <ShareButton key={link.label} {...link} />
        ))}
      </div>

      <button
        onClick={handleCopy}
        className="w-full py-3 rounded-full font-semibold text-sm border border-[#E5E7EB] bg-white transition-all duration-200 ease-in-out hover:border-[#1A6B6B] hover:text-[#1A6B6B]"
      >
        {copied ? '✅ Copié !' : '📋 Copier le message'}
      </button>
    </div>
  )
}
