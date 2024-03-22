/**
 * @swagger
 * tags:
 *   name: Currency
 *   description: Operations related to currency conversion
 */

/**
 * @swagger
 * /api/convert:
 *   get:
 *     summary: Fetch currency conversion rates
 *     description: Fetches currency conversion rates based on the provided base currency (USD).
 *     responses:
 *       '200':
 *         description: OK. Returns the currency conversion rates.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 base:
 *                   type: string
 *                   description: The base currency for conversion (USD).
 *                 rates:
 *                   type: object
 *                   description: The conversion rates for various currencies.
 *       '400':
 *         description: Bad Request. Invalid API key or other client error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                   description: The HTTP status code.
 *                 message:
 *                   type: string
 *                   example: Bad Request. Invalid API key.
 *                   description: Error message indicating the client error.
 *       '404':
 *         description: Currency data not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                   description: The HTTP status code.
 *                 message:
 *                   type: string
 *                   example: Currency data not found.
 *                   description: Error message indicating the currency data was not found.
 *       '500':
 *         description: Internal Server Error. Failed to fetch currency data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                   description: The HTTP status code.
 *                 message:
 *                   type: string
 *                   example: Internal Server Error. Failed to fetch currency data.
 *                   description: Error message indicating the server error.
 */

/**
 * @module routes/devise
 */

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
    try {
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
    } catch (error) {
        // Handle server error
        console.error(error);
        res.status(500).json({
            status: 500,
            message: `Internal Server Error. Failed to fetch currency data.`
        });
    }
});

export default router;
