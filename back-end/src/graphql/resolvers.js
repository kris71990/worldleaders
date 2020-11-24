'use strict';

export default {
  Query: {
    countries: (_, __, { dataSources }) => dataSources.countryAPI.getCountries(),
    systems: (_, __, { dataSources }) => dataSources.systemAPI.getSystems(),

    country: (_, { _id }, { dataSources }) => dataSources.countryAPI.getCountry(_id),
    system: (_, { country }, { dataSources }) => dataSources.systemAPI.getSystem(country),
  },

  Mutation: {
    createCountry: (_, { countryName }, { dataSources }) => dataSources.countryAPI.postCountry(countryName),
    editCountry: (_, { _id }, { dataSources }) => dataSources.countryAPI.putCountry(_id),
    removeCountry: (_, { _id }, { dataSources }) => dataSources.countryAPI.deleteCountry(_id),

    createSystem: (_, { countryId, countryName }, { dataSources }) => dataSources.systemAPI.postSystem({ countryId, countryName }),
    updateSystem: (_, { country }, { dataSources }) => dataSources.systemAPI.putSystem(country),
  },
};
