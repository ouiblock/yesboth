const { Telegraf, Markup } = require('telegraf');
const { getStore } = require('@netlify/blobs');

// Store de sessions persistant (Netlify Blobs) avec fallback mémoire locale
// pour les dev environments sans Netlify Blobs disponible.
const memoryFallback = new Map();
let blobsStore = null;

function getStoreSafe() {
  if (blobsStore) return blobsStore;
  try {
    blobsStore = getStore({ name: 'telegram-sessions', consistency: 'strong' });
    return blobsStore;
  } catch (e) {
    console.warn('[sessions] Netlify Blobs indisponible, fallback mémoire :', e.message);
    return null;
  }
}

const DEFAULT_SESSION = () => ({
  lang: 'en',
  step: null,
  form: {
    initiateur: { prenom: '', nom: '' },
    partenaire: { prenom: '', nom: '' },
    date: new Date().toLocaleDateString('en-US'),
    lieu: '',
    category: '',
    clauses: [],
    clauseLibre: '',
    safeword: '',
    validite: '24h'
  }
});

async function loadSession(chatId) {
  const key = String(chatId);
  const store = getStoreSafe();
  if (store) {
    try {
      const data = await store.get(key, { type: 'json' });
      if (data) return data;
    } catch (e) {
      console.error('[sessions] load error:', e.message);
    }
  } else if (memoryFallback.has(key)) {
    return memoryFallback.get(key);
  }
  const fresh = DEFAULT_SESSION();
  await saveSession(chatId, fresh);
  return fresh;
}

async function saveSession(chatId, session) {
  const key = String(chatId);
  const store = getStoreSafe();
  if (store) {
    try {
      await store.setJSON(key, session);
      return;
    } catch (e) {
      console.error('[sessions] save error:', e.message);
    }
  }
  memoryFallback.set(key, session);
}

async function clearSession(chatId) {
  const key = String(chatId);
  const store = getStoreSafe();
  if (store) {
    try { await store.delete(key); return; } catch (e) { /* ignore */ }
  }
  memoryFallback.delete(key);
}

// Mapping des locales pour formatage de date
const dateLocales = {
  fr: 'fr-FR',
  en: 'en-US',
  es: 'es-ES',
  it: 'it-IT',
  zh: 'zh-CN',
  ru: 'ru-RU',
  uk: 'uk-UA',
  ar: 'ar-SA'
};

// Traductions
const translations = {
  fr: {
    header: "MESSAGE DE CONSENTEMENT",
    between: "Entre",
    and: "et",
    yes: "✅",
    safeword: "🔴 Mot de sécurité:",
    safewordNote: "(arrêt immédiat si prononcé)",
    customClause: "📝 Clause personnalisée:",
    validity: "⏱️ Validité:",
    validityMap: {
      ce_soir: "Ce soir uniquement",
      "24h": "24 heures",
      "7j": "7 jours",
      "30j": "30 jours",
      indefini: "Indéfinie (révocable à tout moment)"
    },
    revocable: "🔄 Ce consentement est RÉVOCABLE à tout moment, sans justification.",
    validation: "✍️ Pour validation, merci d'envoyer à",
    validationText: "le message suivant : \"J'accepte ces termes. Signé",
    warning: "⚠️ RAPPEL : Le refus verbal/gestuel prévaut TOUJOURS. Le silence ne vaut pas consentement.",
    legalRef: "⚖️ Référence légale : art. 222-22 s. C. pénal & art. 1366-1367 C. civ. — France",
    reference: "📱 Généré via YesBoth — www.yesboth.com"
  },
  en: {
    header: "CONSENT MESSAGE",
    between: "Between",
    and: "and",
    yes: "✅",
    safeword: "🔴 Safeword:",
    safewordNote: "(immediate stop if spoken)",
    customClause: "📝 Custom clause:",
    validity: "⏱️ Validity:",
    validityMap: {
      ce_soir: "Tonight only",
      "24h": "24 hours",
      "7j": "7 days",
      "30j": "30 days",
      indefini: "Indefinite (revocable at any time)"
    },
    revocable: "🔄 This consent is REVOCABLE at any time, without justification.",
    validation: "✍️ For validation, please send to",
    validationText: "the following message: \"I accept these terms. Signed",
    warning: "⚠️ REMINDER: Verbal/physical refusal ALWAYS prevails. Silence does not mean consent.",
    legalRef: "⚖️ Legal reference: Sexual Offences Act 2003, s. 74 — UK",
    reference: "📱 Generated via YesBoth — www.yesboth.com"
  },
  es: {
    header: "MENSAJE DE CONSENTIMIENTO",
    between: "Entre",
    and: "y",
    yes: "✅",
    safeword: "🔴 Palabra de seguridad:",
    safewordNote: "(parada inmediata si se pronuncia)",
    customClause: "📝 Cláusula personalizada:",
    validity: "⏱️ Validez:",
    validityMap: {
      ce_soir: "Solo esta noche",
      "24h": "24 horas",
      "7j": "7 días",
      "30j": "30 días",
      indefini: "Indefinida (revocable en cualquier momento)"
    },
    revocable: "🔄 Este consentimiento es REVOCABLE en cualquier momento, sin justificación.",
    validation: "✍️ Para validación, envíe a",
    validationText: "el siguiente mensaje: \"Acepto estos términos. Firmado",
    warning: "⚠️ RECORDATORIO: El rechazo verbal/físico SIEMPRE prevalece. El silencio no significa consentimiento.",
    legalRef: "⚖️ Referencia legal: LO 10/2022 de libertad sexual y art. 178 Código Penal — España",
    reference: "📱 Generado vía YesBoth — www.yesboth.com"
  },
  it: {
    header: "MESSAGGIO DI CONSENSO",
    between: "Tra",
    and: "e",
    yes: "✅",
    safeword: "🔴 Parola di sicurezza:",
    safewordNote: "(arresto immediato se pronunciata)",
    customClause: "📝 Clausola personalizzata:",
    validity: "⏱️ Validità:",
    validityMap: {
      ce_soir: "Solo stasera",
      "24h": "24 ore",
      "7j": "7 giorni",
      "30j": "30 giorni",
      indefini: "Indefinita (revocabile in qualsiasi momento)"
    },
    revocable: "🔄 Questo consenso è REVOCABILE in qualsiasi momento, senza giustificazione.",
    validation: "✍️ Per la convalida, inviare a",
    validationText: "il seguente messaggio: \"Accetto questi termini. Firmato",
    warning: "⚠️ PROMEMORIA: Il rifiuto verbale/fisico prevale SEMPRE. Il silenzio non significa consenso.",
    legalRef: "⚖️ Riferimento legale: art. 609-bis Codice penale — Italia",
    reference: "📱 Generato tramite YesBoth — www.yesboth.com"
  },
  zh: {
    header: "同意消息",
    between: "在",
    and: "和",
    yes: "✅",
    safeword: "🔴 安全词:",
    safewordNote: "(说出即立即停止)",
    customClause: "📝 自定义条款:",
    validity: "⏱️ 有效期:",
    validityMap: { ce_soir: "仅今晚", "24h": "24小时", "7j": "7天", "30j": "30天", indefini: "无限期（随时可撤销）" },
    revocable: "🔄 此同意随时可撤销，无需理由。",
    validation: "✍️ 为验证，请发送给",
    validationText: "以下消息：\"我接受这些条款。签名",
    warning: "⚠️ 提醒：口头/肢体拒绝始终优先。沉默不代表同意。",
    legalRef: "⚖️ 法律参考：《中华人民共和国刑法》第236条",
    reference: "📱 由 YesBoth 生成 — www.yesboth.com"
  },
  ru: {
    header: "СООБЩЕНИЕ О СОГЛАСИИ",
    between: "Между",
    and: "и",
    yes: "✅",
    safeword: "🔴 Безопасное слово:",
    safewordNote: "(немедленная остановка при произнесении)",
    customClause: "📝 Индивидуальный пункт:",
    validity: "⏱️ Срок действия:",
    validityMap: { ce_soir: "Только сегодня вечером", "24h": "24 часа", "7j": "7 дней", "30j": "30 дней", indefini: "Бессрочно (отзываемо в любой момент)" },
    revocable: "🔄 Это согласие ОТЗЫВАЕМО в любой момент, без обоснования.",
    validation: "✍️ Для подтверждения отправьте",
    validationText: "следующее сообщение: \"Я принимаю эти условия. Подписано",
    warning: "⚠️ НАПОМИНАНИЕ: Устный/физический отказ ВСЕГДА имеет приоритет. Молчание не означает согласие.",
    legalRef: "⚖️ Правовая ссылка: ст. 131-135 УК РФ — Россия",
    reference: "📱 Создано через YesBoth — www.yesboth.com"
  },
  uk: {
    header: "ПОВІДОМЛЕННЯ ПРО ЗГОДУ",
    between: "Між",
    and: "та",
    yes: "✅",
    safeword: "🔴 Безпечне слово:",
    safewordNote: "(негайна зупинка при вимові)",
    customClause: "📝 Індивідуальний пункт:",
    validity: "⏱️ Термін дії:",
    validityMap: { ce_soir: "Тільки сьогодні ввечері", "24h": "24 години", "7j": "7 днів", "30j": "30 днів", indefini: "Безстроково (відкличне в будь-який момент)" },
    revocable: "🔄 Ця згода ВІДКЛИЧНА в будь-який момент, без обґрунтування.",
    validation: "✍️ Для підтвердження надішліть",
    validationText: "таке повідомлення: \"Я приймаю ці умови. Підписано",
    warning: "⚠️ НАГАДУВАННЯ: Усна/фізична відмова ЗАВЖДИ має пріоритет. Мовчання не означає згоду.",
    legalRef: "⚖️ Правове посилання: ст. 152 КК України — «добровільна згода»",
    reference: "📱 Створено через YesBoth — www.yesboth.com"
  },
  ar: {
    header: "رسالة الموافقة",
    between: "بين",
    and: "و",
    yes: "✅",
    safeword: "🔴 كلمة الأمان:",
    safewordNote: "(توقف فوري عند النطق بها)",
    customClause: "📝 بند مخصص:",
    validity: "⏱️ مدة الصلاحية:",
    validityMap: { ce_soir: "الليلة فقط", "24h": "24 ساعة", "7j": "7 أيام", "30j": "30 يوماً", indefini: "غير محدد (قابل للإلغاء في أي وقت)" },
    revocable: "🔄 هذه الموافقة قابلة للإلغاء في أي وقت، دون مبرر.",
    validation: "✍️ للتأكيد، أرسل إلى",
    validationText: "الرسالة التالية: \"أقبل هذه الشروط. موقع",
    warning: "⚠️ تذكير: الرفض الشفهي/الجسدي يتقدم دائماً. الصمت لا يعني الموافقة.",
    legalRef: "⚖️ المرجع: التشريعات المحلية المعمول بها (مثلاً المادة 267 من قانون العقوبات المصري، المادتان 485-486 من القانون الجنائي المغربي)",
    reference: "📱 تم إنشاؤه عبر YesBoth — www.yesboth.com"
  }
};

// Fonction pour générer le message
const generateMessage = (form, trans) => {
  const { initiateur, partenaire, date, lieu, clauses, clauseLibre, safeword, validite } = form;
  const prenomA = `${initiateur.prenom} ${initiateur.nom}`;
  const prenomB = `${partenaire.prenom} ${partenaire.nom}`;
  const lieuText = lieu ? ` — ${lieu}` : '';

  const dureeMap = trans.validityMap;

  const clauseLines = clauses
    .filter(c => c.state === true || c.state === 'yes')
    .map(c => `${trans.yes} ${c.label}`)
    .join('\n');

  const safewordLine = safeword
    ? `\n${trans.safeword} "${safeword}" ${trans.safewordNote}`
    : '';

  const clauseLibreLine = clauseLibre
    ? `\n${trans.customClause} ${clauseLibre}`
    : '';

  return `─────────────────────────────────
${trans.header} — ${date}${lieuText}

${trans.between} ${prenomA} ${trans.and} ${prenomB}.

${clauseLines}${safewordLine}${clauseLibreLine}

${trans.validity} ${dureeMap[validite] || validite}

${trans.revocable}

${trans.validation} ${prenomB} ${trans.validationText} ${prenomB}, ${date}."

${trans.warning}

${trans.legalRef}

${trans.reference}
─────────────────────────────────`;
};

// Initialiser le bot
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Alias rétro-compatible : retourne une promesse de session
const getSession = (chatId) => loadSession(chatId);

// Commandes
const startMessages = {
  fr: '🎯 Bienvenue sur YesBoth Bot\n\nOutil de communication pour consentement clair entre adultes.\n\n⚠️ Ceci est un outil d\'aide à la communication, pas un contrat juridique.\n\nTapez /consent pour commencer.',
  en: '🎯 Welcome to YesBoth Bot\n\nCommunication tool for clear consent between adults.\n\n⚠️ This is a communication aid, not a legal contract.\n\nType /consent to start.',
  es: '🎯 Bienvenido a YesBoth Bot\n\nHerramienta de comunicación para el consentimiento claro entre adultos.\n\n⚠️ Esta es una herramienta de comunicación, no un contrato legal.\n\nEscribe /consent para empezar.',
  it: '🎯 Benvenuto su YesBoth Bot\n\nStrumento di comunicazione per il consenso chiaro tra adulti.\n\n⚠️ Questo è uno strumento di comunicazione, non un contratto legale.\n\nDigita /consent per iniziare.',
  zh: '🎯 欢迎使用 YesBoth Bot\n\n成人间清晰同意的沟通工具。\n\n⚠️ 这是沟通辅助工具，非法律合同。\n\n输入 /consent 开始。',
  ru: '🎯 Добро пожаловать в YesBoth Bot\n\nИнструмент коммуникации для чёткого согласия между взрослыми.\n\n⚠️ Это инструмент коммуникации, не юридический контракт.\n\nВведите /consent для начала.',
  uk: '🎯 Ласкаво просимо до YesBoth Bot\n\nІнструмент комунікації для чіткої згоди між дорослими.\n\n⚠️ Це інструмент комунікації, не юридичний контракт.\n\nВведіть /consent для початку.',
  ar: '🎯 مرحباً بك في YesBoth Bot\n\nأداة تواصل للموافقة الواضحة بين البالغين.\n\n⚠️ هذه أداة تواصل، وليست عقداً قانونياً.\n\nاكتب /consent للبدء.'
};

const cancelMessages = {
  fr: '❌ Création annulée. Tapez /consent pour recommencer.',
  en: '❌ Creation cancelled. Type /consent to start again.',
  es: '❌ Creación cancelada. Escribe /consent para empezar de nuevo.',
  it: '❌ Creazione annullata. Digita /consent per ricominciare.',
  zh: '❌ 已取消。输入 /consent 重新开始。',
  ru: '❌ Создание отменено. Введите /consent чтобы начать снова.',
  uk: '❌ Створення скасовано. Введіть /consent щоб почати знову.',
  ar: '❌ تم الإلغاء. اكتب /consent للبدء من جديد.'
};

bot.start(async (ctx) => {
  try {
    const session = await loadSession(ctx.chat.id);
    const lang = session.lang || 'en';
    session.step = null;
    await saveSession(ctx.chat.id, session);
    ctx.reply(startMessages[lang] || startMessages.en);
  } catch (e) { console.error('[start]', e); }
});

bot.help(async (ctx) => {
  try {
  const session = await loadSession(ctx.chat.id);
  const lang = session.lang || 'en';
  const helpMessages = {
    fr: '📖 Commandes disponibles :\n\n/start — Démarrer le bot\n/consent — Créer un message de consentement\n/info — Informations sur YesBoth\n/legal — Mentions légales\n/cancel — Annuler la création en cours\n/help — Afficher cette aide\n\n🚀 Tapez /consent pour commencer !',
    en: '📖 Available commands:\n\n/start — Start the bot\n/consent — Create a consent message\n/info — About YesBoth\n/legal — Legal notice\n/cancel — Cancel current creation\n/help — Show this help\n\n🚀 Type /consent to start!',
    es: '📖 Comandos disponibles:\n\n/start — Iniciar el bot\n/consent — Crear un mensaje de consentimiento\n/info — Información sobre YesBoth\n/legal — Aviso legal\n/cancel — Cancelar la creación actual\n/help — Mostrar esta ayuda\n\n🚀 ¡Escribe /consent para empezar!',
    it: '📖 Comandi disponibili:\n\n/start — Avvia il bot\n/consent — Crea un messaggio di consenso\n/info — Informazioni su YesBoth\n/legal — Note legali\n/cancel — Annulla la creazione corrente\n/help — Mostra questa guida\n\n🚀 Digita /consent per iniziare!',
    zh: '📖 可用命令：\n\n/start — 启动机器人\n/consent — 创建同意消息\n/info — 关于 YesBoth\n/cancel — 取消当前创建\n/help — 显示此帮助\n\n🚀 输入 /consent 开始！',
    ru: '📖 Доступные команды:\n\n/start — Запустить бота\n/consent — Создать сообщение о согласии\n/info — О YesBoth\n/cancel — Отменить текущее создание\n/help — Показать эту справку\n\n🚀 Введите /consent чтобы начать!',
    uk: '📖 Доступні команди:\n\n/start — Запустити бота\n/consent — Створити повідомлення про згоду\n/info — Про YesBoth\n/cancel — Скасувати поточне створення\n/help — Показати цю довідку\n\n🚀 Введіть /consent щоб почати!',
    ar: '📖 الأوامر المتاحة:\n\n/start — تشغيل البوت\n/consent — إنشاء رسالة موافقة\n/info — حول YesBoth\n/cancel — إلغاء الإنشاء الحالي\n/help — عرض هذه المساعدة\n\n🚀 اكتب /consent للبدء!'
  };
  ctx.reply(helpMessages[lang] || helpMessages.en);
  } catch (e) { console.error('[help]', e); }
});

bot.command('cancel', async (ctx) => {
  try {
    const session = await loadSession(ctx.chat.id);
    const lang = session.lang || 'en';
    session.step = null;
    await saveSession(ctx.chat.id, session);
    ctx.reply(cancelMessages[lang] || cancelMessages.en);
  } catch (e) { console.error('[cancel]', e); }
});

bot.command('consent', async (ctx) => {
  try {
    // Réinitialiser la session pour permettre un nouveau consentement
    const session = await loadSession(ctx.chat.id);
    const fresh = DEFAULT_SESSION();
    fresh.lang = session.lang || 'en';
    await saveSession(ctx.chat.id, fresh);
    const keyboard = Markup.inlineKeyboard([
      [Markup.button.callback('🇫🇷 Français', 'lang_fr'), Markup.button.callback('🇬🇧 English', 'lang_en')],
      [Markup.button.callback('🇪🇸 Español', 'lang_es'), Markup.button.callback('🇮🇹 Italiano', 'lang_it')],
      [Markup.button.callback('🇨🇳 中文', 'lang_zh'), Markup.button.callback('🇷🇺 Русский', 'lang_ru')],
      [Markup.button.callback('🇺🇦 Українська', 'lang_uk'), Markup.button.callback('🇸🇦 العربية', 'lang_ar')]
    ]);
    ctx.reply('🌍 Choose language / Choisissez la langue:', keyboard);
  } catch (e) { console.error('[consent]', e); }
});

const infoMessages = {
  fr: 'ℹ️ À propos de YesBoth\n\n✅ 100% privé et sécurisé\n✅ Aucune collecte de données\n✅ Multilingue (8 langues)\n✅ Gratuit pour usage personnel\n\nOutil de communication pour adultes consentants.\n\n🌐 www.yesboth.com',
  en: 'ℹ️ About YesBoth\n\n✅ 100% private and secure\n✅ No data collection\n✅ Multilingual (8 languages)\n✅ Free for personal use\n\nCommunication tool for consenting adults.\n\n🌐 www.yesboth.com',
  es: 'ℹ️ Sobre YesBoth\n\n✅ 100% privado y seguro\n✅ Sin recopilación de datos\n✅ Multilingüe (8 idiomas)\n✅ Gratis para uso personal\n\nHerramienta de comunicación para adultos que consienten.\n\n🌐 www.yesboth.com',
  it: 'ℹ️ Informazioni su YesBoth\n\n✅ 100% privato e sicuro\n✅ Nessuna raccolta dati\n✅ Multilingue (8 lingue)\n✅ Gratuito per uso personale\n\nStrumento di comunicazione per adulti consenzienti.\n\n🌐 www.yesboth.com',
  zh: 'ℹ️ 关于 YesBoth\n\n✅ 100% 私密安全\n✅ 不收集数据\n✅ 多语言（8种语言）\n✅ 个人使用免费\n\n成人间同意的沟通工具。\n\n🌐 www.yesboth.com',
  ru: 'ℹ️ О YesBoth\n\n✅ 100% конфиденциально и безопасно\n✅ Без сбора данных\n✅ Многоязычный (8 языков)\n✅ Бесплатно для личного использования\n\nИнструмент коммуникации для согласных взрослых.\n\n🌐 www.yesboth.com',
  uk: 'ℹ️ Про YesBoth\n\n✅ 100% приватно та безпечно\n✅ Без збору даних\n✅ Багатомовний (8 мов)\n✅ Безкоштовно для особистого використання\n\nІнструмент комунікації для згодних дорослих.\n\n🌐 www.yesboth.com',
  ar: 'ℹ️ حول YesBoth\n\n✅ خاص وآمن 100%\n✅ لا جمع للبيانات\n✅ متعدد اللغات (8 لغات)\n✅ مجاني للاستخدام الشخصي\n\nأداة تواصل للبالغين الراضين.\n\n🌐 www.yesboth.com'
};

const legalMessages = {
  fr: '⚖️ Mention légale importante\n\nYesBoth est un outil de communication uniquement.\n\n❌ Ce n\'est PAS un contrat juridique\n❌ Ce n\'est PAS un acte notarié\n❌ Ce n\'est PAS un service juridique\n\n✅ La responsabilité repose sur les parties\n✅ Le consentement reste révocable à tout moment\n✅ Le refus verbal/gestuel prévaut toujours\n\n⚖️ Référence légale : art. 222-22 s. C. pénal & art. 1366-1367 C. civ. — France\n\nDéveloppé par SAS BASK\'IN BIARRITZ\n257 Avenue d\'Atherbea, 64210 Bidart, France',
  en: '⚖️ Important legal notice\n\nYesBoth is a communication tool only.\n\n❌ It is NOT a legal contract\n❌ It is NOT a notarized document\n❌ It is NOT a legal service\n\n✅ Responsibility lies with the parties\n✅ Consent remains revocable at any time\n✅ Verbal/physical refusal always prevails\n\n⚖️ Legal reference: Sexual Offences Act 2003, s. 74 — UK\n\nDeveloped by SAS BASK\'IN BIARRITZ\n257 Avenue d\'Atherbea, 64210 Bidart, France',
  es: '⚖️ Aviso legal importante\n\nYesBoth es solo una herramienta de comunicación.\n\n❌ NO es un contrato legal\n❌ NO es un acta notarial\n❌ NO es un servicio legal\n\n✅ La responsabilidad recae en las partes\n✅ El consentimiento es revocable en todo momento\n✅ El rechazo verbal/físico siempre prevalece\n\n⚖️ Referencia legal: LO 10/2022 y art. 178 Código Penal — España\n\nDesarrollado por SAS BASK\'IN BIARRITZ\n257 Avenue d\'Atherbea, 64210 Bidart, Francia',
  it: '⚖️ Avviso legale importante\n\nYesBoth è solo uno strumento di comunicazione.\n\n❌ NON è un contratto legale\n❌ NON è un atto notarile\n❌ NON è un servizio legale\n\n✅ La responsabilità è delle parti\n✅ Il consenso è revocabile in qualsiasi momento\n✅ Il rifiuto verbale/fisico prevale sempre\n\n⚖️ Riferimento legale: art. 609-bis Codice penale — Italia\n\nSviluppato da SAS BASK\'IN BIARRITZ\n257 Avenue d\'Atherbea, 64210 Bidart, Francia',
  zh: '⚖️ 重要法律声明\n\nYesBoth 仅为沟通工具。\n\n❌ 这不是法律合同\n❌ 这不是公证文件\n❌ 这不是法律服务\n\n✅ 责任由当事人承担\n✅ 同意随时可撤销\n✅ 口头/肢体拒绝始终优先\n\n⚖️ 法律参考：《中华人民共和国刑法》第236条\n\n由 SAS BASK\'IN BIARRITZ 开发\n法国 64210 Bidart, 257 Avenue d\'Atherbea',
  ru: '⚖️ Важное правовое уведомление\n\nYesBoth — это только инструмент коммуникации.\n\n❌ Это НЕ юридический договор\n❌ Это НЕ нотариальный акт\n❌ Это НЕ юридическая услуга\n\n✅ Ответственность лежит на сторонах\n✅ Согласие отзываемо в любой момент\n✅ Устный/физический отказ всегда имеет приоритет\n\n⚖️ Правовая ссылка: ст. 131-135 УК РФ — Россия\n\nРазработано SAS BASK\'IN BIARRITZ\n257 Avenue d\'Atherbea, 64210 Bidart, Франция',
  uk: '⚖️ Важливе правове повідомлення\n\nYesBoth — це лише інструмент комунікації.\n\n❌ Це НЕ юридичний договір\n❌ Це НЕ нотаріальний акт\n❌ Це НЕ юридична послуга\n\n✅ Відповідальність лежить на сторонах\n✅ Згода відклична в будь-який момент\n✅ Усна/фізична відмова завжди має пріоритет\n\n⚖️ Правове посилання: ст. 152 КК України — «добровільна згода»\n\nРозроблено SAS BASK\'IN BIARRITZ\n257 Avenue d\'Atherbea, 64210 Bidart, Франція',
  ar: '⚖️ إشعار قانوني مهم\n\nYesBoth هي أداة تواصل فقط.\n\n❌ ليست عقداً قانونياً\n❌ ليست وثيقة موثقة\n❌ ليست خدمة قانونية\n\n✅ المسؤولية تقع على الأطراف\n✅ الموافقة قابلة للإلغاء في أي وقت\n✅ الرفض الشفهي/الجسدي له الأولوية دائماً\n\n⚖️ المرجع: التشريعات المحلية المعمول بها (مثلاً المادة 267 من قانون العقوبات المصري، المادتان 485-486 من القانون الجنائي المغربي)\n\nتم تطويرها بواسطة SAS BASK\'IN BIARRITZ\n257 Avenue d\'Atherbea, 64210 Bidart, فرنسا'
};

bot.command('info', async (ctx) => {
  try {
    const session = await getSession(ctx.chat.id);
    const lang = session.lang || 'en';
    ctx.reply(infoMessages[lang] || infoMessages.en);
  } catch (e) { console.error('[info]', e); }
});

bot.command('legal', async (ctx) => {
  try {
    const session = await getSession(ctx.chat.id);
    const lang = session.lang || 'en';
    ctx.reply(legalMessages[lang] || legalMessages.en);
  } catch (e) { console.error('[legal]', e); }
});

// Gestion de la sélection de langue
bot.action(/lang_(.+)/, async (ctx) => {
  try {
  const lang = ctx.match[1];
  const session = await loadSession(ctx.chat.id);
  session.lang = lang;
  session.form.date = new Date().toLocaleDateString(dateLocales[lang] || 'en-US');
  session.step = 'initiator_firstname';
  await saveSession(ctx.chat.id, session);
  
  const messages = {
    fr: '✅ Langue sélectionnée : Français\n\n👤 Quel est VOTRE prénom ?',
    en: '✅ Language selected: English\n\n👤 What is YOUR first name?',
    es: '✅ Idioma seleccionado: Español\n\n👤 ¿Cuál es TU nombre?',
    it: '✅ Lingua selezionata: Italiano\n\n👤 Qual è il TUO nome?',
    zh: '✅ 已选择语言：中文\n\n👤 您的名字是？',
    ru: '✅ Язык выбран: Русский\n\n👤 Введите ВАШЕ имя:',
    uk: '✅ Мову вибрано: Українська\n\n👤 Яке ВАШЕ ім\'я?',
    ar: '✅ تم اختيار اللغة: العربية\n\n👤 ما هو اسمك الأول؟'
  };
  
  ctx.answerCbQuery();
  ctx.reply(messages[lang] || messages.en);
  } catch (e) { console.error('[lang]', e); }
});

// Gestion des messages texte
bot.on('text', async (ctx) => {
  try {
  // Ignorer les commandes (elles sont gérées par les handlers dédiés)
  if (ctx.message.text.startsWith('/')) return;
  const session = await loadSession(ctx.chat.id);
  if (!session || !session.step) return;
  
  const text = ctx.message.text;
  const lang = session.lang;
  
  const msgs = {
    fr: {
      initiator_firstname: 'Quel est votre NOM DE FAMILLE ?',
      initiator_lastname: '👥 Quel est le PRÉNOM de l\'autre personne ?',
      partner_firstname: 'Quel est son NOM DE FAMILLE ?',
      partner_lastname: '📍 Où se déroule cette rencontre ? (ville, lieu...)\n\n💡 Tapez "skip" pour passer',
    },
    en: {
      initiator_firstname: 'What is your LAST NAME?',
      initiator_lastname: '👥 What is the OTHER person\'s FIRST NAME?',
      partner_firstname: 'What is their LAST NAME?',
      partner_lastname: '📍 Where is this meeting taking place? (city, place...)\n\n💡 Type "skip" to skip',
    },
    es: {
      initiator_firstname: '¿Cuál es tu APELLIDO?',
      initiator_lastname: '👥 ¿Cuál es el NOMBRE de la otra persona?',
      partner_firstname: '¿Cuál es su APELLIDO?',
      partner_lastname: '📍 ¿Dónde tiene lugar este encuentro? (ciudad, lugar...)\n\n💡 Escribe "skip" para omitir',
    },
    it: {
      initiator_firstname: 'Qual è il tuo COGNOME?',
      initiator_lastname: '👥 Qual è il NOME dell\'altra persona?',
      partner_firstname: 'Qual è il suo COGNOME?',
      partner_lastname: '📍 Dove si svolge questo incontro? (città, luogo...)\n\n💡 Digita "skip" per saltare',
    },
    zh: {
      initiator_firstname: '您的姓氏是？',
      initiator_lastname: '👥 对方的名字是？',
      partner_firstname: '对方的姓氏是？',
      partner_lastname: '📍 这次相遇在哪里？（城市、地点...）\n\n💡 输入 "skip" 跳过',
    },
    ru: {
      initiator_firstname: 'Введите вашу ФАМИЛИЮ:',
      initiator_lastname: '👥 Введите ИМЯ другого человека:',
      partner_firstname: 'Введите ФАМИЛИЮ другого человека:',
      partner_lastname: '📍 Где проходит эта встреча? (город, место...)\n\n💡 Введите "skip" чтобы пропустить',
    },
    uk: {
      initiator_firstname: 'Яке ваше ПРІЗВИЩЕ?',
      initiator_lastname: '👥 Яке ІМ\'Я іншої людини?',
      partner_firstname: 'Яке ПРІЗВИЩЕ іншої людини?',
      partner_lastname: '📍 Де відбувається ця зустріч? (місто, місце...)\n\n💡 Введіть "skip" щоб пропустити',
    },
    ar: {
      initiator_firstname: 'ما هو اسم عائلتك؟',
      initiator_lastname: '👥 ما هو الاسم الأول للشخص الآخر؟',
      partner_firstname: 'ما هو اسم عائلة الشخص الآخر؟',
      partner_lastname: '📍 أين تجري هذه المقابلة؟ (مدينة، مكان...)\n\n💡 اكتب "skip" للتخطي',
    }
  };
  
  const m = msgs[lang] || msgs.en;
  switch(session.step) {
    case 'initiator_firstname':
      session.form.initiateur.prenom = text;
      session.step = 'initiator_lastname';
      ctx.reply(m.initiator_firstname);
      break;
    case 'initiator_lastname':
      session.form.initiateur.nom = text;
      session.step = 'partner_firstname';
      ctx.reply(m.initiator_lastname);
      break;
    case 'partner_firstname':
      session.form.partenaire.prenom = text;
      session.step = 'partner_lastname';
      ctx.reply(m.partner_firstname);
      break;
    case 'partner_lastname':
      session.form.partenaire.nom = text;
      session.step = 'location';
      ctx.reply(m.partner_lastname);
      break;
    case 'location':
      if (text.toLowerCase() !== 'skip') {
        session.form.lieu = text;
      }
      session.step = 'category';
      showCategories(ctx, lang);
      break;
    case 'clause_selection': {
      const total = session.form.clauses.length;
      const numbers = text.split(/[\s,]+/).map(n => parseInt(n, 10) - 1).filter(n => !isNaN(n) && n >= 0 && n < total);
      if (numbers.length === 0 && text.toLowerCase() !== 'skip') {
        const errorMsgs = {
          fr: '⚠️ Réponse invalide. Tapez les numéros séparés par des espaces (ex : 1 3 5) ou "skip" pour n\'en choisir aucune.',
          en: '⚠️ Invalid reply. Type numbers separated by spaces (e.g., 1 3 5) or "skip" to pick none.',
          es: '⚠️ Respuesta no válida. Escribe números separados por espacios (ej: 1 3 5) o "skip" para no elegir ninguna.',
          it: '⚠️ Risposta non valida. Digita i numeri separati da spazi (es: 1 3 5) o "skip" per non sceglierne nessuna.',
          zh: '⚠️ 回复无效。请用空格分隔数字（例如：1 3 5）或输入 "skip" 跳过。',
          ru: '⚠️ Неверный ответ. Введите числа через пробел (напр. 1 3 5) или "skip" чтобы пропустить.',
          uk: '⚠️ Невірна відповідь. Введіть числа через пробіл (напр. 1 3 5) або "skip" щоб пропустити.',
          ar: '⚠️ إجابة غير صالحة. اكتب الأرقام مفصولة بمسافات (مثال: 1 3 5) أو "skip" لتخطيها.'
        };
        ctx.reply(errorMsgs[lang] || errorMsgs.en);
        await saveSession(ctx.chat.id, session);
        return;
      }
      numbers.forEach(i => { if (session.form.clauses[i]) session.form.clauses[i].state = true; });
      session.step = 'safeword';
      await saveSession(ctx.chat.id, session);
      askSafeword(ctx, lang);
      break;
    }
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
      await saveSession(ctx.chat.id, session);
      showValidity(ctx, lang);
      break;
  }
  await saveSession(ctx.chat.id, session);
  } catch (e) { console.error('[text]', e); }
});

// Afficher les catégories
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
    },
    zh: {
      title: '选择同意类别？',
      buttons: [
        ['💞 亲密关系', 'cat_intimite'],
        ['🎭 BDSM/特殊', 'cat_nsfw'],
        ['🤝 一般关系', 'cat_relation']
      ]
    },
    ru: {
      title: 'Какая категория согласия?',
      buttons: [
        ['💞 Интимные отношения', 'cat_intimite'],
        ['🎭 БДСМ/Фетиш', 'cat_nsfw'],
        ['🤝 Общие отношения', 'cat_relation']
      ]
    },
    uk: {
      title: 'Яка категорія згоди?',
      buttons: [
        ['💞 Інтимні стосунки', 'cat_intimite'],
        ['🎭 БДСМ/Фетиш', 'cat_nsfw'],
        ['🤝 Загальні стосунки', 'cat_relation']
      ]
    },
    ar: {
      title: 'أي فئة موافقة؟',
      buttons: [
        ['💞 علاقة حميمة', 'cat_intimite'],
        ['🎭 BDSM/فتيش', 'cat_nsfw'],
        ['🤝 علاقة عامة', 'cat_relation']
      ]
    }
  };
  
  const cat = categories[lang] || categories.en;
  const keyboard = Markup.inlineKeyboard(
    cat.buttons.map(([text, data]) => [Markup.button.callback(text, data)])
  );
  
  ctx.reply(cat.title, keyboard);
}

// Gestion de la sélection de catégorie
bot.action(/cat_(.+)/, async (ctx) => {
  try {
    const category = ctx.match[1];
    const session = await loadSession(ctx.chat.id);
    session.form.category = category;
    session.step = 'clauses';
    ctx.answerCbQuery();
    await showClauses(ctx, session.lang, category, session);
    await saveSession(ctx.chat.id, session);
  } catch (e) { console.error('[cat]', e); }
});

// Afficher les clauses (session passée en argument — sync)
function showClauses(ctx, lang, category, session) {
  const clausesData = {
    intimite: {
      fr: ['Baisers', 'Caresses', 'Rapport protégé', 'Rapport non protégé', 'Sexe oral'],
      en: ['Kissing', 'Caressing', 'Protected sex', 'Unprotected sex', 'Oral sex'],
      es: ['Besos', 'Caricias', 'Sexo protegido', 'Sexo sin protección', 'Sexo oral'],
      it: ['Baci', 'Carezze', 'Sesso protetto', 'Sesso non protetto', 'Sesso orale'],
      zh: ['接吻', '爱抚', '有保护性行为', '无保护性行为', '口交'],
      ru: ['Поцелуи', 'Ласки', 'Защищённый секс', 'Незащищённый секс', 'Оральный секс'],
      uk: ['Поцілунки', 'Пестощі', 'Захищений секс', 'Незахищений секс', 'Оральний секс'],
      ar: ['تقبيل', 'مداعبة', 'جنس محمي', 'جنس غير محمي', 'جنس فموي']
    },
    nsfw: {
      fr: ['Bondage léger', 'Domination/Soumission', 'Jeux de rôle', 'Utilisation d\'accessoires'],
      en: ['Light bondage', 'Domination/Submission', 'Role play', 'Use of accessories'],
      es: ['Bondage ligero', 'Dominación/Sumisión', 'Juego de roles', 'Uso de accesorios'],
      it: ['Bondage leggero', 'Dominazione/Sottomissione', 'Gioco di ruolo', 'Uso di accessori'],
      zh: ['轻度束缚', '支配/服从', '角色扮演', '使用道具'],
      ru: ['Лёгкое бондаж', 'Доминирование/Подчинение', 'Ролевые игры', 'Использование аксессуаров'],
      uk: ['Легкий бондаж', 'Домінування/Підкорення', 'Рольові ігри', 'Використання аксесуарів'],
      ar: ['ربط خفيف', 'هيمنة/خضوع', 'لعب الأدوار', 'استخدام الإكسسوارات']
    },
    relation: {
      fr: ['Sorties ensemble', 'Présentation aux amis', 'Exclusivité', 'Communication régulière'],
      en: ['Going out together', 'Meeting friends', 'Exclusivity', 'Regular communication'],
      es: ['Salir juntos', 'Conocer amigos', 'Exclusividad', 'Comunicación regular'],
      it: ['Uscire insieme', 'Incontrare amici', 'Esclusività', 'Comunicazione regolare'],
      zh: ['一起外出', '介绍给朋友', '专一性', '定期沟通'],
      ru: ['Совместные прогулки', 'Знакомство с друзьями', 'Эксклюзивность', 'Регулярное общение'],
      uk: ['Спільні виходи', 'Знайомство з друзями', 'Ексклюзивність', 'Регулярне спілкування'],
      ar: ['الخروج معاً', 'التعرف على الأصدقاء', 'الحصرية', 'التواصل المنتظم']
    }
  };
  
  const effectiveLang = clausesData[category][lang] ? lang : 'en';
  const clauses = clausesData[category][effectiveLang];
  session.form.clauses = clauses.map(label => ({ label, state: false }));
  
  const clauseList = clauses.map((c, i) => `${i + 1}. ${c}`).join('\n');
  const messages = {
    fr: `Sélectionnez les clauses acceptées :\n\n${clauseList}\n\nRépondez avec les numéros séparés par des espaces (ex: 1 3 5)`,
    en: `Select accepted clauses:\n\n${clauseList}\n\nReply with numbers separated by spaces (e.g., 1 3 5)`,
    es: `Seleccione las cláusulas aceptadas:\n\n${clauseList}\n\nResponda con números separados por espacios (ej: 1 3 5)`,
    it: `Seleziona le clausole accettate:\n\n${clauseList}\n\nRispondi con numeri separati da spazi (es: 1 3 5)`,
    zh: `选择已接受的条款：\n\n${clauseList}\n\n用空格分隔的数字回复（例如：1 3 5）`,
    ru: `Выберите принятые пункты:\n\n${clauseList}\n\nОтветьте числами через пробел (например: 1 3 5)`,
    uk: `Виберіть прийняті пункти:\n\n${clauseList}\n\nВідповідайте числами через пробіл (наприклад: 1 3 5)`,
    ar: `اختر البنود المقبولة:\n\n${clauseList}\n\nأجب بأرقام مفصولة بمسافات (مثال: 1 3 5)`
  };
  
  session.step = 'clause_selection';
  ctx.reply(messages[lang] || messages.en);
}

// Demander le safeword
function askSafeword(ctx, lang) {
  const messages = {
    fr: '🔴 Voulez-vous définir un mot de sécurité ?\n\n💡 Tapez le mot ou "skip" pour passer',
    en: '🔴 Do you want to set a safeword?\n\n💡 Type the word or "skip" to skip',
    es: '🔴 ¿Quieres establecer una palabra de seguridad?\n\n💡 Escribe la palabra o "skip" para omitir',
    it: '🔴 Vuoi impostare una parola di sicurezza?\n\n💡 Digita la parola o "skip" per saltare',
    zh: '🔴 是否设置安全词？\n\n💡 输入安全词或 "skip" 跳过',
    ru: '🔴 Хотите задать безопасное слово?\n\n💡 Введите слово или "skip" чтобы пропустить',
    uk: '🔴 Бажаєте встановити безпечне слово?\n\n💡 Введіть слово або "skip" щоб пропустити',
    ar: '🔴 هل تريد تحديد كلمة أمان؟\n\n💡 اكتب الكلمة أو "skip" للتخطي'
  };
  ctx.reply(messages[lang] || messages.en);
}

// Demander clause personnalisée
function askCustomClause(ctx, lang) {
  const messages = {
    fr: '📝 Voulez-vous ajouter une clause personnalisée ?\n\n💡 Tapez la clause ou "skip" pour passer',
    en: '📝 Do you want to add a custom clause?\n\n💡 Type the clause or "skip" to skip',
    es: '📝 ¿Quieres agregar una cláusula personalizada?\n\n💡 Escribe la cláusula o "skip" para omitir',
    it: '📝 Vuoi aggiungere una clausola personalizzata?\n\n💡 Digita la clausola o "skip" per saltare',
    zh: '📝 是否添加自定义条款？\n\n💡 输入条款或 "skip" 跳过',
    ru: '📝 Хотите добавить индивидуальный пункт?\n\n💡 Введите пункт или "skip" чтобы пропустить',
    uk: '📝 Бажаєте додати індивідуальний пункт?\n\n💡 Введіть пункт або "skip" щоб пропустити',
    ar: '📝 هل تريد إضافة بند مخصص؟\n\n💡 اكتب البند أو "skip" للتخطي'
  };
  ctx.reply(messages[lang] || messages.en);
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
    },
    zh: {
      title: '⏱️ 有效期是多久？',
      buttons: [
        ['仅今晚', 'val_ce_soir'],
        ['24小时', 'val_24h'],
        ['7天', 'val_7j'],
        ['30天', 'val_30j'],
        ['无限期', 'val_indefini']
      ]
    },
    ru: {
      title: '⏱️ Каков срок действия?',
      buttons: [
        ['Только сегодня вечером', 'val_ce_soir'],
        ['24 часа', 'val_24h'],
        ['7 дней', 'val_7j'],
        ['30 дней', 'val_30j'],
        ['Бессрочно', 'val_indefini']
      ]
    },
    uk: {
      title: '⏱️ Який термін дії?',
      buttons: [
        ['Тільки сьогодні ввечері', 'val_ce_soir'],
        ['24 години', 'val_24h'],
        ['7 днів', 'val_7j'],
        ['30 днів', 'val_30j'],
        ['Безстроково', 'val_indefini']
      ]
    },
    ar: {
      title: '⏱️ ما هي مدة الصلاحية؟',
      buttons: [
        ['الليلة فقط', 'val_ce_soir'],
        ['24 ساعة', 'val_24h'],
        ['7 أيام', 'val_7j'],
        ['30 يوماً', 'val_30j'],
        ['غير محدد', 'val_indefini']
      ]
    }
  };
  
  const val = validities[lang] || validities.en;
  const keyboard = Markup.inlineKeyboard(
    val.buttons.map(([text, data]) => [Markup.button.callback(text, data)])
  );
  
  ctx.reply(val.title, keyboard);
}

// Gestion de la sélection de validité
bot.action(/val_(.+)/, async (ctx) => {
  try {
  const validity = ctx.match[1];
  const session = await loadSession(ctx.chat.id);
  session.form.validite = validity;
  
  ctx.answerCbQuery();
  
  // Générer et envoyer le message final
  const trans = translations[session.lang];
  const message = generateMessage(session.form, trans);
  
  const finalMessages = {
    fr: '✅ Votre message de consentement est prêt !',
    en: '✅ Your consent message is ready!',
    es: '✅ ¡Tu mensaje de consentimiento está listo!',
    it: '✅ Il tuo messaggio di consenso è pronto!',
    zh: '✅ 您的同意消息已准备好！',
    ru: '✅ Ваше сообщение о согласии готово!',
    uk: '✅ Ваше повідомлення про згоду готове!',
    ar: '✅ رسالة موافقتك جاهزة!'
  };

  const newConsentLabels = {
    fr: '🔄 Créer un nouveau consentement',
    en: '🔄 Create a new consent',
    es: '🔄 Crear un nuevo consentimiento',
    it: '🔄 Crea un nuovo consenso',
    zh: '🔄 创建新同意',
    ru: '🔄 Создать новое согласие',
    uk: '🔄 Створити нову згоду',
    ar: '🔄 إنشاء موافقة جديدة'
  };

  const lang = session.lang || 'fr';
  const newConsentKeyboard = Markup.inlineKeyboard([
    [Markup.button.callback(newConsentLabels[lang] || newConsentLabels.en, 'new_consent')]
  ]);

  ctx.reply(finalMessages[lang] || finalMessages.en);
  ctx.reply(message);
  ctx.reply('─────────────────────────────────', newConsentKeyboard);
  
  // Réinitialiser la session (prêt pour un nouveau consentement)
  const fresh = DEFAULT_SESSION();
  fresh.lang = lang;
  fresh.form.date = new Date().toLocaleDateString(dateLocales[lang] || 'en-US');
  await saveSession(ctx.chat.id, fresh);
  } catch (e) { console.error('[val]', e); }
});

// Bouton nouveau consentement
bot.action('new_consent', async (ctx) => {
  try {
    ctx.answerCbQuery();
    const fresh = DEFAULT_SESSION();
    const existing = await loadSession(ctx.chat.id);
    fresh.lang = existing.lang || 'en';
    await saveSession(ctx.chat.id, fresh);
    const keyboard = Markup.inlineKeyboard([
      [Markup.button.callback('🇫🇷 Français', 'lang_fr'), Markup.button.callback('🇬🇧 English', 'lang_en')],
      [Markup.button.callback('🇪🇸 Español', 'lang_es'), Markup.button.callback('🇮🇹 Italiano', 'lang_it')],
      [Markup.button.callback('🇨🇳 中文', 'lang_zh'), Markup.button.callback('🇷🇺 Русский', 'lang_ru')],
      [Markup.button.callback('🇺🇦 Українська', 'lang_uk'), Markup.button.callback('🇸🇦 العربية', 'lang_ar')]
    ]);
    ctx.reply('🌍 Choose language / Choisissez la langue:', keyboard);
  } catch (e) { console.error('[new_consent]', e); }
});

// Handler pour Netlify Functions
exports.handler = async (event, context) => {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const body = JSON.parse(event.body);
    await bot.handleUpdate(body);
    
    return { statusCode: 200, body: 'OK' };
  } catch (error) {
    console.error('Error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
