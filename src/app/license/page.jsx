'use client'

import Link from 'next/link'

export default function LicensePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      <div className="max-w-[900px] mx-auto px-5 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <img src="/logo.png" alt="YesBoth" className="h-16 mx-auto" />
          </Link>
          <h1 className="text-3xl font-bold text-[#2C3E50] mb-2">Proprietary License</h1>
          <p className="text-[#5A6C7D] mb-1">Licence Propriétaire YesBoth — Version 1.0</p>
          <p className="text-sm text-[#8B95A1]">Copyright © 2026 Artean Digital SAS</p>
        </div>

        {/* Quick Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-green-800 mb-3">✅ Autorisé / Permitted</h3>
            <ul className="space-y-2 text-sm text-green-700">
              <li>• Usage personnel gratuit / Free personal use</li>
              <li>• Consultation du code / Code review</li>
              <li>• Audit de sécurité / Security audit</li>
              <li>• Contribution open-source / Open-source contribution</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-red-800 mb-3">❌ Interdit sans licence / Prohibited</h3>
            <ul className="space-y-2 text-sm text-red-700">
              <li>• Usage commercial / Commercial use</li>
              <li>• Revente / Resale</li>
              <li>• Intégration produit / Product integration</li>
              <li>• Déploiement Telegram commercial</li>
              <li>• SaaS / Hébergement payant</li>
            </ul>
          </div>
        </div>

        {/* Parties */}
        <section className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-[#E1E8ED]">
          <h2 className="text-2xl font-bold text-[#2C3E50] mb-6 border-b-2 border-[#5B9BD5] pb-2">
            Identification des Parties / Parties Identification
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-[#5B9BD5] mb-3">Propriétaire & Éditeur / Owner & Publisher</h3>
              <div className="bg-[#F8FAFB] rounded-xl p-4 space-y-1 text-sm">
                <p><strong>Artean Digital SAS</strong></p>
                <p>SIREN: 439 299 152 00013</p>
                <p>Siège social: BASK'IN, Biarritz, France</p>
                <p>🌐 <a href="https://arteandigital.fr" target="_blank" rel="noopener noreferrer" className="text-[#5B9BD5] hover:underline">www.arteandigital.fr</a></p>
                <p>📧 <a href="mailto:contact@arteandigital.fr" className="text-[#5B9BD5] hover:underline">contact@arteandigital.fr</a></p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-[#5B9BD5] mb-3">Exploitant Beta / Beta Operator</h3>
              <div className="bg-[#F8FAFB] rounded-xl p-4 space-y-1 text-sm">
                <p><strong>Association Herrichain</strong> (loi 1901)</p>
                <p>RNA: W641015204</p>
                <p className="text-xs text-[#8B95A1] italic mt-2">Exploitation à titre de test bêta uniquement / Beta testing and operation only</p>
              </div>
            </div>
          </div>
        </section>

        {/* Article 1 - Définitions */}
        <section className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-[#E1E8ED]">
          <h2 className="text-2xl font-bold text-[#2C3E50] mb-4 border-b-2 border-[#5B9BD5] pb-2">
            Article 1 — Définitions / Definitions
          </h2>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-[#2C3E50] mb-2">Le « Logiciel » / "Software"</h4>
              <p className="text-sm text-[#5A6C7D] leading-relaxed mb-2">
                <strong>FR:</strong> Le « Logiciel » désigne l'application YesBoth dans son intégralité, 
                incluant sans limitation : le code source, le code compilé, les bases de données, 
                les interfaces utilisateur, les algorithmes, l'architecture logicielle, la documentation, 
                les traductions, les graphismes, le logo, les fichiers de configuration, et tout élément 
                constitutif ou dérivé, sous quelque forme que ce soit (application web, chatbot Telegram, 
                API, ou toute autre forme de déploiement).
              </p>
              <p className="text-sm text-[#5A6C7D] leading-relaxed">
                <strong>EN:</strong> "Software" means the YesBoth application in its entirety, including 
                without limitation: source code, compiled code, databases, user interfaces, algorithms, 
                software architecture, documentation, translations, graphics, logo, configuration files, 
                and all constituent or derivative elements, in any form whatsoever (web application, 
                Telegram chatbot, API, or any other form of deployment).
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-[#2C3E50] mb-2">« Usage Commercial » / "Commercial Use"</h4>
              <p className="text-sm text-[#5A6C7D] leading-relaxed mb-2">
                <strong>FR:</strong> « Usage Commercial » désigne toute utilisation du Logiciel à des fins 
                lucratives ou dans un contexte professionnel, incluant notamment : l'intégration dans des 
                produits ou services commerciaux, l'exploitation en mode SaaS ou hébergement payant, la 
                revente, location ou concession de licence, l'utilisation en entreprise ou organisation à 
                but lucratif, le déploiement sur des plateformes commerciales (Telegram, etc.), la 
                monétisation directe ou indirecte.
              </p>
              <p className="text-sm text-[#5A6C7D] leading-relaxed">
                <strong>EN:</strong> "Commercial Use" means any use of the Software for profit or in a 
                professional context, including but not limited to: integration into commercial products 
                or services, SaaS operation or paid hosting, resale, rental or sublicensing, use in 
                for-profit businesses or organizations, deployment on commercial platforms (Telegram, etc.), 
                direct or indirect monetization.
              </p>
            </div>
          </div>
        </section>

        {/* Article 2 - Propriété Intellectuelle */}
        <section className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-[#E1E8ED]">
          <h2 className="text-2xl font-bold text-[#2C3E50] mb-4 border-b-2 border-[#5B9BD5] pb-2">
            Article 2 — Propriété Intellectuelle / Intellectual Property
          </h2>
          
          <p className="text-sm text-[#5A6C7D] leading-relaxed mb-4">
            <strong>FR:</strong> Artean Digital SAS est le propriétaire exclusif et unique de l'intégralité 
            des droits de propriété intellectuelle sur le Logiciel, conformément aux dispositions du Code 
            de la Propriété Intellectuelle français (loi n° 92-597 du 1er juillet 1992) et des conventions 
            internationales applicables (Convention de Berne, Accord ADPIC).
          </p>
          
          <p className="text-sm text-[#5A6C7D] leading-relaxed mb-4">
            <strong>EN:</strong> Artean Digital SAS is the sole and exclusive owner of all intellectual 
            property rights in the Software, in accordance with the provisions of the French Intellectual 
            Property Code (Law No. 92-597 of July 1, 1992) and applicable international conventions 
            (Berne Convention, TRIPS Agreement).
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="font-semibold text-blue-800 mb-2">Droits inclus / Rights included:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Droits d'auteur / Copyright (Articles L.111-1 et seq.)</li>
              <li>• Droits patrimoniaux / Economic rights (reproduction, representation, adaptation)</li>
              <li>• Droits moraux / Moral rights (attribution, integrity)</li>
              <li>• Droits sur les bases de données / Database rights</li>
              <li>• Droits sur les marques / Trademark rights</li>
              <li>• Savoir-faire et secrets d'affaires / Know-how and trade secrets</li>
            </ul>
          </div>
        </section>

        {/* Article 3 - Licence Non Commerciale */}
        <section className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-[#E1E8ED]">
          <h2 className="text-2xl font-bold text-[#2C3E50] mb-4 border-b-2 border-[#5B9BD5] pb-2">
            Article 3 — Concession de Licence Non Commerciale
          </h2>
          
          <p className="text-sm text-[#5A6C7D] leading-relaxed mb-4">
            <strong>FR:</strong> Artean Digital SAS concède aux utilisateurs finaux une licence personnelle, 
            non exclusive, non transférable, révocable et gratuite pour l'utilisation du Logiciel à des fins 
            strictement personnelles et non commerciales.
          </p>
          
          <p className="text-sm text-[#5A6C7D] leading-relaxed mb-4">
            <strong>EN:</strong> Artean Digital SAS grants end users a personal, non-exclusive, 
            non-transferable, revocable and free license to use the Software for strictly personal and 
            non-commercial purposes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <h4 className="font-semibold text-green-800 mb-2">✅ Droits Concédés / Granted Rights</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Utilisation personnelle / Personal use</li>
                <li>• Consultation du code source / Source code review</li>
                <li>• Modification pour usage personnel / Personal modifications</li>
                <li>• Contribution open-source / Open-source contribution</li>
              </ul>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <h4 className="font-semibold text-red-800 mb-2">❌ Restrictions Absolues / Restrictions</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Usage commercial / Commercial use</li>
                <li>• Redistribution / Redistribution</li>
                <li>• Suppression copyright / Copyright removal</li>
                <li>• Ingénierie inverse commerciale / Commercial reverse engineering</li>
                <li>• Œuvres dérivées commerciales / Commercial derivatives</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Article 4 - Licence Commerciale */}
        <section className="bg-gradient-to-br from-[#F5A962]/10 via-[#8B7BA8]/10 to-[#5B9BD5]/10 rounded-2xl p-8 mb-6 border border-[#5B9BD5]/20">
          <h2 className="text-2xl font-bold text-[#2C3E50] mb-4 border-b-2 border-[#5B9BD5] pb-2">
            Article 4 — Licence Commerciale Obligatoire
          </h2>
          
          <p className="text-sm text-[#5A6C7D] leading-relaxed mb-6">
            <strong>FR:</strong> Toute utilisation commerciale du Logiciel, sous quelque forme que ce soit, 
            requiert impérativement la conclusion préalable d'un contrat de licence commerciale écrit avec 
            Artean Digital SAS.
          </p>

          <h3 className="font-semibold text-[#2C3E50] mb-4">Offres de Licences Commerciales:</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4">
              <h4 className="font-semibold text-[#5B9BD5] mb-2">1. Licence Startup</h4>
              <p className="text-sm text-[#5A6C7D]">Pour startups et petites entreprises (&lt; 50 employés, &lt; 10M€ CA)</p>
            </div>
            
            <div className="bg-white rounded-xl p-4">
              <h4 className="font-semibold text-[#5B9BD5] mb-2">2. Licence Enterprise</h4>
              <p className="text-sm text-[#5A6C7D]">Pour grandes organisations et groupes internationaux</p>
            </div>
            
            <div className="bg-white rounded-xl p-4">
              <h4 className="font-semibold text-[#5B9BD5] mb-2">3. Licence Reseller / White-Label</h4>
              <p className="text-sm text-[#5A6C7D]">Pour revendeurs, intégrateurs et solutions SaaS</p>
            </div>
            
            <div className="bg-white rounded-xl p-4">
              <h4 className="font-semibold text-[#5B9BD5] mb-2">4. Licence OEM / Chatbot Telegram</h4>
              <p className="text-sm text-[#5A6C7D]">Pour intégration produits tiers et déploiements Telegram</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 text-center">
            <h4 className="font-semibold text-[#2C3E50] mb-3">Contact Licensing</h4>
            <p className="text-sm text-[#5A6C7D] mb-2">📧 <a href="mailto:contact@arteandigital.fr" className="text-[#5B9BD5] hover:underline">contact@arteandigital.fr</a></p>
            <p className="text-sm text-[#5A6C7D]">🌐 <a href="https://arteandigital.fr" target="_blank" rel="noopener noreferrer" className="text-[#5B9BD5] hover:underline">www.arteandigital.fr</a></p>
          </div>
        </section>

        {/* Article 5 - Sanctions */}
        <section className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-[#E1E8ED]">
          <h2 className="text-2xl font-bold text-[#2C3E50] mb-4 border-b-2 border-[#5B9BD5] pb-2">
            Article 5 — Sanctions en cas de Violation
          </h2>
          
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
            <p className="text-sm text-amber-800 leading-relaxed">
              <strong>⚠️ Attention:</strong> Toute violation constitue une contrefaçon au sens des articles 
              L.335-2 et suivants du Code de la Propriété Intellectuelle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-[#2C3E50] mb-3">Sanctions Civiles / Civil Penalties</h4>
              <ul className="text-sm text-[#5A6C7D] space-y-2">
                <li>• Dommages et intérêts / Damages</li>
                <li>• Saisie-contrefaçon / Seizure of infringing materials</li>
                <li>• Interdiction judiciaire / Judicial prohibition</li>
                <li>• Publication de la décision / Publication of court decision</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-[#2C3E50] mb-3">Sanctions Pénales / Criminal Penalties</h4>
              <ul className="text-sm text-[#5A6C7D] space-y-2">
                <li>• Jusqu'à 3 ans d'emprisonnement / Up to 3 years imprisonment</li>
                <li>• Jusqu'à 300 000 € d'amende (personnes physiques)</li>
                <li>• Jusqu'à 1 500 000 € d'amende (personnes morales)</li>
                <li>• Confiscation des matériels / Confiscation of equipment</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Autres Articles */}
        <section className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-[#E1E8ED]">
          <h2 className="text-2xl font-bold text-[#2C3E50] mb-6 border-b-2 border-[#5B9BD5] pb-2">
            Autres Dispositions / Other Provisions
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-[#5B9BD5] mb-2">Article 6 — Garanties et Responsabilité</h3>
              <p className="text-sm text-[#5A6C7D] leading-relaxed">
                Le logiciel est fourni "EN L'ÉTAT", sans garantie d'aucune sorte. Artean Digital SAS ne 
                saurait être tenu responsable de tout dommage résultant de l'utilisation du logiciel.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[#5B9BD5] mb-2">Article 7 — Exploitation Beta par Herrichain</h3>
              <p className="text-sm text-[#5A6C7D] leading-relaxed">
                L'association Herrichain (RNA: W641015204) est autorisée à exploiter le Logiciel à titre 
                de test bêta uniquement. Cette autorisation est révocable à tout moment et ne confère 
                aucun droit de propriété intellectuelle.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[#5B9BD5] mb-2">Article 8 — Déploiement Multiplateforme</h3>
              <p className="text-sm text-[#5A6C7D] leading-relaxed">
                Le Logiciel est destiné à être déployé sur plusieurs plateformes : application web (Next.js), 
                chatbot Telegram, API REST, et toute autre forme future. Tous les déploiements restent 
                soumis aux présentes conditions.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[#5B9BD5] mb-2">Article 9 — Durée et Résiliation</h3>
              <p className="text-sm text-[#5A6C7D] leading-relaxed">
                La licence est consentie pour une durée indéterminée. Elle prend fin automatiquement en 
                cas de violation de l'une quelconque de ses dispositions.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[#5B9BD5] mb-2">Article 10 — Droit Applicable et Juridiction</h3>
              <p className="text-sm text-[#5A6C7D] leading-relaxed">
                La présente licence est régie par le droit français. Tout litige relève de la compétence 
                EXCLUSIVE des tribunaux de BAYONNE, France.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="bg-gradient-to-r from-[#F5A962] via-[#8B7BA8] to-[#5B9BD5] rounded-2xl p-8 text-white text-center mb-6">
          <p className="font-bold text-lg mb-2">Artean Digital SAS</p>
          <p className="text-sm mb-1">SIREN: 439 299 152 00013</p>
          <p className="text-sm mb-4">BASK'IN, Biarritz, France 🇫🇷</p>
          <p className="text-xs opacity-90">© 2026 — Tous droits réservés / All rights reserved</p>
        </div>

        {/* Download & Back */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/LICENSE" 
            download 
            className="inline-block px-6 py-3 bg-gradient-to-r from-[#F5A962] to-[#5B9BD5] text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all text-center"
          >
            📄 Download Full License
          </a>
          <Link href="/" className="inline-block px-6 py-3 bg-white text-[#5B9BD5] font-semibold rounded-full shadow-md hover:shadow-lg transition-all text-center border border-[#E1E8ED]">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
