import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

import En from './locales/en/translation.json'
import Ja from './locales/ja/translation.json'

export default new VueI18n({
  locale: 'en',
  messages: {
    en: En,
    ja: Ja,
  },
});
