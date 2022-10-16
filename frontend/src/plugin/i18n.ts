import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    LoginView: {
      welcome1: 'please log in',
      welcome2: 'to experience the full fun of',
      welcome3: 'PongKing',
      loginbutton: 'Login',
    },
  },
  de: {
    LoginView: {
      welcome1: 'Bitte melde dich an',
      welcome2: 'um den ganzen Spaß von',
      welcome3: 'PongKing zu erleben',
      loginbutton: 'Anmelden',
    },
  },
};

export const i18n = createI18n({
  // Set manually to test, because my browser always defaults to english
  //locale: 'de',
  locale: navigator.language.substr(0, 2),
  fallbackLocale: 'en',
  messages,
});
