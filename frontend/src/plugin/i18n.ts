import { createI18n } from 'vue-i18n';
import type { DefineNumberFormat } from 'vue-i18n';
import { en, NF_en } from './en.translation';
import { de, NF_de } from './de.translation';

const messages = {
  'en-US': en,
  'de-DE': de,
};

const numberFormats = {
  'en-US': NF_en,
  'de-DE': NF_de,
} as { [key: string]: DefineNumberFormat };

export const i18n = createI18n({
  // Set manually to test, because my browser always defaults to english
  locale: 'de-DE',
  legacy: false,
  //locale: navigator.language.substr,
  fallbackLocale: 'en-US',
  messages,
  numberFormats,
});
