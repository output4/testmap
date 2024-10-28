import {defineStore} from 'pinia';
import { type IPlace } from '@/interfaces';
import {BackendClient} from '@/backend/client';

export interface IState {
  places: IPlace[];
}
const client = new BackendClient();

export default defineStore('places', {
  state: (): IState => ({
      places: []
  }),
  actions: {

    /**
     * @method getPlaces
     * @description method for get all places from backend
     * @return Promise<void>
     */
    getPlaces() {
      return client.getPlaces().then((places: IPlace[]) => {
        this.places = places;
      });
    },

    /**
     * @method savePlace
     * @param {IPlace} place
     * @description Method for save new place
     * @return void
     */
    savePlace(place: IPlace) {
      client.savePlace(place).then((place: IPlace) => {
        const ar = this.places.slice();
        ar.unshift(place);
        this.places = ar;
      });
    },

    /**
     * @method removePlace
     * @param {number} placeId
     * @return void
     */
    removePlace(placeId: number) {
      client.removePlace(placeId).then(() => {
        this.places = this.places.filter((place) => place.id !== placeId);
      });
    }
  }
});
