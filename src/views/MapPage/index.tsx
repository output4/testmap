import { defineComponent, ref } from 'vue';
import styles from './Map.module.less';
import usePlaceStores from '@/stores/places.store';
import {useI18n} from 'vue-i18n';
import {BackendClient} from '@/backend/client';
import type { IPlace } from '@/interfaces';
import {Map, MarkerList} from '@/components';
import Detect from 'mobile-detect';
import {ArrowCollapseLeftIcon, ArrowCollapseRightIcon} from 'mdi-vue3';

/**
 * @class MapPage
 * @description Component for showing map page with marker list
 */
export default defineComponent({
  name: 'MapPage',
  data() {
    const store = usePlaceStores();
    const { t } = useI18n();
    const timer = ref<any>();
    const client = new BackendClient();
    const selectedKey = ref<number>();
    const detector = new Detect(window.navigator.userAgent);
    const isMobile = !!detector.mobile();
    const panelCollapsed = ref<boolean>(false);

    return {
      panelCollapsed,
      isMobile,
      selectedKey,
      client,
      timer,
      t,
      store
    }
  },
  mounted() {
    this.store.getPlaces().then(() => {
      this.checkUrl();
    });
  },
  methods: {

    /**
     * @method MapPage#checkUrl
     * @description Method for check params from url, if user open marker by direct link
     */
    checkUrl() {
      const params = this.$route.query;
      if (params.placeId) {
        const place = this.store.places.find((p) => p.id.toString() === params.placeId);
        if (place) {
          this.placeClick(place);
        }
      }
    },

    /**
     * @method MapPage#setUrl
     * @param {IPlace} place
     * @description Method for set url param when user choose marker
     */
    setUrl(place: IPlace) {
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set('placeId', place.id.toString());
      history.replaceState(null, null, `?${queryParams.toString()}`);
    },

    /**
     * @method MapPage#addMarker
     * @param {IPlace} place
     * @description Method for add new marker on map after click on map
     */
    addMarker(place: IPlace) {
      this.store.savePlace(place);
      this.placeClick(place);
    },

    /**
     * @method MapPage#placeClick
     * @param {IPlace} marker
     * @description Method for set current marker if user clicked on it
     */
    placeClick(marker: IPlace) {
      this.selectedKey = marker.id;
      this.setUrl(marker);
      this.mapSetCenter(marker.location);
    },

    /**
     * @method MapPage#mapSetCenter
     * @param {any} location
     * @description Method for set center of map
     */
    mapSetCenter(location: any) {
      const map = this.$refs.map as typeof Map;
      if (map) {
        map.setCenter(location);
      }
    },

    /**
     * @method MapPage#removeMarker
     * @param {IPlace} place
     * @description Method for remove marker from store
     */
    removeMarker(place: IPlace) {
      this.store.removePlace(place.id);
    },

    /**
     * @method MapPage#collapsePanel
     * @description Method for collapse/show left side panel in mobile device
     */
    collapsePanel() {
      this.panelCollapsed = !this.panelCollapsed;
    }
  },
  render() {
    const { t } = this;
    return <div class={styles.container}>
      <div class={[styles.container__left, { [styles.container__left__collapsed]: this.panelCollapsed } ]}>
        {this.isMobile && <div class={styles.mobileBtn}>
          {!this.panelCollapsed && <ArrowCollapseLeftIcon onClick={this.collapsePanel} />}
          {this.panelCollapsed && <ArrowCollapseRightIcon onClick={this.collapsePanel} />}
        </div>}
        {!this.panelCollapsed && <MarkerList
          onItemclick={this.placeClick}
          items={this.store.places}
          selectedKey={this.selectedKey}
          onRemove={this.removeMarker}
        >
          {{
            emptyTemplate: () => <div class={styles.emptyList}>{t('mapPage.emptyList')}</div>
          }}
        </MarkerList>}
      </div>
      <Map
        className={[styles.container__map, {[styles.container__map__big]: this.panelCollapsed} ]}
        ref={'map'}
        places={this.store.places}
        selectedMarkerId={this.selectedKey}
        onAddmarker={this.addMarker}
        onMarkerclick={this.placeClick}
        onMapready={this.checkUrl}
      />
    </div>;
  }
})
