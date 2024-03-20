import { describe, it } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from '../src/app.js';

describe('GET /', () => {
  it('should return homepage with 200 status code', async () => {
    const response = await request(app).get('/');
    assert.strictEqual(response.status, 200);
  });
});

// Description du test
describe('GET /api/country', () => {
  it('should return details of a country with 200 status code if valid country name provided', async () => {
    // Nom du pays pour lequel vous souhaitez tester
    const countryName = 'France';

    // Envoyer une requête GET à l'API pour récupérer les détails du pays
    const response = await request(app).get(`/api/country?name=${countryName}`);

    // Vérifier si la réponse a un code de statut 200 (OK)
    assert.strictEqual(response.status, 200);

    // Vérifier si la propriété common_name dans le corps de la réponse est égale à 'France'
    assert.strictEqual(response.body.common_name, countryName);
  });

  // Test with a blind name
  it('should return details of the first country with 200 status code if no country name provided', async () => {
    const response = await request(app).get(`/api/country`);

    assert.strictEqual(response.status, 200);
    assert.ok(response.body.common_name); // Vérifie si common_name existe
    assert.ok(response.body.official_name); // Vérifie si official_name existe
    // Assurez-vous d'ajouter d'autres assertions pour vérifier les autres propriétés
  });

  // Test with a name not in the data 
  it('should return 404 status code if no country found with the provided name', async () => {
    const response = await request(app).get(`/api/country?name=InvalidCountryName`);

    assert.strictEqual(response.status, 404);
    assert.strictEqual(response.body.status, 404);
  });
});

describe('Error Handling', () => {
  it('should return 404 for non-existing routes', async () => {
    const response = await request(app).get('/api/non-existing-route');
    assert.strictEqual(response.status, 404);
  });
});

describe('GET /api/convert', () => {
  it('should return conversion rates with 200 status code if valid base currency provided', async () => {
    // Base currency for testing
    const baseCurrency = 'USD';

    // Send a GET request to the API to retrieve conversion rates
    const response = await request(app).get(`/api/convert?base=${baseCurrency}`);

    // Check if the response has a status code of 200 (OK)
    assert.strictEqual(response.status, 200);

    // Check if the response contains the base currency and rates
    assert.strictEqual(response.body.base, baseCurrency);
    assert.ok(response.body.rates);
  });
});