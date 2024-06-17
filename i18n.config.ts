import fr from './locales/fr.json'
import en from './locales/en.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'fr',
  messages: {
    en: en,
    fr: fr,
  },
}))
