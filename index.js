require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.RED_BULL_API_KEY;
const CACHE_DURATION = 5 * 60 * 1000; // Cache duration set to 5 minutes

app.use(cors({
    origin: 'http://localhost:3000' // Allow only driver standings react app to make requests
  }));
  

// In-memory cache for storing API responses
const cache = {};

// Helper function for fetching data with retries
async function fetchDataWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(url, {
        headers: { 'x-api-key': API_KEY },
      });
      return response.data;
    } catch (error) {
      if (i === retries - 1) {
        throw error; // Throw the error if the last retry fails
      }
    }
  }
}

// Endpoint to get driver standings for a given season
app.get('/api/drivers/:season', async (req, res) => {
  const { season } = req.params;
  const cacheKey = `drivers_${season}`;
  const apiUrl = `https://pitwall.redbullracing.com/api/stats/drivers/${season}`;

  // Check cache for data
  if (cache[cacheKey] && Date.now() - cache[cacheKey].timestamp < CACHE_DURATION) {
    console.log('Serving data from cache');
    return res.json(cache[cacheKey].data);
  }

  try {
    // Fetch data with retry logic
    const data = await fetchDataWithRetry(apiUrl);

    // Sort data by season_points in descending order to define position
    const sortedData = data.sort((a, b) => b.season_points - a.season_points);

    // Map sorted data to include only the required fields, and assign position based on order
    const filteredData = sortedData.map((driver, index) => ({
      position: index + 1,
      name: `${driver.first_name} ${driver.last_name}`,
      constructor: driver.season_team_name,
      points: driver.season_points,
    }));

    // Store data in cache with a timestamp
    cache[cacheKey] = {
      data: filteredData,
      timestamp: Date.now(),
    };

    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch driver standings data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});