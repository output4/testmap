import {defineComponent} from 'vue';
import { RouterView } from 'vue-router'
import {VTabs, VTab, VToolbarTitle} from 'vuetify/components';
import {useI18n} from 'vue-i18n';
import { LangSwitcher } from '@/components';
import styles from './App.module.less';
import './App.less';

export default defineComponent({
  name: 'App',
  data(){
    const { t } = useI18n();

    return {
      t
    }
  },
  render() {
    const { t } = this;

    return (<>
      <header>
        <div class={styles.wrapper}>
          <div class={styles.wrapper__toolBar}>
            <VToolbarTitle>
              <div class={styles.wrapper__toolBar__container}>
                <div>{t('title')}</div>
                <div><LangSwitcher/></div>
              </div>
            </VToolbarTitle>
          </div>
          <div class={styles.wrapper__tabs}>
            <VTabs items={['map', 'about']}>
              <VTab to={'/about'}>{t('about')}</VTab>
              <VTab to={'/map'}>{t('map')}</VTab>
            </VTabs>
          </div>
        </div>
      </header>
      <RouterView/>
    </>);
  }
})
