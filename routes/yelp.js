const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_KEY = 'P7ilRNuVdJHJaHyWIXdQ13KJE3cfxYDjNlNtLnhoM8Mu16Fz5QGKws5H4Mx8_CPoul5CT7vBdJF-puYqAHKvUGsKh_eG1uNy9eA--1c3j9ArFBGEVYqZGB67pNjXZnYx';

router.get('/search', async (req, res) => {
    const { term, latitude, longitude, location, radius, categories, price } = req.query;
  
    let params = {
      term,
      radius,
      categories,
      price,
    };
  
    if (location) {
      params.location = location;
    } else if (latitude && longitude) {
      params.latitude = latitude;
      params.longitude = longitude;
    } else {
      return res.status(400).send('Se requiere "location" o "latitude" y "longitude"');
    }
  
    try {
      const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
        params,
      });
      res.json(response.data.businesses);
    } catch (error) {
      console.error('Error al buscar en Yelp:', error);
      res.status(500).send('Error al buscar en Yelp');
    }
  });

  router.get('/details/:id', async (req, res) => {
    const restaurantId = req.params.id;
    const locale = req.query.locale || 'en_US';

    try {
        const response = await axios.get(`https://api.yelp.com/v3/businesses/${restaurantId}`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                'Accept': 'application/json'
            },
            params: {
                locale
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching restaurant details from Yelp API:', error);
        res.status(500).json({ error: 'Error fetching restaurant details from Yelp API' });
    }
});

module.exports = router;