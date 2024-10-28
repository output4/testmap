import {defineComponent, type PropType, ref} from 'vue';
import {API_KEY} from '@/config';
import styles from './Map.module.less';
import {CustomControl, CustomMarker, GoogleMap, Marker, MarkerCluster} from 'vue3-google-map';
import type {IGeoResponse, IPlace} from '@/interfaces';
import {AlertMinusIcon, LoadingIcon, MapMarkerIcon, MinusBoxIcon, PlusBoxIcon} from 'mdi-vue3';
import {useI18n} from 'vue-i18n';
import {BackendClient} from '@/backend/client';
import {VAlert} from 'vuetify/components';

const center = { lat: 40.689247, lng: -74.044502 };
interface IConfigAlert {
  title: string;
  text: string;
  type: 'success' | 'error';
  icon: any;
}

/**
 * @class Map
 * @description This component for render map with markers
 */
export default defineComponent({
  name: 'Map',
  props: {

    /**
     * @property {IPlace[]} Map#places
     * @description Array of markers
     * @requires
     */
    places: {
      type: Array as PropType<IPlace[]>,
      required: true,
    },

    /**
     * @property {Number} Map#selectedMarkerId
     * @description Current selected marker
     */
    selectedMarkerId: {
      type: Number,
      required: false,
      default: null
    },

    /**
     * @property {string, string[]} Map#className
     * @description Class or class list of css classes for map container
     */
    className: {
      type: [String, Array],
      required: false,
      default: styles.map
    }
  },
  emits: ['markerclick', 'addmarker', 'mapready'],
  data() {
    const stateResume = ref<boolean>(false);
    const configAlert = ref<IConfigAlert>();
    const { t } = useI18n();
    const alertState = ref<boolean>(false);
    const timer = ref<any>();
    const loading = ref<boolean>(false);
    const client = new BackendClient();

    return {
      client,
      loading,
      timer,
      alertState,
      t,
      configAlert,
      stateResume,
    }
  },
  computed: {
    textButton() {
      const { t } = this;
      return this.stateResume ? t('mapPage.remove') : t('mapPage.add');
    }
  },
  mounted() {
    this.watchMap();
  },
  methods: {

    /**
     * @method Map#addMarker
     * @param {IGeoResponse} data
     * @description Method for convert geo response to IPlace format and notify about new marker on map
     */
    addMarker(data: IGeoResponse) {
      const place: IPlace = {
        name: `${data.address.country}, ${data.address.city}${data.address.neighbourhood ? `, ${data.address.neighbourhood}` : ''}${data.address.road ? `, ${data.address.road}` : ''} ${data.address.house_number}`,
        address: data.address,
        location: {
          lat: parseFloat(data.lat),
          lng: parseFloat(data.lon)
        },
        id: data.place_id
      };

      this.$emit('addmarker', place);
    },

    /**
     * @method Map#showError
     * @description Method for showing error
     */
    showError() {
      const { t } = this;
      this.configAlert = {
        type: 'error',
        title: t('mapPage.error.title'),
        text: t('mapPage.error.text'),
        icon: <AlertMinusIcon />
      }
      this.showAlert();
    },

    /**
     * @method Map#watchMap
     * @description Method for add event listener on map component after ready
     */
    watchMap() {
      const map = this.$refs.map as typeof GoogleMap;
      if (map) {
        this.$watch(() => map.ready,
          (ready) => {
            if (ready) {
              this.$emit('mapready');
              this.addEventListener(map);
            }
          });
      }
    },

    /**
     * @method Map#addEventListener
     * @param {GoogleMap} map
     * @description Add event listeners
     */
    addEventListener(map: typeof GoogleMap) {
      map.map.addListener('click', this.clickOnMap);
    },

    /**
     * @method Map#clickOnMap
     * @param {any} params
     * @description Method handler for click event on map
     */
    clickOnMap(params: any) {
      if (this.stateResume) {
        const latLng = params.latLng;
        const point = {
          lat: latLng.lat(),
          lng: latLng.lng()
        };
        this.toggleResume();
        this.loading = true;
        this.client.getAddressByCoords(point).then((data) => {
          if (!data.address.house_number) {
            this.showError();
            return;
          }
          this.addMarker(data);
        }).finally(() => {
          this.loading = false;
        });
      }
    },

    /**
     * @method Map#markerClick
     * @param {IPlace} place
     * @description Method handler for marker click
     */
    markerClick(place: IPlace) {
      this.$emit('markerclick', place);
    },

    /**
     * @method Map#toggleResume
     * @description Method for switch between two resumes of map. Add marker resume and just map
     */
    toggleResume() {
      this.stateResume = !this.stateResume;
      const { t } = this;
      this.configAlert = {
        type: 'success',
        title: this.stateResume ? t('mapPage.alertAdd.title') : t('mapPage.alertRemove.title'),
        text: this.stateResume ? t('mapPage.alertAdd.text') : t('mapPage.alertRemove.text'),
        icon: this.stateResume ? <PlusBoxIcon /> : <MinusBoxIcon />
      }
      this.showAlert();
    },

    /**
     * @method Map#showAlert
     * @description Method for showing temporary notification
     */
    showAlert() {
      clearTimeout(this.timer);
      this.alertState = true;
      const time = 3000;
      this.timer = setTimeout(() => {
        this.alertState = false;
      }, time)
    },

    /**
     * @method Map#setCenter
     * @param {any} coords
     * @description Method for set center of map
     * @public
     */
    setCenter(coords: any) {
      const map = this.$refs.map as typeof GoogleMap;
      if (map) {
        map.map.setCenter(coords);
        map.map.setZoom(18);
      }
    },

    /**
     * @method Map#renderMarker
     * @param {IPlace} place
     * @description Method for render simple marker on map
     */
    renderMarker(place: IPlace) {
      return <Marker
        onClick={() => this.markerClick(place)}
        key={place.id}
        options={{
          position: place.location
        }}
      />
    },

    /**
     * @method Map#renderCustomMarker
     * @param {IPlace} place
     * @description Method for render active marker
     */
    renderCustomMarker(place: IPlace) {
      return <CustomMarker
        key={place.id}
        options={{
          position: place.location
        }}
      >
        <MapMarkerIcon class={styles.customMarker} />
      </CustomMarker>
    }
  },
  render() {
    return <>
        <GoogleMap
        apiKey={API_KEY}
        center={center}
        zoom={15}
        class={this.className}
        ref={'map'}
      >
        <MarkerCluster>
          {this.places.map((place) => <>
            {this.selectedMarkerId === place.id ? this.renderCustomMarker(place) : this.renderMarker(place)}
          </>)}
        </MarkerCluster>
        <CustomControl position='BOTTOM_CENTER'>
          {!this.loading && <span onClick={this.toggleResume} title={this.textButton}>
              {!this.stateResume && <PlusBoxIcon class={styles.addButton}/>}
              {this.stateResume && <MinusBoxIcon class={styles.removeButton}/>}
          </span>}
          {this.loading && <LoadingIcon class={styles.loadingIcon} />}
        </CustomControl>
      </GoogleMap>
      <div class={styles.alert}>
        {this.alertState && <VAlert density='compact' {...this.configAlert} />}
      </div>
    </>
  }
});
