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

  if (!countryName) {
    // Si aucun nom de pays n'est fourni, renvoyer les détails du premier pays
    const firstCountry = countries[0];
    return res.json({
      common_name: firstCountry.name.common,
      official_name: firstCountry.name.official,
      language: Object.values(firstCountry.languages),
      region: firstCountry.region,
      capital : firstCountry.capital,
      currency: Object.keys(firstCountry.currencies)[0],
      latlng: firstCountry.latlng
      // Assurez-vous d'ajouter d'autres propriétés du premier pays ici
    });
  };


  const country = countries.find(findCountryByName(countryName));

  if (!country) {
    // Si le pays n'est pas trouvé, retourner une réponse 404
    return res.status(404).json({
      status: 404, 
      message: `Country '${countryName}' not found`
    });
  }

  // Renvoyer les informations du pays en réponse
  res.json({
    common_name : country.name.common,
    official_name: country.name.official,
    language: Object.values(country.languages),
    region: country.region,
    capital : country.capital,
    currency: Object.keys(country.currencies)[0],
    latlng: country.latlng
  });
});

export default router;