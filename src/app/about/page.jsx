'use client'

import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      <div className="max-w-[680px] mx-auto px-5 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-6">
            <img src="/logo.png" alt="YesBoth" className="h-16 mx-auto" />
          </Link>
          <h1 className="text-3xl font-bold text-[#2C3E50] mb-4">About YesBoth</h1>
          <p className="text-[#5A6C7D] text-lg">Innovation in consent communication</p>
        </div>

        {/* Mission */}
        <section className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-[#E1E8ED]">
          <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">Our Mission</h2>
          <p className="text-[#5A6C7D] leading-relaxed mb-4">
            YesBoth is a free, multilingual web application designed to facilitate clear and respectful 
            communication about consent between adults. Our tool helps create personalized consent 
            agreements in a simple, secure, and 100% local environment.
          </p>
          <p className="text-[#5A6C7D] leading-relaxed">
            We believe in transparency, privacy, and empowering individuals to communicate their 
            boundaries clearly and respectfully.
          </p>
        </section>

        {/* Creator */}
        <section className="bg-gradient-to-br from-[#F5A962]/10 via-[#8B7BA8]/10 to-[#5B9BD5]/10 rounded-2xl p-8 mb-6 border border-[#5B9BD5]/20">
          <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">Created by Xavier CHAUMET-NICOLAS</h2>
          
          <div className="space-y-4">
            <p className="text-[#5A6C7D] leading-relaxed">
              <strong className="text-[#2C3E50]">Xavier CHAUMET-NICOLAS</strong> is the founder and CEO of 
              <strong className="text-[#5B9BD5]"> BASK'IN BIARRITZ</strong>, a technology innovation hub 
              based in Biarritz, France, in the heart of the Basque Country.
            </p>
            
            <p className="text-[#5A6C7D] leading-relaxed">
              With a vision to create ethical and privacy-focused digital solutions, Xavier leads 
              <strong className="text-[#5B9BD5]"> SAS BASK'IN BIARRITZ</strong>, the software development 
              company behind YesBoth and other innovative applications.
            </p>

            <div className="bg-white/60 rounded-xl p-4 mt-6">
              <h3 className="font-semibold text-[#2C3E50] mb-2">Key Values:</h3>
              <ul className="space-y-2 text-[#5A6C7D]">
                <li className="flex items-start gap-2">
                  <span className="text-[#F5A962] mt-1">●</span>
                  <span><strong>Privacy First:</strong> No data collection, 100% local processing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8B7BA8] mt-1">●</span>
                  <span><strong>Open Innovation:</strong> Transparent development and ethical practices</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#5B9BD5] mt-1">●</span>
                  <span><strong>Social Impact:</strong> Technology for positive social change</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Company */}
        <section className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-[#E1E8ED]">
          <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">SAS BASK'IN BIARRITZ</h2>
          
          <div className="space-y-4 text-[#5A6C7D]">
            <p className="leading-relaxed">
              <strong className="text-[#2C3E50]">SAS BASK'IN BIARRITZ</strong> is a technology incubator and 
              software development company based in Bidart, France.
            </p>
            
            <div className="bg-[#F8FAFB] rounded-xl p-4">
              <h4 className="font-semibold text-[#2C3E50] mb-3">Company Information:</h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Legal Name:</strong> SAS BASK'IN BIARRITZ</li>
                <li><strong>SIREN:</strong> 439 299 152 00013</li>
                <li><strong>Address:</strong> 257 Avenue d'Atherbea, 64210 Bidart, France</li>
                <li><strong>Region:</strong> Pays Basque (Basque Country)</li>
                <li><strong>Website:</strong> <a href="https://arteandigital.fr" target="_blank" rel="noopener noreferrer" className="text-[#5B9BD5] hover:underline">www.arteandigital.fr</a></li>
              </ul>
            </div>

            <p className="leading-relaxed">
              We specialize in creating privacy-focused, user-centric web applications that prioritize 
              security, transparency, and social responsibility. Our projects are developed with a 
              commitment to ethical technology and open innovation.
            </p>
          </div>
        </section>

        {/* Technology */}
        <section className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-[#E1E8ED]">
          <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">Technology & Innovation</h2>
          
          <p className="text-[#5A6C7D] leading-relaxed mb-4">
            YesBoth is built with cutting-edge web technologies to ensure maximum privacy, 
            performance, and accessibility:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-[#F8FAFB] rounded-lg p-4">
              <h4 className="font-semibold text-[#2C3E50] mb-2">🚀 Next.js 16</h4>
              <p className="text-sm text-[#5A6C7D]">Modern React framework for optimal performance</p>
            </div>
            <div className="bg-[#F8FAFB] rounded-lg p-4">
              <h4 className="font-semibold text-[#2C3E50] mb-2">🔒 100% Local</h4>
              <p className="text-sm text-[#5A6C7D]">No server, no tracking, complete privacy</p>
            </div>
            <div className="bg-[#F8FAFB] rounded-lg p-4">
              <h4 className="font-semibold text-[#2C3E50] mb-2">🌍 Multilingual</h4>
              <p className="text-sm text-[#5A6C7D]">FR, EN, ES, IT support built-in</p>
            </div>
            <div className="bg-[#F8FAFB] rounded-lg p-4">
              <h4 className="font-semibold text-[#2C3E50] mb-2">📱 PWA Ready</h4>
              <p className="text-sm text-[#5A6C7D]">Install as mobile app</p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-gradient-to-r from-[#F5A962] via-[#8B7BA8] to-[#5B9BD5] rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="mb-6 opacity-90">
            For commercial licensing, partnerships, or inquiries about our technology
          </p>
          <div className="space-y-2">
            <p className="font-semibold">SAS BASK'IN BIARRITZ</p>
            <p>📧 <a href="mailto:contact@arteandigital.fr" className="underline hover:opacity-80">contact@arteandigital.fr</a></p>
            <p>🌐 <a href="https://arteandigital.fr" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">www.arteandigital.fr</a></p>
            <p className="text-sm opacity-75 mt-4">257 Avenue d'Atherbea, 64210 Bidart, France 🇫🇷</p>
          </div>
        </section>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link href="/" className="inline-block px-6 py-3 bg-white text-[#5B9BD5] font-semibold rounded-full shadow-md hover:shadow-lg transition-all">
            ← Back to YesBoth
          </Link>
        </div>
      </div>
    </div>
  )
}
