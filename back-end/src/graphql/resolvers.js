'use strict';

export default {
  Query: {
    countries: (_, __, { dataSources }) => dataSources.countryAPI.getAllCountries(),
    country: (_, { _id }, { dataSources }) => dataSources.countryAPI.getCountry(_id),
    system: (_, { country }, { dataSources }) => dataSources.systemAPI.getSystem(country),
  },
};
