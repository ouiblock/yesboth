'use client'

import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      <div className="max-w-[800px] mx-auto px-5 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <img src="/logo.png" alt="YesBoth" className="h-16 mx-auto" />
          </Link>
          <h1 className="text-3xl font-bold text-[#2C3E50] mb-2">Privacy Policy</h1>
          <h2 className="text-xl text-[#5A6C7D] mb-4">Politique de Confidentialité</h2>
          <p className="text-sm text-[#8B95A1]">Last updated: February 24, 2026</p>
        </div>

        {/* Introduction */}
        <section className="bg-gradient-to-br from-[#F5A962]/10 via-[#8B7BA8]/10 to-[#5B9BD5]/10 rounded-2xl p-8 mb-6 border border-[#5B9BD5]/20">
          <h3 className="text-2xl font-bold text-[#2C3E50] mb-4">🔒 Your Privacy is Our Priority</h3>
          <p className="text-[#5A6C7D] leading-relaxed mb-4">
            <strong>YesBoth</strong> is designed with privacy at its core. We believe in transparency and 
            your right to control your personal data.
          </p>
          <div className="bg-white/60 rounded-xl p-4">
            <p className="text-sm font-semibold text-[#2C3E50] mb-2">Key Principle:</p>
            <p className="text-[#5A6C7D] text-sm">
              ✅ <strong>100% Local Processing</strong> — All data stays on your device. 
              Nothing is sent to our servers.
            </p>
          </div>
        </section>

        {/* Data Controller */}
        <section className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-[#E1E8ED]">
          <h3 className="text-2xl font-bold text-[#2C3E50] mb-4">Data Controller / Responsable du Traitement</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-[#5B9BD5] mb-3">Publisher & Owner / Éditeur et Propriétaire</h4>
              <div className="bg-[#F8FAFB] rounded-xl p-4 space-y-2 text-sm">
                <p><strong>Legal Entity:</strong> SAS BASK'IN BIARRITZ</p>
                <p><strong>SIREN:</strong> 439 299 152 00013</p>
                <p><strong>Address:</strong> 257 Avenue d'Atherbea, 64210 Bidart, France</p>
                <p><strong>Email:</strong> <a href="mailto:contact@arteandigital.fr" className="text-[#5B9BD5] hover:underline">contact@arteandigital.fr</a></p>
                <p><strong>Website:</strong> <a href="https://arteandigital.fr" target="_blank" rel="noopener noreferrer" className="text-[#5B9BD5] hover:underline">www.arteandigital.fr</a></p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-[#5B9BD5] mb-3">Beta Operator / Exploitant Beta</h4>
              <div className="bg-[#F8FAFB] rounded-xl p-4 space-y-2 text-sm">
                <p><strong>Organization:</strong> Association Herrichain (loi 1901)</p>
                <p><strong>RNA:</strong> W641015204</p>
                <p><strong>Address:</strong> 257 Avenue d'Atherbea, 64210 Bidart, France</p>
                <p><strong>Role:</strong> Beta testing and operation</p>
                <p className="text-xs text-[#8B95A1] italic">The association operates the application for testing purposes only and does not own any intellectual property rights.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Data Collection */}
        <section className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-[#E1E8ED]">
          <h3 className="text-2xl font-bold text-[#2C3E50] mb-4">What Data We Collect / Données Collectées</h3>
          
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <h4 className="font-semibold text-green-800 mb-2">✅ Local Data (Not Sent to Servers)</h4>
              <p className="text-sm text-green-700 mb-3">
                All consent agreement data is processed <strong>100% locally</strong> in your browser:
              </p>
              <ul className="text-sm text-green-700 space-y-1 ml-4">
                <li>• Names of parties</li>
                <li>• Date and location of agreement</li>
                <li>• Selected consent clauses</li>
                <li>• Custom clauses and safewords</li>
                <li>• Generated consent messages</li>
              </ul>
              <p className="text-xs text-green-600 mt-3 italic">
                ℹ️ This data never leaves your device and is not stored on our servers.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h4 className="font-semibold text-blue-800 mb-2">🍪 Cookies & Local Storage</h4>
              <p className="text-sm text-blue-700 mb-3">
                We use minimal cookies and local storage for:
              </p>
              <ul className="text-sm text-blue-700 space-y-1 ml-4">
                <li>• <strong>Language preference:</strong> Remembering your chosen language</li>
                <li>• <strong>Disclaimer acceptance:</strong> Avoiding repeated disclaimers</li>
                <li>• <strong>Cookie consent:</strong> Your cookie preferences</li>
              </ul>
              <p className="text-xs text-blue-600 mt-3 italic">
                ℹ️ You can delete these at any time through your browser settings.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 mb-2">📊 Analytics (Optional)</h4>
              <p className="text-sm text-gray-700">
                We may use privacy-respecting analytics to understand:
              </p>
              <ul className="text-sm text-gray-700 space-y-1 ml-4 mt-2">
                <li>• Number of visitors (anonymized)</li>
                <li>• Popular features</li>
                <li>• Technical errors</li>
              </ul>
              <p className="text-xs text-gray-600 mt-3 italic">
                ℹ️ No personal data or consent agreement content is ever tracked.
              </p>
            </div>
          </div>
        </section>

        {/* GDPR Rights */}
        <section className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-[#E1E8ED]">
          <h3 className="text-2xl font-bold text-[#2C3E50] mb-4">Your GDPR Rights / Vos Droits RGPD</h3>
          
          <p className="text-[#5A6C7D] mb-4">
            Under the General Data Protection Regulation (GDPR) and French data protection law, you have the following rights:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-[#F8FAFB] rounded-lg p-4">
              <h4 className="font-semibold text-[#2C3E50] mb-2">🔍 Right to Access</h4>
              <p className="text-sm text-[#5A6C7D]">Request information about your personal data</p>
            </div>
            <div className="bg-[#F8FAFB] rounded-lg p-4">
              <h4 className="font-semibold text-[#2C3E50] mb-2">✏️ Right to Rectification</h4>
              <p className="text-sm text-[#5A6C7D]">Correct inaccurate personal data</p>
            </div>
            <div className="bg-[#F8FAFB] rounded-lg p-4">
              <h4 className="font-semibold text-[#2C3E50] mb-2">🗑️ Right to Erasure</h4>
              <p className="text-sm text-[#5A6C7D]">Request deletion of your data</p>
            </div>
            <div className="bg-[#F8FAFB] rounded-lg p-4">
              <h4 className="font-semibold text-[#2C3E50] mb-2">🚫 Right to Object</h4>
              <p className="text-sm text-[#5A6C7D]">Object to certain data processing</p>
            </div>
            <div className="bg-[#F8FAFB] rounded-lg p-4">
              <h4 className="font-semibold text-[#2C3E50] mb-2">📦 Right to Portability</h4>
              <p className="text-sm text-[#5A6C7D]">Receive your data in a structured format</p>
            </div>
            <div className="bg-[#F8FAFB] rounded-lg p-4">
              <h4 className="font-semibold text-[#2C3E50] mb-2">⏸️ Right to Restriction</h4>
              <p className="text-sm text-[#5A6C7D]">Limit how we process your data</p>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Since YesBoth processes all data locally on your device, 
              most of these rights are automatically fulfilled — you have complete control over your data.
            </p>
          </div>
        </section>

        {/* Data Security */}
        <section className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-[#E1E8ED]">
          <h3 className="text-2xl font-bold text-[#2C3E50] mb-4">Data Security / Sécurité des Données</h3>
          
          <div className="space-y-4 text-[#5A6C7D]">
            <p className="leading-relaxed">
              We implement industry-standard security measures to protect your data:
            </p>
            
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-[#F5A962] mt-1">🔒</span>
                <span><strong>HTTPS Encryption:</strong> All communications are encrypted</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8B7BA8] mt-1">💻</span>
                <span><strong>Local Processing:</strong> No server-side data storage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#5B9BD5] mt-1">🔐</span>
                <span><strong>No Third-Party Tracking:</strong> No external analytics or ads</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#F5A962] mt-1">🛡️</span>
                <span><strong>Open Source:</strong> Code is transparent and auditable</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Third Parties */}
        <section className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-[#E1E8ED]">
          <h3 className="text-2xl font-bold text-[#2C3E50] mb-4">Third-Party Services / Services Tiers</h3>
          
          <p className="text-[#5A6C7D] mb-4">
            YesBoth uses minimal third-party services:
          </p>

          <div className="space-y-3">
            <div className="bg-[#F8FAFB] rounded-lg p-4">
              <h4 className="font-semibold text-[#2C3E50] mb-2">🌐 Netlify (Hosting)</h4>
              <p className="text-sm text-[#5A6C7D]">
                Our application is hosted on Netlify. They may collect basic server logs 
                (IP addresses, access times) for security and performance purposes.
              </p>
              <a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-xs text-[#5B9BD5] hover:underline">
                View Netlify Privacy Policy →
              </a>
            </div>

            <div className="bg-[#F8FAFB] rounded-lg p-4">
              <h4 className="font-semibold text-[#2C3E50] mb-2">🔤 Google Fonts</h4>
              <p className="text-sm text-[#5A6C7D]">
                We use Google Fonts for typography. Google may collect basic usage data.
              </p>
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-xs text-[#5B9BD5] hover:underline">
                View Google Privacy Policy →
              </a>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-gradient-to-r from-[#F5A962] via-[#8B7BA8] to-[#5B9BD5] rounded-2xl p-8 text-white mb-6">
          <h3 className="text-2xl font-bold mb-4">Contact Us / Nous Contacter</h3>
          <p className="mb-4 opacity-90">
            For any questions about this privacy policy or to exercise your GDPR rights:
          </p>
          <div className="space-y-2">
            <p><strong>SAS BASK'IN BIARRITZ</strong></p>
            <p>📧 Email: <a href="mailto:contact@arteandigital.fr" className="underline hover:opacity-80">contact@arteandigital.fr</a></p>
            <p>🌐 Website: <a href="https://arteandigital.fr" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">www.arteandigital.fr</a></p>
            <p className="text-sm opacity-75 mt-4">257 Avenue d'Atherbea, 64210 Bidart, France 🇫🇷</p>
          </div>
        </section>

        {/* CNIL */}
        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6">
          <h4 className="font-semibold text-amber-900 mb-2">🇫🇷 CNIL (French Data Protection Authority)</h4>
          <p className="text-sm text-amber-800 leading-relaxed">
            If you believe your data protection rights have been violated, you have the right to 
            lodge a complaint with the CNIL (Commission Nationale de l'Informatique et des Libertés).
          </p>
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-sm text-amber-900 hover:underline font-semibold mt-2 inline-block">
            Visit CNIL.fr →
          </a>
        </section>

        {/* Back to Home */}
        <div className="text-center">
          <Link href="/" className="inline-block px-6 py-3 bg-white text-[#5B9BD5] font-semibold rounded-full shadow-md hover:shadow-lg transition-all">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
