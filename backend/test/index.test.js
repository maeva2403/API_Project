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


describe('GET /api/country', () => {
  it('should return details of a country with 200 status code if valid country name provided', async () => {
    const countryName = 'France'; // Modifier avec un pays existant dans votre source de données

    const response = await request(app).get(`/api/country?name=${countryName}`);

    assert.strictEqual(response.status, 200);
    assert.property(response.body, 'common_name');
    assert.property(response.body, 'official_name');
    // Assurez-vous d'ajouter d'autres assertions pour vérifier les autres propriétés
  });

  it('should return details of the first country with 200 status code if no country name provided', async () => {
    const response = await request(app).get(`/api/country`);

    assert.strictEqual(response.status, 200);
    assert.property(response.body, 'common_name');
    assert.property(response.body, 'official_name');
    // Assurez-vous d'ajouter d'autres assertions pour vérifier les autres propriétés
  });

  it('should return 404 status code if invalid country name provided', async () => {
    const invalidCountryName = 'InvalidCountryName'; // Un nom de pays qui n'existe pas dans votre source de données

    const response = await request(app).get(`/api/country?name=${invalidCountryName}`);

    assert.strictEqual(response.status, 404);
    assert.strictEqual(response.body.status, 404);
    assert.strictEqual(response.body.message, `We could not found a country with the name: ${invalidCountryName}`);
  });
});