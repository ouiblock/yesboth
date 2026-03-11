const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

// Remplacez TOKEN par votre token BotFather
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });

// Webhook endpoint
app.post(`/bot${process.env.TELEGRAM_BOT_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Commande /start
bot.onText(/\/start/, (msg) => {
  const welcomeMessage = `
🎯 *Bienvenue sur YesBoth Bot*

Outil de communication pour consentement clair entre adultes.

*Important :* Ceci est un outil d'aide à la communication, pas un contrat juridique.

Pour commencer, tapez : /consent
  `;
  
  bot.sendMessage(msg.chat.id, welcomeMessage, { parse_mode: 'Markdown' });
});

// Commande /consent
bot.onText(/\/consent/, (msg) => {
  const consentKeyboard = {
    inline_keyboard: [
      [
        { text: "🚀 Commencer", callback_data: 'start_consent' }
      ],
      [
        { text: "ℹ️ Infos", callback_data: 'info' },
        { text: "⚖️ Mention légale", callback_data: 'legal' }
      ]
    ]
  };
  
  bot.sendMessage(msg.chat.id, "Prêt à créer un message de consentement ?", {
    reply_markup: consentKeyboard
  });
});

// Gestion des callbacks
bot.on('callback_query', (callbackQuery) => {
  const msg = callbackQuery.message;
  const data = callbackQuery.data;
  
  switch(data) {
    case 'start_consent':
      startConsentProcess(msg.chat.id);
      break;
    case 'info':
      showInfo(msg.chat.id);
      break;
    case 'legal':
      showLegal(msg.chat.id);
      break;
  }
  
  bot.answerCallbackQuery(callbackQuery.id);
});

// Fonction pour démarrer le processus
function startConsentProcess(chatId) {
  const keyboard = {
    inline_keyboard: [
      [
        { text: "🇫🇷 Français", callback_data: 'lang_fr' },
        { text: "🇬🇧 English", callback_data: 'lang_en' }
      ],
      [
        { text: "🇪🇸 Español", callback_data: 'lang_es' },
        { text: "🇮🇹 Italiano", callback_data: 'lang_it' }
      ]
    ]
  };
  
  bot.sendMessage(chatId, "Choisissez la langue / Choose language :", {
    reply_markup: keyboard
  });
}

// Fonctions d'information
function showInfo(chatId) {
  const info = `
ℹ️ *À propos de YesBoth*

✅ 100% local et privé
✅ Aucune collecte de données  
✅ Multilingue (FR/EN/ES/IT)
✅ Gratuit pour usage personnel

Outil de communication pour adultes consentants.
  `;
  bot.sendMessage(chatId, info, { parse_mode: 'Markdown' });
}

function showLegal(chatId) {
  const legal = `
⚖️ *Mention légale importante*

YesBoth est un **outil de communication uniquement**.

❌ Ce n'est PAS un contrat juridique
❌ Ce n'est PAS un acte notarié  
❌ Ce n'est PAS un service juridique

✅ La responsabilité repose sur les parties
✅ Le consentement reste révocable à tout moment
✅ Le refus verbal/gestuel prévaut toujours

Développé par SAS BASK'IN BIARRITZ
  `;
  bot.sendMessage(chatId, legal, { parse_mode: 'Markdown' });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bot server running on port ${PORT}`);
});
