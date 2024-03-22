/**
 * @swagger
 * /api/country:
 *   get:
 *     summary: Fetch country information based on country name
 *     description: Fetches primary information about a country based on the provided country name.
 *     parameters:
 *       - name: name
 *         in: query
 *         description: The name of the country.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK. Returns the country information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 common_name:
 *                   type: string
 *                   description: The common name of the country.
 *                 official_name:
 *                   type: string
 *                   description: The official name of the country.
 *                 language:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: The language(s) spoken in the country.
 *                 region:
 *                   type: string
 *                   description: The region of the country.
 *                 capital:
 *                   type: string
 *                   description: The capital city of the country.
 *                 currency:
 *                   type: string
 *                   description: The currency of the country.
 *                 latlng:
 *                   type: array
 *                   items:
 *                     type: number
 *                   description: The latitude and longitude coordinates of the country.
 *       '404':
 *         description: Country not found.
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
 *                   example: Country not found.
 *                   description: Error message indicating the country was not found.
 *       '500':
 *         description: Internal Server Error.
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
 *                   example: Internal Server Error.
 *                   description: Error message indicating an internal server error occurred.
 */

/**
 * @module routes/countries
 */

// Calling the REST Countries API to retrieve information about countries

import { Router } from 'express';

const router = Router();

// Function to fetch data of all countries
const getAllCountries = async () => {
  // URL for fetching country data
  const url = `https://restcountries.com/v3.1/all`;

  // Options for the fetch request
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  // Fetching data from the API
  const response = await fetch(url, options);

  // Handling the case when an error occurs during the fetch request
  if (!response.ok) {
    throw new Error('Failed to fetch country data');
  }

  // Parsing the JSON response
  const json = await response.json();

  // Returning the JSON data
  return json;
}

// Function to find a country by its name
const findCountryByName = (name) => (country) => {
  // Comparing the common name of the country with the provided name (case insensitive)
  return country.name.common.toLowerCase() === name.toLowerCase();
};

// Route handler for GET requests to '/country'
router.get('/country', async (req, res) => {
  try {
    // Extracting the country name from the query parameters
    const countryName = req.query.name;

    // Fetching data of all countries
    const countries = await getAllCountries();

    // Handling the case when no country name is provided in the query parameters
    if (!countryName) {
      // Retrieving details of the first country
      const firstCountry = countries[0];
      
      // Sending JSON response with details of the first country
      return res.json({
        common_name: firstCountry.name.common,
        official_name: firstCountry.name.official,
        language: Object.values(firstCountry.languages),
        region: firstCountry.region,
        capital: firstCountry.capital,
        currency: Object.keys(firstCountry.currencies)[0],
        latlng: firstCountry.latlng
        // You can add more properties of the first country here
      });
    };

    // Finding the country object by name
    const country = countries.find(findCountryByName(countryName));

    // Handling the case when the country is not found
    if (!country) {
      // Sending a 404 response with a message indicating that the country was not found
      return res.status(404).json({
        status: 404,
        message: `Country '${countryName}' not found`
      });
    }

    // Sending JSON response with details of the found country
    res.json({
      common_name: country.name.common,
      official_name: country.name.official,
      language: Object.values(country.languages),
      region: country.region,
      capital: country.capital,
      currency: Object.keys(country.currencies)[0],
      latlng: country.latlng
    });
  } catch (error) {
    // Sending a 500 response with a message indicating an internal server error occurred
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error'
    });
  }
});

// Exporting the router instance
export default router;
