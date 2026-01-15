const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Proxy endpoint for shop API
app.get('/shop', async (req, res) => {
  try {
    const { domain } = req.query;
    
    if (!domain) {
      return res.status(400).json({ error: 'Domain parameter is required' });
    }

    // Make request to the actual shop API
    const response = await axios.get(`https://${domain}/api/v2/shop`, {
      headers: {
        'User-Agent': 'ShopProxy/1.0'
      },
      timeout: 30000
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    console.error('Domain:', domain);
    console.error('Full error:', error);
    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data || 'No additional details'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Shop proxy server running on port ${PORT}`);
});
