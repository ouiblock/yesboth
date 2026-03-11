const { Telegraf, Markup } = require('telegraf');
const { generateMessage } = require('./utils/generateMessage');
const translations = require('./utils/translations');

// Initialiser le bot
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Stockage des sessions (en mémoire)
const sessions = new Map();

// Middleware pour gérer les sessions
bot.use((ctx, next) => {
  const chatId = ctx.chat?.id;
  if (chatId && !sessions.has(chatId)) {
    sessions.set(chatId, {
      lang: 'fr',
      step: null,
      form: {
        initiateur: { prenom: '', nom: '' },
        partenaire: { prenom: '', nom: '' },
        date: new Date().toLocaleDateString('fr-FR'),
        lieu: '',
        category: '',
        clauses: [],
        clauseLibre: '',
        safeword: '',
        validite: '24h'
      }
    });
  }
  return next();
});

// Fonction pour obtenir la session
const getSession = (chatId) => sessions.get(chatId);

// Commande /start
bot.start((ctx) => {
  const session = getSession(ctx.chat.id);
  session.step = null;
  
  const welcomeMessage = `🎯 *Bienvenue sur YesBoth Bot*

Outil de communication pour consentement clair entre adultes\.

*Important :* Ceci est un outil d'aide à la communication, pas un contrat juridique\.

Pour commencer, tapez : /consent`;
  
  ctx.replyWithMarkdownV2(welcomeMessage);
});

// Commande /help
bot.help((ctx) => {
  const helpMessage = `📖 *Commandes disponibles :*

/start - Démarrer le bot
/consent - Créer un message de consentement
/info - Informations sur YesBoth
/legal - Mentions légales
/cancel - Annuler la création en cours
/help - Afficher cette aide

🚀 Tapez /consent pour commencer\!`;
  
  ctx.replyWithMarkdownV2(helpMessage);
});

// Commande /cancel
bot.command('cancel', (ctx) => {
  const session = getSession(ctx.chat.id);
  session.step = null;
  session.form = {
    initiateur: { prenom: '', nom: '' },
    partenaire: { prenom: '', nom: '' },
    date: new Date().toLocaleDateString('fr-FR'),
    lieu: '',
    category: '',
    clauses: [],
    clauseLibre: '',
    safeword: '',
    validite: '24h'
  };
  ctx.reply('❌ Création annulée. Tapez /consent pour recommencer.');
});

// Commande /consent
bot.command('consent', (ctx) => {
  const keyboard = Markup.inlineKeyboard([
    [
      Markup.button.callback('🇫🇷 Français', 'lang_fr'),
      Markup.button.callback('🇬🇧 English', 'lang_en')
    ],
    [
      Markup.button.callback('🇪🇸 Español', 'lang_es'),
      Markup.button.callback('🇮🇹 Italiano', 'lang_it')
    ]
  ]);
  
  ctx.reply('Choisissez la langue / Choose language:', keyboard);
});

// Commande /info
bot.command('info', (ctx) => {
  showInfo(ctx);
});

// Commande /legal
bot.command('legal', (ctx) => {
  showLegal(ctx);
});

// Gestion de la sélection de langue
bot.action(/lang_(.+)/, (ctx) => {
  const lang = ctx.match[1];
  const session = getSession(ctx.chat.id);
  session.lang = lang;
  session.step = 'initiator_firstname';
  
  const messages = {
    fr: '✅ Langue sélectionnée : Français\n\n👤 Quel est VOTRE prénom ?',
    en: '✅ Language selected: English\n\n👤 What is YOUR first name?',
    es: '✅ Idioma seleccionado: Español\n\n👤 ¿Cuál es TU nombre?',
    it: '✅ Lingua selezionata: Italiano\n\n👤 Qual è il TUO nome?'
  };
  
  ctx.answerCbQuery();
  ctx.reply(messages[lang]);
});

// Gestion de la sélection de catégorie
bot.action(/cat_(.+)/, (ctx) => {
  const category = ctx.match[1];
  const session = getSession(ctx.chat.id);
  session.form.category = category;
  session.step = 'clauses';
  
  ctx.answerCbQuery();
  showClauses(ctx, session.lang, category);
});

// Gestion de la sélection de validité
bot.action(/val_(.+)/, (ctx) => {
  const validity = ctx.match[1];
  const session = getSession(ctx.chat.id);
  session.form.validite = validity;
  
  ctx.answerCbQuery();
  generateAndSendMessage(ctx, session);
});


// Gestion des messages textuels (wizard)
bot.on('text', (ctx) => {
  const session = getSession(ctx.chat.id);
  if (!session || !session.step) return;
  
  const text = ctx.message.text;
  const lang = session.lang;
  
  const msgs = {
    fr: {
      initiator_firstname: 'Quel est votre NOM DE FAMILLE ?',
      initiator_lastname: '👥 Quel est le PRÉNOM de l\'autre personne ?',
      partner_firstname: 'Quel est son NOM DE FAMILLE ?',
      partner_lastname: '📍 Où se déroule cette rencontre ? (ville, lieu...)\n\n💡 Tapez "skip" pour passer',
      location: 'Quelle catégorie de consentement ?'
    },
    en: {
      initiator_firstname: 'What is your LAST NAME?',
      initiator_lastname: '👥 What is the OTHER person\'s FIRST NAME?',
      partner_firstname: 'What is their LAST NAME?',
      partner_lastname: '📍 Where is this meeting taking place? (city, place...)\n\n💡 Type "skip" to skip',
      location: 'Which consent category?'
    },
    es: {
      initiator_firstname: '¿Cuál es tu APELLIDO?',
      initiator_lastname: '👥 ¿Cuál es el NOMBRE de la otra persona?',
      partner_firstname: '¿Cuál es su APELLIDO?',
      partner_lastname: '📍 ¿Dónde tiene lugar este encuentro? (ciudad, lugar...)\n\n💡 Escribe "skip" para omitir',
      location: '¿Qué categoría de consentimiento?'
    },
    it: {
      initiator_firstname: 'Qual è il tuo COGNOME?',
      initiator_lastname: '👥 Qual è il NOME dell\'altra persona?',
      partner_firstname: 'Qual è il suo COGNOME?',
      partner_lastname: '📍 Dove si svolge questo incontro? (città, luogo...)\n\n💡 Digita "skip" per saltare',
      location: 'Quale categoria di consenso?'
    }
  };
  
  switch(session.step) {
    case 'initiator_firstname':
      session.form.initiateur.prenom = text;
      session.step = 'initiator_lastname';
      ctx.reply(msgs[lang].initiator_firstname);
      break;
      
    case 'initiator_lastname':
      session.form.initiateur.nom = text;
      session.step = 'partner_firstname';
      ctx.reply(msgs[lang].initiator_lastname);
      break;
      
    case 'partner_firstname':
      session.form.partenaire.prenom = text;
      session.step = 'partner_lastname';
      ctx.reply(msgs[lang].partner_firstname);
      break;
      
    case 'partner_lastname':
      session.form.partenaire.nom = text;
      session.step = 'location';
      ctx.reply(msgs[lang].partner_lastname);
      break;
      
    case 'location':
      if (text.toLowerCase() !== 'skip') {
        session.form.lieu = text;
      }
      session.step = 'category';
      showCategories(ctx, lang);
      break;
      
    case 'clause_selection':
      const numbers = text.split(' ').map(n => parseInt(n) - 1);
      numbers.forEach(i => {
        if (session.form.clauses[i]) {
          session.form.clauses[i].state = true;
        }
      });
      session.step = 'safeword';
      askSafeword(ctx, lang);
      break;
      
    case 'safeword':
      if (text.toLowerCase() !== 'skip') {
        session.form.safeword = text;
      }
      session.step = 'custom_clause';
      askCustomClause(ctx, lang);
      break;
      
    case 'custom_clause':
      if (text.toLowerCase() !== 'skip') {
        session.form.clauseLibre = text;
      }
      session.step = 'validity';
      showValidity(ctx, lang);
      break;
  }
});

// Fonctions utilitaires
function showInfo(ctx) {
  const info = `
ℹ️ *À propos de YesBoth*

✅ 100% local et privé
✅ Aucune collecte de données  
✅ Multilingue \\(FR/EN/ES/IT\\)
✅ Gratuit pour usage personnel

Outil de communication pour adultes consentants\\.
  `;
  ctx.replyWithMarkdownV2(info);
}

function showLegal(ctx) {
  const legal = `
⚖️ *Mention légale importante*

YesBoth est un *outil de communication uniquement*\\.

❌ Ce n'est PAS un contrat juridique
❌ Ce n'est PAS un acte notarié  
❌ Ce n'est PAS un service juridique

✅ La responsabilité repose sur les parties
✅ Le consentement reste révocable à tout moment
✅ Le refus verbal/gestuel prévaut toujours

Développé par SAS BASK'IN BIARRITZ
  `;
  ctx.replyWithMarkdownV2(legal);
}

function showCategories(ctx, lang) {
  const categories = {
    fr: {
      title: 'Quelle catégorie de consentement ?',
      buttons: [
        ['💞 Relation intime', 'cat_intimite'],
        ['🎭 BDSM/Fétichisme', 'cat_nsfw'],
        ['🤝 Relation générale', 'cat_relation']
      ]
    },
    en: {
      title: 'Which consent category?',
      buttons: [
        ['💞 Intimate relationship', 'cat_intimite'],
        ['🎭 BDSM/Fetish', 'cat_nsfw'],
        ['🤝 General relationship', 'cat_relation']
      ]
    },
    es: {
      title: '¿Qué categoría de consentimiento?',
      buttons: [
        ['💞 Relación íntima', 'cat_intimite'],
        ['🎭 BDSM/Fetichismo', 'cat_nsfw'],
        ['🤝 Relación general', 'cat_relation']
      ]
    },
    it: {
      title: 'Quale categoria di consenso?',
      buttons: [
        ['💞 Relazione intima', 'cat_intimite'],
        ['🎭 BDSM/Fetish', 'cat_nsfw'],
        ['🤝 Relazione generale', 'cat_relation']
      ]
    }
  };
  
  const cat = categories[lang];
  const keyboard = Markup.inlineKeyboard(
    cat.buttons.map(([text, data]) => [Markup.button.callback(text, data)])
  );
  
  ctx.reply(cat.title, keyboard);
}

// Afficher les clauses
function showClauses(ctx, lang, category) {
  const session = getSession(ctx.chat.id);
  const clausesData = {
    intimite: {
      fr: ['Baisers', 'Caresses', 'Rapport protégé', 'Rapport non protégé', 'Sexe oral'],
      en: ['Kissing', 'Caressing', 'Protected sex', 'Unprotected sex', 'Oral sex'],
      es: ['Besos', 'Caricias', 'Sexo protegido', 'Sexo sin protección', 'Sexo oral'],
      it: ['Baci', 'Carezze', 'Sesso protetto', 'Sesso non protetto', 'Sesso orale']
    },
    nsfw: {
      fr: ['Bondage léger', 'Domination/Soumission', 'Jeux de rôle', 'Utilisation d\'accessoires'],
      en: ['Light bondage', 'Domination/Submission', 'Role play', 'Use of accessories'],
      es: ['Bondage ligero', 'Dominación/Sumisión', 'Juego de roles', 'Uso de accesorios'],
      it: ['Bondage leggero', 'Dominazione/Sottomissione', 'Gioco di ruolo', 'Uso di accessori']
    },
    relation: {
      fr: ['Sorties ensemble', 'Présentation aux amis', 'Exclusivité', 'Communication régulière'],
      en: ['Going out together', 'Meeting friends', 'Exclusivity', 'Regular communication'],
      es: ['Salir juntos', 'Conocer amigos', 'Exclusividad', 'Comunicación regular'],
      it: ['Uscire insieme', 'Incontrare amici', 'Esclusività', 'Comunicazione regolare']
    }
  };
  
  const clauses = clausesData[category][lang];
  session.form.clauses = clauses.map(label => ({ label, state: false }));
  
  const messages = {
    fr: `Sélectionnez les clauses acceptées :\n\n${clauses.map((c, i) => `${i + 1}. ${c}`).join('\n')}\n\nRépondez avec les numéros séparés par des espaces (ex: 1 3 5)`,
    en: `Select accepted clauses:\n\n${clauses.map((c, i) => `${i + 1}. ${c}`).join('\n')}\n\nReply with numbers separated by spaces (e.g., 1 3 5)`,
    es: `Seleccione las cláusulas aceptadas:\n\n${clauses.map((c, i) => `${i + 1}. ${c}`).join('\n')}\n\nResponda con números separados por espacios (ej: 1 3 5)`,
    it: `Seleziona le clausole accettate:\n\n${clauses.map((c, i) => `${i + 1}. ${c}`).join('\n')}\n\nRispondi con numeri separati da spazi (es: 1 3 5)`
  };
  
  session.step = 'clause_selection';
  ctx.reply(messages[lang]);
}

// Demander le safeword
function askSafeword(ctx, lang) {
  const messages = {
    fr: '🔴 Voulez-vous définir un mot de sécurité ?\n\n💡 Tapez le mot ou "skip" pour passer',
    en: '🔴 Do you want to set a safeword?\n\n💡 Type the word or "skip" to skip',
    es: '🔴 ¿Quieres establecer una palabra de seguridad?\n\n💡 Escribe la palabra o "skip" para omitir',
    it: '🔴 Vuoi impostare una parola di sicurezza?\n\n💡 Digita la parola o "skip" per saltare'
  };
  
  ctx.reply(messages[lang]);
}

// Demander clause personnalisée
function askCustomClause(ctx, lang) {
  const messages = {
    fr: '📝 Voulez-vous ajouter une clause personnalisée ?\n\n💡 Tapez la clause ou "skip" pour passer',
    en: '📝 Do you want to add a custom clause?\n\n💡 Type the clause or "skip" to skip',
    es: '📝 ¿Quieres agregar una cláusula personalizada?\n\n💡 Escribe la cláusula o "skip" para omitir',
    it: '📝 Vuoi aggiungere una clausola personalizzata?\n\n💡 Digita la clausola o "skip" per saltare'
  };
  
  ctx.reply(messages[lang]);
}

// Afficher les options de validité
function showValidity(ctx, lang) {
  const validities = {
    fr: {
      title: '⏱️ Quelle est la durée de validité ?',
      buttons: [
        ['Ce soir uniquement', 'val_ce_soir'],
        ['24 heures', 'val_24h'],
        ['7 jours', 'val_7j'],
        ['30 jours', 'val_30j'],
        ['Indéfinie', 'val_indefini']
      ]
    },
    en: {
      title: '⏱️ What is the validity period?',
      buttons: [
        ['Tonight only', 'val_ce_soir'],
        ['24 hours', 'val_24h'],
        ['7 days', 'val_7j'],
        ['30 days', 'val_30j'],
        ['Indefinite', 'val_indefini']
      ]
    },
    es: {
      title: '⏱️ ¿Cuál es el período de validez?',
      buttons: [
        ['Solo esta noche', 'val_ce_soir'],
        ['24 horas', 'val_24h'],
        ['7 días', 'val_7j'],
        ['30 días', 'val_30j'],
        ['Indefinido', 'val_indefini']
      ]
    },
    it: {
      title: '⏱️ Qual è il periodo di validità?',
      buttons: [
        ['Solo stasera', 'val_ce_soir'],
        ['24 ore', 'val_24h'],
        ['7 giorni', 'val_7j'],
        ['30 giorni', 'val_30j'],
        ['Indefinito', 'val_indefini']
      ]
    }
  };
  
  const val = validities[lang];
  const keyboard = Markup.inlineKeyboard(
    val.buttons.map(([text, data]) => [Markup.button.callback(text, data)])
  );
  
  ctx.reply(val.title, keyboard);
}

// Générer et envoyer le message final
function generateAndSendMessage(ctx, session) {
  const trans = translations[session.lang];
  const message = generateMessage(session.form, trans);
  
  const finalMessages = {
    fr: '✅ *Votre message de consentement est prêt\\!*\n\nVous pouvez le copier et l\'envoyer à l\'autre personne\\.',
    en: '✅ *Your consent message is ready\\!*\n\nYou can copy and send it to the other person\\.',
    es: '✅ *¡Tu mensaje de consentimiento está listo\\!*\n\nPuedes copiarlo y enviarlo a la otra persona\\.',
    it: '✅ *Il tuo messaggio di consenso è pronto\\!*\n\nPuoi copiarlo e inviarlo all\'altra persona\\.'
  };
  
  ctx.replyWithMarkdownV2(finalMessages[session.lang]);
  ctx.reply(message);
  
  // Réinitialiser la session
  session.step = null;
  session.form = {
    initiateur: { prenom: '', nom: '' },
    partenaire: { prenom: '', nom: '' },
    date: new Date().toLocaleDateString('fr-FR'),
    lieu: '',
    category: '',
    clauses: [],
    clauseLibre: '',
    safeword: '',
    validite: '24h'
  };
}


// Exporter pour Netlify Functions
module.exports = bot;
