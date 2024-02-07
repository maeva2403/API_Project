import { Router } from 'express';
import axios from 'axios';

const router = Router();

const searchCountries = async (searchQuery) => {
  const url - `https://restcountries.com/v3.1/all`
    const options = {
      method : 'GET',
      headers: {
        accept : 'appplication/json',
    },
  };

  const response = await fetch(url, options);
  const json = await response.json();

  return json.results;
}


// Fonction pour rechercher un pays par son nom
const findCountryByName = (name) => (country) => {
  return country.name.common.toLowerCase() === name.toLowerCase();
};

router.get('/country', async (req, res) => {
  const countryName = req.query.name;
  const foundCountries = await searchCountries(name);

  if (countries.length === 0) {
      response
          .status(404)
          .json({
            status: 404, 
            message: `We could not found a country with the name: ${countryName}`
          });
  }

  const country = foundCountry.find(findCountryByName(countryName)) || countries[0];

  // Renvoyer les informations du pays en réponse
  res.json(countryInfo);
});

export default router;

