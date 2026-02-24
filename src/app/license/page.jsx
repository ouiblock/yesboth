'use client'

import Link from 'next/link'

export default function LicensePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      <div className="max-w-[800px] mx-auto px-5 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <img src="/logo.png" alt="YesBoth" className="h-16 mx-auto" />
          </Link>
          <h1 className="text-3xl font-bold text-[#2C3E50] mb-2">License</h1>
          <p className="text-[#5A6C7D]">Proprietary License — Version 1.0</p>
        </div>

        {/* License Content */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E1E8ED]">
          <pre className="text-xs text-[#2C3E50] whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto">
{`═══════════════════════════════════════════════════════════════════════
LICENCE PROPRIÉTAIRE YESBOTH — VERSION 1.0
PROPRIETARY LICENSE YESBOTH — VERSION 1.0
═══════════════════════════════════════════════════════════════════════

Copyright © 2026 Artean Digital SAS
Tous droits réservés / All rights reserved

═══════════════════════════════════════════════════════════════════════
IDENTIFICATION DES PARTIES / PARTIES IDENTIFICATION
═══════════════════════════════════════════════════════════════════════

PROPRIÉTAIRE, DÉVELOPPEUR ET ÉDITEUR / OWNER, DEVELOPER AND PUBLISHER:
  Artean Digital SAS
  SIREN: 439 299 152 00013
  Siège social: BASK'IN, Biarritz, France
  Site web: www.arteandigital.fr
  Email: contact@arteandigital.fr

EXPLOITANT BETA / BETA OPERATOR:
  Association Herrichain (loi 1901)
  RNA: W641015204
  Exploitation à titre de test bêta uniquement
  Beta testing and operation only

═══════════════════════════════════════════════════════════════════════
ARTICLE 1 — DÉFINITIONS / ARTICLE 1 — DEFINITIONS
═══════════════════════════════════════════════════════════════════════

FR: Le « Logiciel » désigne l'application YesBoth dans son intégralité,
incluant sans limitation : le code source, le code compilé, les bases
de données, les interfaces utilisateur, les algorithmes, l'architecture
logicielle, la documentation, les traductions, les graphismes, le logo,
les fichiers de configuration, et tout élément constitutif ou dérivé,
sous quelque forme que ce soit (application web, chatbot Telegram, API,
ou toute autre forme de déploiement).

EN: "Software" means the YesBoth application in its entirety, including
without limitation: source code, compiled code, databases, user
interfaces, algorithms, software architecture, documentation,
translations, graphics, logo, configuration files, and all constituent
or derivative elements, in any form whatsoever (web application,
Telegram chatbot, API, or any other form of deployment).

═══════════════════════════════════════════════════════════════════════
ARTICLE 3 — CONCESSION DE LICENCE NON COMMERCIALE / 
ARTICLE 3 — NON-COMMERCIAL LICENSE GRANT
═══════════════════════════════════════════════════════════════════════

✅ AUTORISÉ / PERMITTED:
   - Usage personnel gratuit / Free personal use
   - Consultation du code / Code review
   - Audit de sécurité / Security audit
   - Contribution open-source / Open-source contribution

❌ INTERDIT SANS LICENCE COMMERCIALE / PROHIBITED WITHOUT COMMERCIAL LICENSE:
   - Usage commercial / Commercial use
   - Revente / Resale
   - Intégration produit / Product integration
   - Déploiement Telegram commercial / Commercial Telegram deployment
   - SaaS / Hébergement payant / SaaS / Paid hosting

📧 CONTACT COMMERCIAL / COMMERCIAL CONTACT:
   contact@arteandigital.fr
   www.arteandigital.fr

═══════════════════════════════════════════════════════════════════════
Artean Digital SAS — SIREN 439 299 152 00013
BASK'IN, Biarritz, France
© 2026 — Tous droits réservés / All rights reserved
═══════════════════════════════════════════════════════════════════════`}
          </pre>
        </div>

        {/* Download Link */}
        <div className="text-center mt-6">
          <a 
            href="/LICENSE" 
            download 
            className="inline-block px-6 py-3 bg-gradient-to-r from-[#F5A962] to-[#5B9BD5] text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all"
          >
            📄 Download Full License
          </a>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link href="/" className="inline-block px-6 py-3 bg-white text-[#5B9BD5] font-semibold rounded-full shadow-md hover:shadow-lg transition-all">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
