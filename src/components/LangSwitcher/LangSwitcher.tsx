import { defineComponent } from 'vue';
import {type LangCodes, switchTo} from '@/langs/locale';
import {VBtn, VList, VListItem, VMenu} from 'vuetify/components';
import { WebIcon } from 'mdi-vue3';
import styles from './LangSwitcher.module.less';
import {useI18n} from 'vue-i18n';
import Cookies from 'js-cookie';

/**
 * @class LangSwitcher
 * @description Component for render lang switcher
 */
export default defineComponent({
  name: 'LangSwitcher',
  methods: {

    /**
     * @method LangSwitcher#switch
     * @param {LangCodes} lang
     * @description Method for switch languages of app
     */
    switch(lang: LangCodes) {
      switchTo(lang);
      Cookies.set('lang', lang, { expires: 1 })
    }
  },
  beforeMount() {
     const lang: string = Cookies.get('lang') || 'en';
    switchTo(lang as LangCodes);
  },
  render() {
    const { t } = useI18n();
    return (<VBtn
      color={'transparent'}
      tag={'a'}
      slim={true}
      size={'x-small'}
      rounded={true}
      icon={true}
      class={styles.button}
      variant={'text'}
    >
      <WebIcon class={styles.button__icon} />
      <VMenu activator={'parent'}>
        <VList class={styles.list}>
          <VListItem onClick={() => this.switch('ru')} class={styles.list__item} title={t('switcher.russian')}/>
          <VListItem onClick={() => this.switch('en')} class={styles.list__item} title={t('switcher.english')} />
        </VList>
      </VMenu>
    </VBtn>);
  }
});
