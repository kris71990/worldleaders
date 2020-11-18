'use strict';

export default {
  Query: {
    countries: (_, __, { dataSources }) => dataSources.countryAPI.getAllCountries(),
    country: (_, { id }, { dataSources }) => dataSources.countryAPI.getCountry({ id }),
  },
};
