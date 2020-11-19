import { RESTDataSource } from 'apollo-datasource-rest';

export default class CountryAPI extends RESTDataSource {
  constructor({ connection }) {
    super();
    this.store = connection;
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
      ethnicities: {
        name: country.ethnicities.name,
        percent: country.ethnicities.percent,
      },
      languages: {
        name: country.languages.name,
        note: country.languages.note,
      },
      religions: {
        name: country.religions.name,
        percent: country.religions.percent,
        breakdown: {
          name: country.religions.breakdown.name,
          percent: country.religions.breakdown.percent,
        },
      },
      exports: country.exports,
      exportPartners: {
        name: country.exportPartners.name,
        percent: country.exportPartners.percent,
      },
      imports: country.imports,
      importPartners: {
        name: country.importPartners.name,
        percent: country.importPartners.percent,
      },
      typeOfGovernment: country.typeOfGovernment,
      hasLinkedSystem: country.hasLinkedSystem,
      flagUrl: country.flagUrl,
      lastUpdated: country.lastUpdated,
    };
  }

  getAllCountries() {
    return this.get('/countries/all')
      .then((response) => {
        return (
          Array.isArray(response) 
            ? response.map(country => this.countryReducer(country))
            : []
        );
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

  getCountry({ _id }) {
    return this.get(`/country/${_id}`)
      .then((response) => {
        return (
          Array.isArray(response) 
            ? response.map(country => this.countryReducer(country))
            : []
        );
      });
  }
}
