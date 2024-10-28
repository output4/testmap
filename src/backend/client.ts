import {DB} from '@/backend/db';
import type {IPlace} from '@/interfaces';
import {GEOCODER_API_KEY} from '@/config';

const db = new DB();

/**
 * @class BackendClient
 * @description Class for emulation backend
 */
export class BackendClient {

  /**
   * @method BackendClient#getPlaces
   * @return Promise<IPlace[]>
   * @description Method for get all places from db
   */
  getPlaces() {
    return new Promise<IPlace[]>((resolve) => {
      const places = db.getAll();
      resolve(places);
    });
  }

  /**
   * @method BackendClient#savePlace
   * @param {IPlace} place
   * @return Promise<IPlace>
   * @description Method for save new place to db
   */
  savePlace(place: IPlace) {
    return new Promise<IPlace>((resolve) => {
      db.savePlace(place);
      resolve(place);
    });
  }

  /**
   * @method BackendClient#removePlace
   * @param {number} placeId
   * @return Promise<void>
   * @description Method for remove place from db
   */
  removePlace(placeId: number) {
    return new Promise<void>((resolve) => {
      db.removePlace(placeId);
      resolve();
    })
  }

  /**
   * @method BackendClient#getAddressByCoords
   * @param {any} coords
   * @return Promise<any>
   */
  getAddressByCoords(coords: { lat: number, lng: number }) {
    const url = `https://geocode.maps.co/reverse?lat=${coords.lat}&lon=${coords.lng}&api_key=${GEOCODER_API_KEY}`;
    return fetch(url).then(res => res.json());
  }
}
