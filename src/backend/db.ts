import type {IPlace} from '@/interfaces';

/**
 * @class DB
 * @description class for emulation db
 */
export class DB {

  /**
   * @method DB#getAll
   * @description Method for getting all data from db
   * @return IPlace[];
   */
  getAll(): IPlace[] {
    return JSON.parse(localStorage.getItem('places') || '[]');
  }

  /**
   * @method DB#savePlace
   * @param {IPlace} place
   * @description method for save place to db
   */
  savePlace(place: IPlace) {
    const places = this.getAll();
    if (!places.find(p => p.address === place.address)) {
      const ar = places.slice();
      ar.unshift(place);
      localStorage.setItem('places', JSON.stringify(ar));
    }
  }

  /**
   * @method DB#removePlace
   * @param {number} placeId
   * @description Method for remove place from db
   */
  removePlace(placeId: number) {
    const places = this.getAll();
    const finalList = places.filter((place) => place.id !== placeId);
    localStorage.setItem('places', JSON.stringify(finalList));
  }
}
