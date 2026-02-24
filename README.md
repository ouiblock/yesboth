# 🤝 YesBoth

**Multilingual Consent Message Generator**

> *Both say yes.*

A free, 100% local web application for generating clear consent agreements between consenting adults.

## ✨ Features

- 🌍 **Multilingual**: French, English, Spanish, Italian
- 📱 **Mobile-First**: Responsive design optimized for all devices
- 🔒 **100% Local**: No data leaves your device - complete privacy
- 📋 **4-Step Wizard**: Guided process to create personalized agreements
- 🎯 **Modular Clauses**: 4 categories with customizable options
- 🎨 **Modern Design**: Beautiful gradient theme (Orange → Violet → Blue)
- ⚖️ **Legal Protection**: Complete terms and mandatory CGU acceptance
- 🍪 **GDPR Compliant**: Minimal cookies, no tracking

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/yesboth.git
cd yesboth

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

### Deployment

The app is ready for static deployment on:
- **Netlify** (recommended)
- **Vercel**
- **GitHub Pages**
- Any static hosting service

## 📱 How It Works

1. **Disclaimer**: Read and accept the initial terms
2. **Parties**: Enter names of both consenting adults
3. **Category**: Choose agreement type (General, Relationship, Intimate, NSFW)
4. **Clauses**: Select relevant consent items and add custom clauses
5. **Generate**: Get your personalized consent message

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: TailwindCSS with custom design system
- **Icons**: Lucide React
- **Internationalization**: React Context + JSON
- **Language**: TypeScript/JavaScript
- **Build Tool**: Next.js compiler

## 📁 Project Structure

```
src/
├── app/                 # Next.js pages
│   ├── page.jsx        # Landing page
│   ├── wizard/page.jsx # Main wizard
│   └── cgu/page.jsx    # Terms & Conditions
├── components/         # Reusable components
│   ├── CookieBanner.jsx
│   ├── LanguageSelector.jsx
│   ├── ProgressBar.jsx
│   └── ShareBlock.jsx
├── steps/             # Wizard steps
│   ├── Step0_Disclaimer.jsx
│   ├── Step1_Parties.jsx
│   ├── Step2_Category.jsx
│   ├── Step3_Clauses.jsx
│   └── Step4_Result.jsx
├── i18n/              # Internationalization
│   ├── LandingContext.jsx
│   ├── LanguageContext.jsx
│   └── locales/       # Translation files
├── data/              # Clause definitions
├── utils/             # Helper functions
└── styles/            # Global styles
```

## 🎨 Design System

### Color Palette
- **Primary Orange**: `#F5A962`
- **Primary Purple**: `#8B7BA8` 
- **Primary Blue**: `#5B9BD5`
- **Text Dark**: `#2C3E50`
- **Background**: `#F8FAFB`

### Typography
- **Font Family**: Inter, Segoe UI, system-ui
- **Weights**: 400 (regular), 600 (semibold), 700 (bold)

## 🌍 Languages

The application supports 4 languages:
- 🇫🇷 **French** (default)
- 🇬🇧 **English**
- 🇪🇸 **Spanish**
- 🇮🇹 **Italian**

Translation files are located in `src/i18n/locales/`

## ⚖️ Legal & License

### Important Notice
YesBoth is a **communication tool**, not a legal contract. Generated messages have no legally binding value. Each party remains fully responsible for their actions.

### License
**Herrichain/Artean Digital Proprietary License** - All rights reserved

- ❌ **Commercial use strictly prohibited**
- ✅ **Personal use permitted**
- 🔒 **Source code auditable but non-modifiable**
- ⚖️ **French law applies**

See [LICENSE](LICENSE) for complete terms.

## 🔒 Privacy & Security

- **No server**: Everything runs in your browser
- **No data collection**: No personal data is stored or transmitted
- **No tracking**: No analytics, no advertising cookies
- **Local storage**: Only language preference and CGU acceptance

## 🤝 Contributing

This is a proprietary project. For any inquiries or collaboration requests:
- **Developer**: Artean Digital - www.arteandigital.fr
- **Publisher**: Herrichain (French non-profit association)
- **Contact**: contact@arteandigital.fr

## 📄 Documentation

- **Terms & Conditions**: `/cgu`
- **Privacy Policy**: Included in CGU
- **API Reference**: No external APIs used

## 🌟 Acknowledgments

Developed by Artean Digital for Herrichain association, promoting safe and consensual communication practices.

---

**© 2026 Herrichain - Association loi 1901**  
**Developed by Artean Digital**  
**All rights reserved**
