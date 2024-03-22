// Calling the REST Countries API to retrieve information about countries

import { Router } from 'express';

const router = Router();

// unction to fetch data of all countries
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
});

// Exporting the router instance
export default router;
