import messages from './translations';
import {createI18n} from 'vue-i18n';
const i18n = createI18n(messages);
type LangCodes = 'en' | 'ru';

/**
 * @function switchTo
 * @param {LangCodes} lang
 * @description Function for switch app to specific language
 */
const switchTo = (lang: LangCodes) => {
  i18n.global.locale = lang;
}
export default i18n;
export { switchTo };
export type { LangCodes };
