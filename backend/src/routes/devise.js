// Fetching currency conversion rates using the OpenExchangeRates API with base currency as USD

import { Router } from 'express';
import 'dotenv/config';

const router = Router();

// Fetch the API key from environment variables
const api_key = process.env.APIKEY;

// Function to fetch all currencies
const getAllCurrencies = async () => {
    // Construct URL with API key
    const url = `https://openexchangerates.org/api/latest.json?app_id=${api_key}`;
    const options = {
        method : 'GET',
        headers: {
            accept : 'application/json',
        },
    };

    // Fetch data from the API
    const response = await fetch(url, options);
    const json = await response.json();

    return json;
}

// Route handler for GET requests to '/convert'
router.get('/convert', async (req, res) => {
    // Fetch all currencies
    const currencies = await getAllCurrencies();

    // Check if currency data is available
    if (!currencies || !currencies.rates) {
        // Return 404 status with error message if no currency data found
        res.status(404).json({
            status: 404,
            message: `Currency data not found.`
        });
        return;
    }

    // Send JSON response with base currency and rates
    res.json({
        base: currencies.base,
        rates: currencies.rates
    });
});

export default router;
