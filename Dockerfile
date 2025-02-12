FROM node:20-alpine as build

# Define build arguments
ARG WEATHER_API_KEY
ARG WEATHER_API_BASE_URL
ARG WEATHER_API_GEOCODING_URL

# Set environment variables from build args
ENV WEATHER_API_KEY=$WEATHER_API_KEY
ENV WEATHER_API_BASE_URL=$WEATHER_API_BASE_URL
ENV WEATHER_API_GEOCODING_URL=$WEATHER_API_GEOCODING_URL

WORKDIR /app

# Install angular CLI globally
RUN npm install -g @angular/cli

# Copy package files 
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Create enviroment files and build
RUN echo "API Key: $WEATHER_API_KEY" && \
    node setup-env.js && \
    echo "Enviroment files generated:" && \
    ls -la src/enviroments/ && \
    cat src/enviroments/enviroment.ts && \
    ng build --configuration=production

# Production stage
FROM nginx:alpine

# Copy build assets
COPY --from=build /app/dist/weather-app/browser /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]