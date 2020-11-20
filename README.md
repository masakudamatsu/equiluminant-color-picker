# Equiluminant Color Picker

A full-stack webapp to pick a color that is equiluminant to the user-selected one. It will help convert the grayscale design into a colored one, making sure that the luminance contrast for legibility will be preserved.

## Installation

First, install [Node.js](https://nodejs.org/en/) to use the npm package manager. 

Then, install the data server:
```
cd server
npm install
```

Finally, install the front-end app:
(assuming that you're back to the root directory)
```
cd app
npm install
```

## Run development servers with Cypress test runner

First, run the server at http://localhost:4000/
```
cd server
npm start
```

Then, launch the app at http://localhost:3000/ with Cypress test runner
(assuming that you're back to the root directory)
```
cd app
npm run test:e2e
```
