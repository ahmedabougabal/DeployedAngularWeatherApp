export interface GeocodingResposnse{
  name : string;
  lat: number ;
  lon: number ;
  country: string;
  state?: string;
}

export interface GeocodingError {
  cod : string;
  message: string;
}