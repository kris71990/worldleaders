'use strict';

import { createTestClient } from 'apollo-server-testing';
import { assert } from 'chai';

import { server, closeDbConnection, dropTestDb, startServer } from '../lib/server';
import { GET_COUNTRIES, GET_COUNTRY, GET_COUNTRIES_CIA } from './lib/queries.test';
import { createCountryMock, createFakeMock, removeCountryMock } from './lib/country-mock';
// import { createFakeMockSystem } from './lib/system-mock';

before(() => {
  return startServer()
    .then(() => console.log('database connected'));
  // .then(() => dropTestDb());
});
afterEach(removeCountryMock);
after(() => {
  return dropTestDb()
    .then(() => closeDbConnection())
    .then(() => console.log('database disconnected'));
});

const { query } = createTestClient(server);

describe('Testing country queries and mutations...', function () {
  describe('/countries/cia', function () {
    it('should return array of strings of all country names in CIA factbook', async () => {
      const { data, errors } = await query({ query: GET_COUNTRIES_CIA });
      assert.isUndefined(errors);
      assert.isArray(data.countriesCIA);
      assert.lengthOf(data.countriesCIA, 240);
      assert.isString(data.countriesCIA[0]);
    });
  });

  describe('/countries/db', function () {
    it('should return empty array if no countries exist', async () => {
      const { data, errors } = await query({ query: GET_COUNTRIES });
      assert.isUndefined(errors);
      assert.isArray(data.countries);
      assert.lengthOf(data.countries, 0);
    });

    it('should return array of countries that exist', async () => {
      return createCountryMock() // add one country
        .then(async () => {
          const { data, errors } = await query({ query: GET_COUNTRIES });
          assert.isUndefined(errors);
          assert.isArray(data.countries);
          assert.lengthOf(data.countries, 1);
          assert.hasAllKeys(data.countries[0], ['_id', 'countryName']);
        });
    });
  });

  describe('/country/:id', function () {
    it('should return a single country', async () => {
      return createCountryMock()
        .then(async (countryMock) => {
          const { data, errors } = await query({ 
            query: GET_COUNTRY, 
            variables: {
              id: countryMock.country._id.toString(),
            },
          });
          assert.equal(errors, undefined);
          assert.isObject(data.country);
          assert.equal(data.country.countryName, 'benin');
          assert.equal(data.country._id, countryMock.country.id);
          assert.lengthOf(Object.keys(data.country), 23);
        });
    });

    it('should return error for nonexisting country', async () => {
      const { data, errors } = await query({ 
        query: GET_COUNTRY,
        variables: {
          id: '1234',
        },
      });
      assert.exists(errors);
      assert.isNull(data.country);
    });

    it('should return error for missing country id', async () => {
      const { errors } = await query({ 
        query: GET_COUNTRY,
      });
      assert.exists(errors);
      assert.equal(errors[0].message, 'Variable "$id" of required type "String!" was not provided.');
    });
  });

  // describe('POST to /countries', () => {
  //   test('POST under normal circumstances returns 201', () => {
  //     return superagent.post(`${REST_API_URL}/country`)
  //       .send({
  //         countryName: 'democratic republic of congo',
  //       })
  //       .then((response) => {
  //         expect(response.status).toEqual(201);
  //         expect(response.body.countryName).toEqual('congo_democratic_republic_of_the');
  //         expect(response.body.population).toBeTruthy();
  //         expect(response.body.area).toBeTruthy();
  //         expect(response.body.gdpPPPRank).toBeTruthy();
  //         expect(response.body.imports).toBeInstanceOf(Array);
  //         expect(response.body.exports).toBeInstanceOf(Array);
  //         expect(response.body.naturalResources).toBeInstanceOf(Array);
  //         expect(response.body.ethnicities).toBeInstanceOf(Array);
  //         expect(response.body.languages).toBeInstanceOf(Array);
  //         expect(response.body.religions).toBeInstanceOf(Array);
  //       });
  //   });

  //   test('POST a country without bordering countries should return empty array for border countries', () => {
  //     return superagent.post(`${API_URL}/countries`)
  //       .send({
  //         countryName: 'the bahamas',
  //       })
  //       .then((response) => {
  //         expect(response.status).toEqual(201);
  //         expect(response.body.countryName).toEqual('bahamas_the');
  //         expect(response.body.borderCountries).toBeInstanceOf(Array);
  //         expect(response.body.borderCountries).toHaveLength(0);
  //       });
  //   });

  //   test('POST a country that does not exist returns 404', () => {
  //     return superagent.post(`${API_URL}/countries`)
  //       .send({
  //         countryName: 'beni',
  //       })
  //       .then(() => {})
  //       .catch((error) => {
  //         expect(error.status).toEqual(404);
  //       });
  //   });

  //   test('POST a country that already exists returns 409', () => {
  //     return superagent.post(`${API_URL}/countries`)
  //       .send({
  //         countryName: 'china',
  //       })
  //       .then(() => {
  //         return superagent.post(`${API_URL}/countries`)
  //           .send({
  //             countryName: 'china',
  //           });
  //       })
  //       .catch((error) => {
  //         expect(error.status).toEqual(409);
  //       });
  //   });

  //   test('POST with improper arguments returns 400', () => {
  //     return superagent.post(`${API_URL}/countries`)
  //       .send({
  //         countryName: 'ecuador',
  //         typeOfGovernment: 'democracy',
  //         headOfState: 'Donald Trump',
  //       })
  //       .then(() => Promise.reject())
  //       .catch((error) => {
  //         expect(error.status).toEqual(400);
  //       });
  //   });

  //   test('POST with no arguments returns 400', () => {
  //     return superagent.post(`${API_URL}/countries`)
  //       .then(() => {})
  //       .catch((error) => {
  //         expect(error.status).toEqual(400);
  //       });
  //   });
  // });

  // describe('POST - additional middleware testing', () => {
  //   test('bahamas (no the)', () => {
  //     return superagent.post(`${API_URL}/countries`)
  //       .send({
  //         countryName: 'bahamas',
  //       })
  //       .then((response) => {
  //         expect(response.body.countryName).toEqual('bahamas_the');
  //       });
  //   });

  //   test('netherlands (with the)', () => {
  //     return superagent.post(`${API_URL}/countries`)
  //       .send({
  //         countryName: 'the netherlands',
  //       })
  //       .then((response) => {
  //         expect(response.body.countryName).toEqual('netherlands');
  //       });
  //   });

  //   test('congo (rep)', () => {
  //     return superagent.post(`${API_URL}/countries`)
  //       .send({
  //         countryName: 'congo',
  //       })
  //       .then((response) => {
  //         expect(response.body.countryName).toEqual('congo_republic_of_the');
  //       });
  //   });

  //   test('ivory coast', () => {
  //     return superagent.post(`${API_URL}/countries`)
  //       .send({
  //         countryName: 'ivory coast',
  //       })
  //       .then((response) => {
  //         expect(response.body.countryName).toEqual('cote_d\'_ivoire');
  //       });
  //   });

  //   test('czech republic', () => {
  //     return superagent.post(`${API_URL}/countries`)
  //       .send({
  //         countryName: 'czech republic',
  //       })
  //       .then((response) => {
  //         expect(response.body.countryName).toEqual('czechia');
  //       });
  //   });

  //   test('south korea', () => {
  //     return superagent.post(`${API_URL}/countries`)
  //       .send({
  //         countryName: 'south korea',
  //       })
  //       .then((response) => {
  //         expect(response.body.countryName).toEqual('korea_south');
  //       });
  //   });
  // }); 

  // describe('PUT to countries/:id', () => {
  //   test('PUT with old lastUpdated date should return updated data', () => {
  //     return createCountryMock(true)
  //       .then((response) => {
  //         expect(response.country.lastUpdated).toEqual('test');
  //         return superagent.put(`${API_URL}/countries/${response.country._id}`)
  //           .then((res) => {
  //             expect(res.status).toEqual(201);
  //             expect(res.body).toBeTruthy();
  //             expect(res.body.lastUpdated).not.toEqual('test');
  //           });
  //       });
  //   });

  //   test('PUT should with current lastUpdated date should return same data', () => {
  //     return createCountryMock(false)
  //       .then((response) => {
  //         return superagent.put(`${API_URL}/countries/${response.country._id}`)
  //           .then((res) => {
  //             expect(res.status).toEqual(200);
  //             expect(res.body).toBeTruthy();
  //             expect(res.body.lastUpdated).toEqual(response.country.lastUpdated);
  //           });
  //       });
  //   });

  //   test('PUT with incorrect country id will return 404', () => {
  //     return createCountryMock()
  //       .then(() => {
  //         return superagent.put(`${API_URL}/countries/1234`)
  //           .then(() => {})
  //           .catch((error) => {
  //             expect(error.status).toEqual(404);
  //           });
  //       });
  //   });

  //   test('PUT with incorrect arguments will return 400', () => {
  //     return createCountryMock()
  //       .then((mock) => {
  //         return superagent.put(`${API_URL}/countries/${mock.country._id}`)
  //           .send({
  //             ocean: 'Atlantic',
  //           })
  //           .then(() => {})
  //           .catch((err) => {
  //             expect(err.status).toEqual(400);
  //           });
  //       });
  //   });
  // });

  // describe('DELETE /countries/:id', () => {
  //   test('Delete a country that no longer exists in the world should return 204', () => {
  //     return createFakeMock('fake country', 'fake system')
  //       .then((mock) => {
  //         return superagent.delete(`${API_URL}/countries/${mock.country._id}`)
  //           .then((response) => {
  //             expect(response.status).toEqual(204);
  //           });
  //       });
  //   });

  //   test('Delete a country that no longer exists returns 204, system is also deleted', () => {
  //     return createFakeMockSystem('fake country')
  //       .then((mock) => {
  //         return superagent.delete(`${API_URL}/countries/${mock.country._id}`)
  //           .then((response) => {
  //             expect(response.status).toEqual(204);
  //           });
  //       });
  //   });

  //   test('Delete a country that still exists returns 400', () => {
  //     return createCountryMock()
  //       .then((mock) => {
  //         return superagent.delete(`${API_URL}/countries/${mock.country._id}`)
  //           .then(() => {})
  //           .catch((err) => {
  //             expect(err.status).toEqual(400);
  //           });
  //       });
  //   });

  //   test('Delete with bad id returns 400', () => {
  //     return createCountryMock()
  //       .then(() => {
  //         return superagent.delete(`${API_URL}/countries/1234`)
  //           .then(() => {})
  //           .catch((err) => {
  //             expect(err.status).toEqual(400);
  //           });
  //       });
  //   });
  // }); 
});
