const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_KEY = 'EWNCPOOSHRxSJnuqswvK9BtGSJMy74KArK_RNtGxwsGu-TikhCH44vsnUdKrvID91RHssubpATki8ODV71-JgAmjWD_5bL0bia4bV8sl2TkSjk-MQZrzAGZdnJ5SZnYx';

router.get('/search', async (req, res) => {
    const { term, latitude, longitude } = req.query;

    try {
        const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            },
            params: {
                term,
                latitude,
                longitude 
            }
        });

        res.json(response.data.businesses);
    } catch(error) {
        console.error('Error al obtener los restaurantes: ', error);
        res.status(500).json({error: 'Error al obtener los restaurantes'});
    }
});

module.exports = router;