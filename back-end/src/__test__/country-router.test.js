'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { createCountryMock, createFakeMock, removeCountryMock } from './lib/country-mock';
import { createFakeMockSystem } from './lib/system-mock';

const API_URL = `http://localhost:${process.env.PORT}`;

/* 
Tests for the following (13):
  - POST /countries (201 x 4, 400, 404, 409)
  - GET /countries/:id (201, 404)
  - PUT /countries/:id (200, 201, 400, 404)
  - DELETE /countries/:id (204, 400 x 2)
*/

describe('Test country-router', () => {
  beforeAll(startServer);
  afterEach(removeCountryMock);
  afterAll(stopServer);

  describe('POST to /countries', () => {
    test('POST under normal circumstances returns 201', () => {
      return superagent.post(`${API_URL}/countries`)
        .send({
          countryName: 'democratic republic of congo',
        })
        .then((response) => {
          expect(response.status).toEqual(201);
          expect(response.body.countryName).toEqual('congo_democratic_republic_of_the');
          expect(response.body.population).toBeTruthy();
          expect(response.body.area).toBeTruthy();
          expect(response.body.gdpPPPRank).toBeTruthy();
          expect(response.body.imports).toBeInstanceOf(Array);
          expect(response.body.exports).toBeInstanceOf(Array);
          expect(response.body.naturalResources).toBeInstanceOf(Array);
          expect(response.body.ethnicities).toBeInstanceOf(Array);
          expect(response.body.languages).toBeInstanceOf(Array);
          expect(response.body.religions).toBeInstanceOf(Array);
        });
    });

    test('POST a country without bordering countries should return empty array for border countries', () => {
      return superagent.post(`${API_URL}/countries`)
        .send({
          countryName: 'the bahamas',
        })
        .then((response) => {
          expect(response.status).toEqual(201);
          expect(response.body.countryName).toEqual('bahamas_the');
          expect(response.body.borderCountries).toBeInstanceOf(Array);
          expect(response.body.borderCountries).toHaveLength(0);
        });
    });

    test('POST a country that does not exist returns 404', () => {
      return superagent.post(`${API_URL}/countries`)
        .send({
          countryName: 'beni',
        })
        .then(() => {})
        .catch((error) => {
          expect(error.status).toEqual(404);
        });
    });

    test('POST a country that already exists returns 409', () => {
      return superagent.post(`${API_URL}/countries`)
        .send({
          countryName: 'china',
        })
        .then(() => {
          return superagent.post(`${API_URL}/countries`)
            .send({
              countryName: 'china',
            });
        })
        .catch((error) => {
          expect(error.status).toEqual(409);
        });
    });

    test('POST with improper arguments returns 400', () => {
      return superagent.post(`${API_URL}/countries`)
        .send({
          countryName: 'ecuador',
          typeOfGovernment: 'democracy',
          headOfState: 'Donald Trump',
        })
        .then(() => {})
        .catch((error) => {
          expect(error.status).toEqual(400);
        });
    });
  });

  describe('GET from /countries/:id', () => {
    test('GET with correct id should return 200 and json', () => {
      return superagent.post(`${API_URL}/countries`)
        .send({
          countryName: 'north korea',
        })
        .then((response) => {
          return superagent.get(`${API_URL}/countries/${response.body._id}`)
            .then((res) => {
              expect(res.status).toEqual(200);
              expect(res.body).toBeTruthy();
              expect(res.body.countryName).toEqual('korea_north');
              expect(response.body.countryName).toEqual('korea_north');
              expect(response.body.population).toBeTruthy();
              expect(response.body.area).toBeTruthy();
              expect(response.body.gdpPPPRank).toBeTruthy();
              expect(response.body.imports).toBeInstanceOf(Array);
              expect(response.body.exports).toBeInstanceOf(Array);
              expect(response.body.naturalResources).toBeInstanceOf(Array);
              expect(response.body.ethnicities).toBeInstanceOf(Array);
              expect(response.body.languages).toBeInstanceOf(Array);
              expect(response.body.religions).toBeInstanceOf(Array);
            });
        });
    });

    test('GET with incorrect id should return 404', () => {
      return superagent.get(`${API_URL}/countries/1234`)
        .then(() => {})
        .catch((error) => {
          expect(error.status).toEqual(404);
          expect(error.body).toBeFalsy();
        });
    });
  });

  describe('GET from /countries/all', () => {
    beforeEach(() => createFakeMock('benin'));
    beforeEach(() => createFakeMock('togo'));

    test('GET all should return 200 and return all countries in database', () => {
      return superagent.get(`${API_URL}/countries/all`)
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body).toBeInstanceOf(Array);
          expect(response.body).toHaveLength(2);
        });
    });
  });

  test('GET all should return 200 and return no countries if none exist', () => {
    return superagent.get(`${API_URL}/countries/all`)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body).toHaveLength(0);
      });
  });

  describe('GET from /countries/list', () => {
    beforeEach(() => createFakeMock('benin'));
    beforeEach(() => createFakeMock('togo'));

    test('GET all should return a 200 and an array of objects', () => {
      return superagent.get(`${API_URL}/countries/list`)
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body).toBeInstanceOf(Array);
          expect(response.body).toHaveLength(2);
          expect(response.body[0]).toBeInstanceOf(Object);
          expect(Object.keys(response.body[0])).toBeInstanceOf(Array);
          expect(Object.keys(response.body[0])).toHaveLength(2);
        });
    });
  });

  describe('PUT to countries/:id', () => {
    test('PUT with old lastUpdated date should return updated data', () => {
      return createCountryMock(true)
        .then((response) => {
          expect(response.country.lastUpdated).toEqual('test');
          return superagent.put(`${API_URL}/countries/${response.country._id}`)
            .then((res) => {
              expect(res.status).toEqual(201);
              expect(res.body).toBeTruthy();
              expect(res.body.lastUpdated).not.toEqual('test');
            });
        });
    });

    test('PUT should with current lastUpdated date should return same data', () => {
      return createCountryMock(false)
        .then((response) => {
          return superagent.put(`${API_URL}/countries/${response.country._id}`)
            .then((res) => {
              expect(res.status).toEqual(200);
              expect(res.body).toBeTruthy();
              expect(res.body.lastUpdated).toEqual(response.country.lastUpdated);
            });
        });
    });

    test('PUT with incorrect country id will return 404', () => {
      return createCountryMock()
        .then(() => {
          return superagent.put(`${API_URL}/countries/1234`)
            .then(() => {})
            .catch((error) => {
              expect(error.status).toEqual(404);
            });
        });
    });

    test('PUT with incorrect arguments will return 400', () => {
      return createCountryMock()
        .then((mock) => {
          return superagent.put(`${API_URL}/countries/${mock.country._id}`)
            .send({
              ocean: 'Atlantic',
            })
            .then(() => {})
            .catch((err) => {
              expect(err.status).toEqual(400);
            });
        });
    });
  });

  describe('DELETE /countries/:id', () => {
    test('Delete a country that no longer exists in the world should return 204', () => {
      return createFakeMock('fake country', 'fake system')
        .then((mock) => {
          return superagent.delete(`${API_URL}/countries/${mock.country._id}`)
            .then((response) => {
              expect(response.status).toEqual(204);
            });
        });
    });

    test('Delete a country that no longer exists returns 204, system is also deleted', () => {
      return createFakeMockSystem('fake country')
        .then((mock) => {
          return superagent.delete(`${API_URL}/countries/${mock.country._id}`)
            .then((response) => {
              expect(response.status).toEqual(204);
            });
        });
    });

    test('Delete a country that still exists returns 400', () => {
      return createCountryMock()
        .then((mock) => {
          return superagent.delete(`${API_URL}/countries/${mock.country._id}`)
            .then(() => {})
            .catch((err) => {
              expect(err.status).toEqual(400);
            });
        });
    });

    test('Delete with bad id returns 400', () => {
      return createCountryMock()
        .then(() => {
          return superagent.delete(`${API_URL}/countries/1234`)
            .then(() => {})
            .catch((err) => {
              expect(err.status).toEqual(400);
            });
        });
    });
  }); 
});
