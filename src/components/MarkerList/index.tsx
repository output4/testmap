import {defineComponent, type PropType} from 'vue';
import type {IPlace} from '@/interfaces';
import {VList, VListItem, VListItemTitle} from 'vuetify/components';
import styles from './MarkerList.module.less';
import {useI18n} from 'vue-i18n';
import { TrashCanIcon} from 'mdi-vue3';

/**
 * @class MarkerList
 * @description Component for render marker list
 */
export default defineComponent({
  name: 'MarkerList',
  props: {

    /**
     * @property {IPlace[]} MarkerList#items
     * @description List places
     * @requires
     */
    items: {
      type: Array as PropType<IPlace[]>,
      required: true
    },

    /**
     * @property {number} selectedKey
     * @description Current selected place
     */
    selectedKey: {
      type: Number,
      required: false,
      default: null
    }
  },
  emits: ['itemclick', 'remove'],
  data() {
    const { t } = useI18n();

    return { t };
  },
  methods: {

    /**
     * @method MarkerList#itemClick
     * @param {any} e
     * @description Method handler click on element in list
     */
    itemClick(e: any) {
      const id: number = e.id;
      const item = this.items.find((itemRow) => itemRow.id === id);
      this.$emit('itemclick', item);
    },

    /**
     * @method MarkerList#remove
     * @param {Event} e
     * @param {IPlace} item
     * @description Handler for remove element btn
     */
    remove(e: Event, item: IPlace): void {
      e.stopPropagation();
      this.$emit('remove', item);
    }
  },
  render() {
    const { t } = this;
    if (this.items && this.items.length === 0) {
      return this.$slots.emptyTemplate?.() || <span>{t('list.defaultEmptyMsg')}</span>;
    }
    return <>
      <h3 class={styles.list__title}>{t('mapPage.titleLeft')}</h3>
      <VList activated={[this.selectedKey]} activatable={true} onClick:activate={this.itemClick} class={styles.list}>
        {this.items.map((item) =>
          <VListItem value={item.id}
                     class={[styles.list__item, {[styles.list__item__active]: this.selectedKey === item.id}]}
                     key={item.id}
          >
            <div>
              <VListItemTitle tag={'div'} title={item.name} class={styles.list__item__title}>
                {item.name}
              </VListItemTitle>
              <div class={styles.list__item__coords}>{item.location.lat}, {item.location.lng}</div>
              <div><TrashCanIcon onClick={(e) => this.remove(e, item)} class={styles.toTrash} /></div>
            </div>
          </VListItem>)}
      </VList>
    </>;
  }
});
