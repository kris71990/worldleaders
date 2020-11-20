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
      // {
      //   name: country.ethnicities.name,
      //   percent: country.ethnicities.percent,
      // },
      languages: country.languages,
      // {
      //   name: country.languages.name,
      //   note: country.languages.note,
      // },
      religions: country.religions,
      // {
      //   name: country.religions.name,
      //   percent: country.religions.percent,
      //   breakdown: {
      //     name: country.religions.breakdown.name,
      //     percent: country.religions.breakdown.percent,
      //   },
      // },
      exports: country.exports,
      exportPartners: country.exportPartners,
      // {
      //   name: country.exportPartners.name,
      //   percent: country.exportPartners.percent,
      // },
      imports: country.imports,
      importPartners: country.importPartners,
      // {
      //   name: country.importPartners.name,
      //   percent: country.importPartners.percent,
      // },
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

  // async getExistingCountries() {
  //   const response = await this.get('/countries/existing');
  //   return (
  //     Array.isArray(response)
  //       ? response.map(country => this.countryReducer(country))
  //       : []
  //   );
  // }
}
