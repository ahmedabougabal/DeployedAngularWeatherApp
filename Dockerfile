FROM node:20-alpine as build

WORKDIR /app

#install angular CLI globally to solve the error '1.014 /bin/sh: ng: not found'
RUN npm install -g @angular/cli

# cp package files 
COPY package*.json ./

# cmd to install dependencies
RUN npm install

#copy project files into working dir
COPY . .

#cmd to build the app
RUN npm run config && ng build --configuration=production

#production stage :)
FROM nginx:alpine

# cp build assets from build stage 
COPY --from=build /app/dist/weather-app/browser /usr/share/nginx/html

#copy nginx config 
COPY nginx.conf /etc/nginx/conf.d/default.conf

# exxposing the port for the container 
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]