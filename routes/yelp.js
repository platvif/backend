const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_KEY = 'EWNCPOOSHRxSJnuqswvK9BtGSJMy74KArK_RNtGxwsGu-TikhCH44vsnUdKrvID91RHssubpATki8ODV71-JgAmjWD_5bL0bia4bV8sl2TkSjk-MQZrzAGZdnJ5SZnYx';

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

module.exports = router;