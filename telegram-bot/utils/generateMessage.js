// Utilitaire pour générer le message de consentement
const generateMessage = (form, translations) => {
  const { initiateur, partenaire, date, lieu, clauses, clauseLibre, safeword, validite } = form;
  const prenomA = `${initiateur.prenom} ${initiateur.nom}`;
  const prenomB = `${partenaire.prenom} ${partenaire.nom}`;
  const lieuText = lieu ? ` — ${lieu}` : '';

  const dureeMap = {
    'ce_soir': translations.validityMap.ce_soir,
    '24h': translations.validityMap['24h'],
    '7j': translations.validityMap['7j'],
    '30j': translations.validityMap['30j'],
    'indefini': translations.validityMap.indefini
  };

  const clauseLines = clauses
    .filter(c => c.state === true || c.state === 'yes')
    .map(c => `${translations.yes} ${c.label}`)
    .join('\n');

  const safewordLine = safeword
    ? `\n${translations.safeword} "${safeword}" ${translations.safewordNote}`
    : '';

  const clauseLibreLine = clauseLibre
    ? `\n${translations.customClause} ${clauseLibre}`
    : '';

  return `─────────────────────────────────
${translations.header} — ${date}${lieuText}

${translations.between} ${prenomA} ${translations.and} ${prenomB}.

${clauseLines}${safewordLine}${clauseLibreLine}

${translations.validity} ${dureeMap[validite] || validite}

${translations.revocable}

${translations.validation} ${prenomB} ${translations.validationText} ${prenomB}, ${date}."

${translations.warning}

${translations.reference}
─────────────────────────────────`;
};

module.exports = { generateMessage };
