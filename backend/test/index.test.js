// Testing our application's API endpoints
import { describe, it } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from '../src/app.js';

// Test for the homepage route
describe('GET /', () => {
  it('should return homepage with 200 status code', async () => {
    const response = await request(app).get('/');
    assert.strictEqual(response.status, 200);
  });
});

// Testing the country API endpoints
describe('GET /api/country', () => {
  // Test for fetching details of a country by name
  it('should return details of a country with 200 status code if valid country name provided', async () => {
    // Country name for testing
    const countryName = 'France';

    // Send a GET request to the API to retrieve country details by name
    const response = await request(app).get(`/api/country?name=${countryName}`);

    // Check if the response has a status code of 200 (OK)
    assert.strictEqual(response.status, 200);

    // Check if the common_name property in the response body is equal to 'France'
    assert.strictEqual(response.body.common_name, countryName);
  });

  // Test for fetching details of the first country if no name provided
  it('should return details of the first country with 200 status code if no country name provided', async () => {
    // Send a GET request to the API without specifying a country name
    const response = await request(app).get(`/api/country`);

    // Check if the response has a status code of 200 (OK)
    assert.strictEqual(response.status, 200);

    // Check if the response body includes common_name and official_name properties
    assert.ok(response.body.common_name);
    assert.ok(response.body.official_name);
  });

  // Test for handling the case when no country found with the provided name
  it('should return 404 status code if no country found with the provided name', async () => {
    // Send a GET request to the API with an invalid country name
    const response = await request(app).get(`/api/country?name=InvalidCountryName`);

    // Check if the response has a status code of 404 (Not Found)
    assert.strictEqual(response.status, 404);

    // Check if the response body includes status property with a value of 404
    assert.strictEqual(response.body.status, 404);
  });
});

// Error handling tests
describe('Error Handling', () => {
  // Test for handling non-existing routes
  it('should return 404 for non-existing routes', async () => {
    // Send a GET request to a non-existing route
    const response = await request(app).get('/api/non-existing-route');

    // Check if the response has a status code of 404 (Not Found)
    assert.strictEqual(response.status, 404);
  });
});

// Testing the conversion API endpoint
describe('GET /api/convert', () => {
  // Test for fetching conversion rates with a valid base currency provided
  it('should return conversion rates with 200 status code if valid base currency provided', async () => {
    // Base currency for testing
    const baseCurrency = 'USD';

    // Send a GET request to the API to retrieve conversion rates with the specified base currency
    const response = await request(app).get(`/api/convert?base=${baseCurrency}`);

    // Check if the response has a status code of 200 (OK)
    assert.strictEqual(response.status, 200);

    // Check if the response contains the base currency and rates
    assert.strictEqual(response.body.base, baseCurrency);
    assert.ok(response.body.rates);
  });

  // Test for fetching conversion rates with default base currency value (USD)
  it('should return conversion rates with 200 status code', async () => {
    // Send a GET request to the API without specifying a base currency
    const response = await request(app).get(`/api/convert`);

    // Check if the response has a status code of 200 (OK)
    assert.strictEqual(response.status, 200);

    // Check if the response body includes conversion rates and default base currency value (USD)
    assert.strictEqual(response.body.base, 'USD');
    assert.ok(response.body.rates);
  });
});
