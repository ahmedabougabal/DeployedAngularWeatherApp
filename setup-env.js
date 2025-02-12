const fs = require('fs');
require('dotenv').config();

// Debug logging
console.log('Enviroment variables loaded:');
console.log('API Key exists:', !!process.env.WEATHER_API_KEY);
console.log('Base URL:', process.env.WEATHER_API_BASE_URL);
console.log('Geocoding URL:', process.env.WEATHER_API_GEOCODING_URL);

const enviromentFile = `export const enviroment = {
  production: false,
  weatherApi: {
    key: '${process.env.WEATHER_API_KEY}',
    baseUrl: '${process.env.WEATHER_API_BASE_URL}',
    geocodingUrl: '${process.env.WEATHER_API_GEOCODING_URL}'
  }
}`;

const productionEnviromentFile = `export const enviroment = {
  production: true,
  weatherApi: {
    key: '${process.env.WEATHER_API_KEY}',
    baseUrl: '${process.env.WEATHER_API_BASE_URL}',
    geocodingUrl: '${process.env.WEATHER_API_GEOCODING_URL}'
  }
}`;

const envDir = 'src/enviroments';

// Create enviroments directory if it doesn't exist
if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

// Write enviroment files
fs.writeFileSync(`${envDir}/enviroment.ts`, enviromentFile);
fs.writeFileSync(`${envDir}/enviroment.development.ts`, enviromentFile);
fs.writeFileSync(`${envDir}/enviroment.prod.ts`, productionEnviromentFile);

// Debug: Read back the files to verify
console.log('\nVerifying generated files:');
console.log('enviroment.ts exists:', fs.existsSync(`${envDir}/enviroment.ts`));
console.log('enviroment.development.ts exists:', fs.existsSync(`${envDir}/enviroment.development.ts`));
console.log('enviroment.prod.ts exists:', fs.existsSync(`${envDir}/enviroment.prod.ts`));