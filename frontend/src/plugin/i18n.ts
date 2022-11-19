import { createI18n } from 'vue-i18n';
import type { DefineNumberFormat } from 'vue-i18n';
import { en, NF_en } from './en.translation';
import { de, NF_de } from './de.translation';
import { es, NF_es } from './es.translation';
import { it, NF_it } from './it.translation';
import { ru, NF_ru } from './ru.translation';
import { fr, NF_fr } from './fr.translation';
import { uk, NF_uk } from './uk.translation';
import { pl, NF_pl } from './pl.translation';
import { tr, NF_tr } from './tr.translation';

const messages = {
  'en-US': en,
  'de-DE': de,
  'es-ES': es,
  'fr-FR': fr,
  'it-IT': it,
  'ru-RU': ru,
  'uk-UK': uk,
  'pl-PL': pl,
  'tr-TR': tr,
};

const numberFormats = {
  'en-US': NF_en,
  'de-DE': NF_de,
  'es-ES': NF_es,
  'fr-FR': NF_fr,
  'it-IT': NF_it,
  'ru-RU': NF_ru,
  'uk-UK': NF_uk,
  'pl-PL': NF_pl,
  'tr-TR': NF_tr,
} as { [key: string]: DefineNumberFormat };

export const i18n = createI18n({
  // Set manually to test, because my browser always defaults to english
  // locale: 'de-DE',
  // locale: 'fr-FR',
  legacy: false,
  //locale: navigator.language.substr,
  fallbackLocale: 'en-US',
  messages,
  numberFormats,
});
