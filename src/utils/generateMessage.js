export const generateMessage = (form, t) => {
  const { initiateur, partenaire, date, lieu, clauses, clauseLibre, safeword, validite } = form
  const prenomA = `${initiateur.prenom} ${initiateur.nom}`
  const prenomB = `${partenaire.prenom} ${partenaire.nom}`
  const lieuText = lieu ? ` — ${lieu}` : ''

  const dureeMap = {
    'ce_soir': t('message.validityMap.ce_soir'),
    '24h': t('message.validityMap.24h'),
    '7j': t('message.validityMap.7j'),
    '30j': t('message.validityMap.30j'),
    'indefini': t('message.validityMap.indefini')
  }

  const clauseLines = clauses
    .filter(c => {
      // Inclure UNIQUEMENT les clauses cochées (activées)
      // Exclure les clauses non cochées (false) et les refusées/à discuter
      return c.state === true || c.state === 'yes'
    })
    .map(c => `${t('message.yes')} ${c.label}`)
    .join('\n')

  const safewordLine = safeword
    ? `\n${t('message.safeword')} "${safeword}" ${t('message.safewordNote')}`
    : ''

  const clauseLibreLine = clauseLibre
    ? `\n${t('message.customClause')} ${clauseLibre}`
    : ''

  return `─────────────────────────────────
${t('message.header')} — ${date}${lieuText}

${t('message.between')} ${prenomA} ${t('message.and')} ${prenomB}.

${clauseLines}${safewordLine}${clauseLibreLine}

${t('message.validity')} ${dureeMap[validite] || validite}

${t('message.revocable')}

${t('message.validation')} ${prenomB} ${t('message.validationText')} ${prenomB}, ${date}."

${t('message.warning')}

${t('message.reference')}
─────────────────────────────────`
}
