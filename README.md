# OlympicGamesStarter

This project uses Angular version 17.3.8.

## Installing dependencies

As with every Node.js-based projects, dependencies are installed with `npm install`.

## Running the development server

The development server can be launched with `ng serve` or `npm start`.

## Network requests

This app minimizes the number of network requests to a minimum. A single request is made during application bootstrap to retrieve data about olympic games.
Components derive their data using the result of the initial request.
