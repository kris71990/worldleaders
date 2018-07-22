'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { createFakeGDPMock, createFakePopulationMock, createFakeAreaMock, createFakeLanguageMock, removeFakeMock } from './lib/rankings-mock';

const API_URL = `http://localhost:${process.env.PORT}`;

describe('RANKINGS ROUTER', () => {
  beforeAll(startServer);
  afterEach(removeFakeMock);
  afterAll(stopServer);

  describe('GDP', () => {
    beforeEach(() => createFakeGDPMock('benin', '124'));
    beforeEach(() => createFakeGDPMock('togo', '55'));
    beforeEach(() => createFakeGDPMock('australia', '8'));
    beforeEach(() => createFakeGDPMock('slovakia', '33'));

    test('GET from /rankings-gdp should return ordered array of countries in descending order of gdpPPPRank', () => {
      return superagent.get(`${API_URL}/rankings-gdp`)
        .then((response) => {
          expect(response.body).toBeInstanceOf(Array);
          expect(response.body).toHaveLength(4);
          expect(response.body[0].countryName).toEqual('australia');
          expect(response.body[1].countryName).toEqual('slovakia');
          expect(response.body[2].countryName).toEqual('togo');
          expect(response.body[3].countryName).toEqual('benin');
        });
    });
  });

  describe('Population', () => {
    beforeEach(() => createFakePopulationMock('iceland', '164'));
    beforeEach(() => createFakePopulationMock('denmark', '99'));
    beforeEach(() => createFakePopulationMock('luxembourg', '180'));
    beforeEach(() => createFakePopulationMock('china', '1'));

    test('GET from /rankings-population should return ordered array of countries in descending order of population', () => {
      return superagent.get(`${API_URL}/rankings-population`)
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body).toBeInstanceOf(Array);
          expect(response.body).toHaveLength(4);
          expect(response.body[0].countryName).toEqual('china');
          expect(response.body[1].countryName).toEqual('denmark');
          expect(response.body[2].countryName).toEqual('iceland');
          expect(response.body[3].countryName).toEqual('luxembourg');
        });
    });
  });

  describe('Area', () => {
    beforeEach(() => createFakeAreaMock('japan', '80'));
    beforeEach(() => createFakeAreaMock('canada', '2'));
    beforeEach(() => createFakeAreaMock('el salvador', '130'));
    beforeEach(() => createFakeAreaMock('russia', '1'));

    test('GET from /rankings-area should return ordered array of countries in descending order of population', () => {
      return superagent.get(`${API_URL}/rankings-area`)
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body).toBeInstanceOf(Array);
          expect(response.body).toHaveLength(4);
          expect(response.body[0].countryName).toEqual('russia');
          expect(response.body[1].countryName).toEqual('canada');
          expect(response.body[2].countryName).toEqual('japan');
          expect(response.body[3].countryName).toEqual('el salvador');
        });
    });
  });

  describe('Language Prevalence', () => {
    beforeEach(() => createFakeLanguageMock('united states', [{ name: 'english' }, { name: 'spanish' }, { name: 'french' }]));
    beforeEach(() => createFakeLanguageMock('armenia', [{ name: 'armenian' }, { name: 'english' }, { name: 'french' }]));
    beforeEach(() => createFakeLanguageMock('japan', [{ name: 'japanese' }, { name: 'english' }]));
    beforeEach(() => createFakeLanguageMock('china', [{ name: 'chinese' }, { name: 'japanese' }, { name: 'english' }]));
    beforeEach(() => createFakeLanguageMock('syria', [{ name: 'arabic' }, { name: 'japanese' }, { name: 'spanish' }]));

    test('GET from /rankings-language-prevalence should return ', () => {
      return superagent.get(`${API_URL}/rankings-language-prevalence`)
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body).toBeInstanceOf(Array);
          expect(response.body).toHaveLength(7);
          expect(response.body[0]).toEqual(['English', 4]);
          expect(response.body[1]).toEqual(['japanese', 3]);
          expect(response.body[2]).toEqual(['french', 2]);
          expect(response.body[3]).toEqual(['Spanish', 2]);
          expect(response.body[4]).toEqual(['Arabic', 1]);
          expect(response.body[5]).toEqual(['chinese', 1]);
          expect(response.body[6]).toEqual(['Armenian', 1]);
        });
    });
  });
});
