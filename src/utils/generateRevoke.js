export const generateRevoke = (form, t, locale = 'fr') => {
  const { initiateur, partenaire, date } = form
  const prenomA = `${initiateur.prenom} ${initiateur.nom}`
  const prenomB = `${partenaire.prenom} ${partenaire.nom}`
  const now = new Date()
  const revokeDate = now.toLocaleDateString(locale === 'en' ? 'en-US' : locale === 'es' ? 'es-ES' : locale === 'it' ? 'it-IT' : 'fr-FR')
  const revokeTime = now.toLocaleTimeString(locale === 'en' ? 'en-US' : locale === 'es' ? 'es-ES' : locale === 'it' ? 'it-IT' : 'fr-FR', { hour: '2-digit', minute: '2-digit' })

  return `─────────────────────────────────
${t('revoke.header')}

${t('revoke.intro')} ${prenomA}${t('revoke.text')} ${date} ${t('revoke.with')} ${prenomB}.

${t('revoke.cancelled')} ${revokeDate} ${t('revoke.at')} ${revokeTime}.

${t('revoke.noFuture')}

${t('revoke.warning')}
─────────────────────────────────`
}
