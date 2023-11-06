// const express = require('express');
// const axios = require('axios');
// const app = express();
// const port = 8080;

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

// app.get('/accuweather/*', async (req, res) => {
//   try {
//     const accuWeatherBaseUrl = 'http://dataservice.accuweather.com';
//     const fullUrl = accuWeatherBaseUrl + req.url;

//     console.log('Proxying request to:', fullUrl);

//     const response = await axios.get(fullUrl);
//     res.json(response.data);
//   } catch (error) {
//     console.error('Error:', error);

//     res.status(500).json({ error: 'An error occurred while fetching data from AccuWeather' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Proxy server is running on port ${port}`);
// });


