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

  // get all countries in database
  getAllCountries() {
    return this.get('/countries/all')
      .then((responseCountries) => {
        return (
          Array.isArray(responseCountries) 
            ? responseCountries.map(country => this.countryReducer(country))
            : []
        );
      });
  }

  // get one country by id
  getCountry(_id) {
    return this.get(`/countries/${_id}`)
      .then((responseCountry) => {
        return this.countryReducer(responseCountry);
      });
  }

  // create country from cia data
  postCountry(countryName) {
    return this.post('/countries', { countryName })
      .then((newCountry) => {
        return this.countryReducer(newCountry);
      });
  }

  // async getExistingCountries() {
  //   const response = await this.get('/countries/existing');
  //   return (
  //     Array.isArray(response)
  //       ? response.map(country => this.countryReducer(country))
  //       : []
  //   );
  // }
}
