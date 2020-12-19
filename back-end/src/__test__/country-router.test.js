'use strict';

import { createTestClient } from 'apollo-server-testing';
import { assert } from 'chai';

import { server, closeDbConnection, dropTestDb, startServer } from '../lib/server';
import { GET_COUNTRIES, GET_COUNTRY, GET_COUNTRIES_CIA } from './lib/queries.test';
import { ADD_COUNTRY, UPDATE_COUNTRY } from './lib/mutations.test';
import { createCountryMock, createFakeMock, removeCountryMock } from './lib/country-mock';
import { AddArgumentsAsVariables } from 'apollo-server-express';
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

const { query, mutate } = createTestClient(server);

describe('Testing country queries and mutations...', function () {
  describe('GET /countries/cia', function () {
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
      return createCountryMock({ country: 'benin' }) // add one country
        .then(async () => {
          const { data, errors } = await query({ query: GET_COUNTRIES });
          assert.isUndefined(errors);
          assert.isArray(data.countries);
          assert.lengthOf(data.countries, 1);
          assert.hasAllKeys(data.countries[0], ['_id', 'countryName']);
          assert.equal(data.countries[0].countryName, 'benin');
        });
    });
  });

  describe('GET /country/:id', function () {
    it('should return a single country', async () => {
      return createCountryMock({ country: 'benin' })
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
      assert.equal(errors[0].message, '404: Not Found');
    });

    it('should return error for missing country id', async () => {
      const { errors } = await query({ 
        query: GET_COUNTRY,
      });
      assert.exists(errors);
      assert.equal(errors[0].extensions.code, 'INTERNAL_SERVER_ERROR');
      assert.equal(errors[0].message, 'Variable "$id" of required type "String!" was not provided.');
    });
  });

  describe('POST /country', function () {
    it('should return posted country', async () => {
      const { data, errors } = await mutate({
        mutation: ADD_COUNTRY,
        variables: {
          countryName: 'singapore',
        },
      });
      assert.isUndefined(errors);
      assert.exists(data.createCountry);
      assert.isObject(data.createCountry);
      assert.hasAllKeys(data.createCountry, ['_id', 'countryName']);
    });

    it('should return error if country doesn\'t exist', async () => {
      const { data, errors } = await mutate({
        mutation: ADD_COUNTRY,
        variables: {
          countryName: 'nonexistent country',
        },
      });
      assert.exists(errors);
      assert.isNull(data.createCountry);
      assert.equal(errors[0].message, '404: Not Found');
    });

    it('should return error if country already exists', async () => {
      return createCountryMock({ country: 'benin' })
        .then(async (countryMock) => {
          const { data, errors } = await mutate({
            mutation: ADD_COUNTRY,
            variables: {
              countryName: countryMock.country.countryName,
            },
          });
          assert.exists(errors);
          assert.isNull(data.createCountry);
          assert.equal(errors[0].message, '409: Conflict');
        });
    });

    it('should return error if no country is given', async () => {
      const { errors } = await mutate({
        mutation: ADD_COUNTRY,
      });
      assert.exists(errors);
      assert.equal(errors[0].extensions.code, 'INTERNAL_SERVER_ERROR');
      assert.equal(errors[0].message, 'Variable "$countryName" of required type "String!" was not provided.');
    });
  });

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
