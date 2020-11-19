'use strict';

export default {
  Query: {
    countries: (_, __, { dataSources }) => dataSources.countryAPI.getAllCountries(),
    country: (_, { _id }, { dataSources }) => dataSources.countryAPI.getCountry({ _id }),
    systems: (_, __, { dataSources }) => dataSources.systemAPI.getAllSystems(),
  },
};
