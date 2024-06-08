// server.js
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const yelpRoutes = require('./routes/yelp');

const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/user', userRoutes);
app.use('/api/yelp', yelpRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
