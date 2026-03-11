# YesBoth Telegram Bot

Bot Telegram pour générer des messages de consentement entre adultes.

## Installation

1. Cloner ce dépôt
2. Copier `env.example` vers `.env`
3. Ajouter votre token Telegram BotFather dans `.env`
4. Installer les dépendances :
```bash
npm install
```

## Démarrage

Développement :
```bash
npm run dev
```

Production :
```bash
npm start
```

## Configuration du Webhook

Après déploiement, configurez le webhook :
```bash
curl -X POST https://api.telegram.org/bot<VOTRE_TOKEN>/setWebhook \
  -H "Content-Type: application/json" \
  -d '{"url": "https://votre-domaine.com/bot<VOTRE_TOKEN>"}'
```

## Fonctionnalités

- ✅ Génération de messages de consentement
- ✅ Multilingue (FR/EN/ES/IT)
- ✅ 100% privé et local
- ✅ Interface adaptée à Telegram
- ⚖️ Mentions légales intégrées
