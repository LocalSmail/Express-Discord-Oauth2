import express from 'express'; // import express

import { AuthRoutes } from './routes/AuthRoutes' // import route

const app = express(); // define express app
const port = 3000; // port

AuthRoutes(app); // pretty much just gets the routes running

// create server on port 3000
const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
