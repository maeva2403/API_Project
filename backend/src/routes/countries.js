import { Router } from 'express';

const router = Router();

const getAllCountries = async () => {
  const url = `https://restcountries.com/v3.1/all`;
    const options = {
      method : 'GET',
      headers: {
        accept : 'application/json',
    },
  };

  const response = await fetch(url, options);
  const json = await response.json();

  return json;
}

// Fonction pour rechercher un pays par son nom
const findCountryByName = (name) => (country) => {
  return country.name.common.toLowerCase() === name.toLowerCase();
};

router.get('/country', async (req, res) => {
  const countryName = req.query.name;
  const countries = await getAllCountries();

  if (countries.length === 0) {
      res
          .status(404)
          .json({
            status: 404, 
            message: `We could not found a country with the name: ${countryName}`
          });
  }

  const country = countries.find(findCountryByName(countryName)) || countries[0];

  // Renvoyer les informations du pays en réponse
  res.json({
    common_name : country.name.common,
    official_name: country.name.official,
    language: Object.values(country.languages),
    region: country.region,
    capital : country.capital,
    currency: Object.keys(country.currencies)[0]
  });
});

export default router;