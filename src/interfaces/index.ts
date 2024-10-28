export interface IPlace {
  id: number;
  name: string;
  location: {
    lat: number | string;
    lng: number | string;
  };
  address: any;
}

export interface IGeoResponse {
  address: {
    neighbourhood: string;
    city: string;
    city_block: string;
    country: string;
    country_code: string;
    county: string;
    house_number?: string;
    postcode: string;
    road: string;
    state: string;
    suburb: string;
  }
  boundingbox: number[];
  display_name: string;
  lat: string;
  lon: string;
  place_id: number;
}
