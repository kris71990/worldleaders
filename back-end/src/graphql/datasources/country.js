import { RESTDataSource } from 'apollo-datasource-rest';

export default class CountryAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `http://localhost:${process.env.PORT}`;
  }

  countryReducer(country) {
    return {
      _id: country._id,
      countryName: country.countryName,
      location: country.location,
      area: country.area,
      areaRank: country.areaRank,
      population: country.population,
      populationRank: country.populationRank,
      lifeExpectancy: country.lifeExpectancy,
      lifeExpectancyRank: country.lifeExpectancyRank,
      gdpPPPRank: country.gdpPPPRank,
      borderCountries: country.borderCountries,
      naturalResources: country.naturalResources,
      ethnicities: country.ethnicities,
      languages: country.languages,
      religions: country.religions,
      exports: country.exports,
      exportPartners: country.exportPartners,
      imports: country.imports,
      importPartners: country.importPartners,
      typeOfGovernment: country.typeOfGovernment,
      hasLinkedSystem: country.hasLinkedSystem,
      flagUrl: country.flagUrl,
      lastUpdated: country.lastUpdated,
    };
  }

  // create country from cia data
  postCountry(countryName) {
    return this.post('/country', { countryName })
      .then((newCountry) => {
        return this.countryReducer(newCountry);
      });
  }

  getCountriesCIA() {
    return this.get('/countries/cia')
      .then((responseCountries) => {
        return Array.isArray ? responseCountries : [];
      });
  }

  // get all countries in database
  getCountries() {
    return this.get('/countries/db')
      .then((responseCountries) => {
        return (
          Array.isArray(responseCountries) 
            ? responseCountries.map(country => this.countryReducer(country))
            : []
        );
      });
  }

  // get one country by id
  getCountry(id) {
    return this.get(`/country/${id}`)
      .then((responseCountry) => {
        return this.countryReducer(responseCountry);
      });
  }

  // gets updated country information
  putCountry(id) {
    return this.put(`/country/${id}`)
      .then((responseCountry) => {
        return this.countryReducer(responseCountry);
      });
  }

  putFlag(id, flagUrl) {
    return this.put(`/country-flag/${id}`, { flagUrl })
      .then((responseCountry) => {
        return this.countryReducer(responseCountry);
      });
  }

  deleteCountry(id) {
    return this.delete(`/country/${id}`)
      .then((response) => {
        return response;
      });
  }

  // rankings
  getGDPRankings() {
    return this.get('/countries/db')
      .then((responseCountries) => {
        if (Array.isArray(responseCountries)) {
          return (
            responseCountries.sort((x, y) => {
              return x.gdpPPPRank - y.gdpPPPRank;
            })
              .map(country => this.countryReducer(country))
          );
        }
        return [];
      });
  }

  getAreaRankings() {
    return this.get('/countries/db')
      .then((responseCountries) => {
        if (Array.isArray(responseCountries)) {
          return (
            responseCountries.sort((x, y) => {
              return x.areaRank - y.areaRank;
            })
              .map(country => this.countryReducer(country))
          );
        }
        return [];
      });
  }

  getPopRankings() {
    return this.get('/countries/db')
      .then((responseCountries) => {
        if (Array.isArray(responseCountries)) {
          return (
            responseCountries.sort((x, y) => {
              return x.populationRank - y.populationRank;
            })
              .map(country => this.countryReducer(country))
          );
        }
        return [];
      });
  }
}
