// Traductions françaises
const fr = {
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
  reference: "📱 Généré via YesBoth — www.yesboth.com"
};

// Traductions anglaises
const en = {
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
  reference: "📱 Generated via YesBoth — www.yesboth.com"
};

// Traductions espagnoles
const es = {
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
  reference: "📱 Generado vía YesBoth — www.yesboth.com"
};

// Traductions italiennes
const it = {
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
  reference: "📱 Generato tramite YesBoth — www.yesboth.com"
};

module.exports = { fr, en, es, it };
