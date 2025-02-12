# WeatherApp

**My first App [Deployment soon - Docker Support Added - fixed issues related to angular CLI installation in development to make sure it runs smoothly]**

`This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.6.`

  <img src="https://github.com/Govindv7555/Govindv7555/blob/main/49e76e0596857673c5c80c85b84394c1.gif" width="1000px" height="100px">

# Crafted behind the scenes api fetching logic -for this beauty- first using typescript and some js for config files, with just a basic CSS UI... then Shifted the whole focus on implementing/improving a whole new stunning desgin for the app, I <3 gradient (you can notice a gradient-color scroll on smaller view ports)

  <img src="https://github.com/Govindv7555/Govindv7555/blob/main/49e76e0596857673c5c80c85b84394c1.gif" width="1000px" height="100px">

# from this :

![image](https://github.com/user-attachments/assets/5c3ab8ed-4745-4e18-93cd-b50d1bb43651)

# to this :

![image](https://github.com/user-attachments/assets/7e37d833-fd5d-4fa6-b517-05105bed74b4)

  <img src="https://github.com/Govindv7555/Govindv7555/blob/main/49e76e0596857673c5c80c85b84394c1.gif" width="1000px" height="100px">

# Responsiveness

![image](https://github.com/user-attachments/assets/4414a7af-22cd-4a1c-b243-dd42b5b39cbd)

![image](https://github.com/user-attachments/assets/5968c94d-11e8-49d1-abec-2f1ecbbdbe5e)

  <img src="https://github.com/Govindv7555/Govindv7555/blob/main/49e76e0596857673c5c80c85b84394c1.gif" width="1000px" height="100px">

# POSTMAN API TESTING

![image](https://github.com/user-attachments/assets/f62a37d1-781a-41a3-8507-52b903750aad)

  <img src="https://github.com/Govindv7555/Govindv7555/blob/main/49e76e0596857673c5c80c85b84394c1.gif" width="1000px" height="100px">

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Docker Setup

This project includes Docker support for easy deployment and development. Here's how to use it:

### Prerequisites

- Docker
- Docker Compose

### Running with Docker

1. Clone the repository:

```bash
git clone <your-repo-url>
cd weather-app
```

2. Create a `.env` file in the root directory with your OpenWeather API credentials:

```env
WEATHER_API_KEY=your_api_key_here
WEATHER_API_BASE_URL=https://api.openweathermap.org/data/3.0
WEATHER_API_GEOCODING_URL=https://api.openweathermap.org/geo/1.0/direct
```

3. Build and run the Docker container:

```bash
docker compose up --build
```

4. Access the application at http://localhost:4200

### Development

- The application will automatically rebuild when you make changes to the source code
- Use `docker compose down` to stop the containers
- Use `docker compose up -d` to run in detached mode

### Production Deployment

The Docker setup includes:

- Multi-stage build for optimal image size
- Nginx server for serving static files
- Environment variable support
- Production-ready configuration

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
