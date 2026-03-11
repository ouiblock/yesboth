# YesBoth Telegram Bot - Guide de déploiement Netlify

## Configuration du bot

**Bot Username:** @yesbothbot
**Token:** Configuré via variable d'environnement `TELEGRAM_BOT_TOKEN`

## Installation

```bash
cd telegram-bot
npm install
```

## Configuration Netlify

### 1. Installer Netlify CLI
```bash
npm install -g netlify-cli
```

### 2. Se connecter à Netlify
```bash
netlify login
```

### 3. Initialiser le projet
```bash
netlify init
```

### 4. Configurer la variable d'environnement
```bash
netlify env:set TELEGRAM_BOT_TOKEN "VOTRE_TOKEN_TELEGRAM_ICI"
```

⚠️ **Important:** Obtenez votre token via [@BotFather](https://t.me/botfather) sur Telegram

### 5. Déployer
```bash
netlify deploy --prod
```

### 6. Configurer le webhook Telegram

Après le déploiement, notez l'URL fournie (ex: https://yesboth-bot.netlify.app)

```bash
curl -X POST https://api.telegram.org/bot<VOTRE_TOKEN>/setWebhook \
  -H "Content-Type: application/json" \
  -d '{"url": "https://VOTRE-URL-NETLIFY.netlify.app/.netlify/functions/bot"}'
```

### 7. Vérifier le webhook
```bash
curl https://api.telegram.org/bot<VOTRE_TOKEN>/getWebhookInfo
```

## Test local (optionnel)

```bash
# Terminal 1 - Lancer ngrok
ngrok http 8888

# Terminal 2 - Lancer le bot localement
netlify dev

# Terminal 3 - Configurer le webhook avec ngrok
curl -X POST https://api.telegram.org/bot<VOTRE_TOKEN>/setWebhook \
  -d '{"url": "https://VOTRE-URL-NGROK.ngrok.io/.netlify/functions/bot"}'
```

## Commandes du bot

- `/start` - Démarrer le bot
- `/consent` - Créer un message de consentement
- `/info` - Informations sur YesBoth
- `/legal` - Mentions légales
- `/help` - Aide

## Structure du projet

```
telegram-bot/
├── package.json
├── netlify.toml
├── bot-logic.js
└── netlify/
    └── functions/
        └── bot.js
```
