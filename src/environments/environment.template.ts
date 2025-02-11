export const enviroment = {
  prodution: false,
  weatherApi: {
    key : process.env['WEATHER_API_KEY'] || '',
    baseUrl: process.env['WEATHER_API_BASE_URL'] || 'https://api.openweathermap.org/data/3.0',
    geocodingUrl: process.env['WEATHER_API_GEOCODING_URL'] || 'https://api.openweathermap.org/geo/1.0/direct'
  }
};