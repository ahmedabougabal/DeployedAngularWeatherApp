const fs = require('fs');
require('dotenv').config();

const enviromentFile = `export const enviroment = {
  production : false,
  weatherApi: {
  key: '${process.env.WEATHER_API_KEY}',
  baseUrl: '${process.env.WEATHER_API_BASE_URL}',
  geocodingUrl: '${process.env.WEATHER_API_GEOCODING_URL}'
  }
}`;

const productionEnviromentFIle = `export const enviroment = {
  production : false,
  weatherApi: {
  key: '${process.env.WEATHER_API_KEY}',
  baseUrl: '${process.env.WEATHER_API_BASE_URL}',
  geocodingUrl: '${process.env.WEATHER_API_GEOCODING_URL}'
  }
}`;

fs.writeFileSync('src/environments/environment.ts', enviromentFile);
fs.writeFileSync('src/environments/environment.development.ts', enviromentFile);
fs.writeFileSync('src/environments/environment.prod.ts', productionEnviromentFIle);