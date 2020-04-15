# Travel Planner

Used multiple apis to create travel planner. First use geonames api to get longitude and latitude and passed that to darksky api to get weather forecast on future date and fetch images from Pixabay api.

Download the project and run 
`npm install`

## Steps to get project setup

1. Create an account with Geonames.
2. Create an account with Weatherbit.
3. Create an account with Pixabay.
4. Integrate the REST Countries API to pull in data for the country being visited.

Create `.env` file and store your `DarkSky or Weatherbit api key` as `DARKSKY_API_key` and `Pixabay api key` as `PIXABAY_API_key` in the `.env` file. 

If you are using `Weatherbit api key` Follow the step below
1. create weather bit account and store api key in `.env` file as `WEATHERBIT_API_KEY`  
2. Go to `src/server/server.js` and replace `const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY;` to `const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY`
3. Replace `${DARKSKY_API_KEY}` in `app.post('/weather)` with `${WEATHERBIT_API_KEY}`


## To run development environment
`npm run build-dev`

## To run production environment
`npm run build-prod` and `npm start`



