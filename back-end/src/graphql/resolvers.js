'use strict';

export default {
  Query: {
    countries: (_, __, { dataSources }) => dataSources.countryAPI.getCountries(),
    country: (_, { id }, { dataSources }) => dataSources.countryAPI.getCountry(id),

    systems: (_, __, { dataSources }) => dataSources.systemAPI.getSystems(),
    system: (_, { country }, { dataSources }) => dataSources.systemAPI.getSystem(country),

    rankingsGDP: (_, __, { dataSources }) => dataSources.countryAPI.getGDPRankings(),
    rankingsArea: (_, __, { dataSources }) => dataSources.countryAPI.getAreaRankings(),
    rankingsPop: (_, __, { dataSources }) => dataSources.countryAPI.getPopRankings(),

  },

  Mutation: {
    createCountry: (_, { countryName }, { dataSources }) => dataSources.countryAPI.postCountry(countryName),
    updateCountry: (_, { id }, { dataSources }) => dataSources.countryAPI.putCountry(id),
    updateFlag: (_, { id, flagUrl }, { dataSources }) => dataSources.countryAPI.putFlag(id, flagUrl),
    removeCountry: (_, { id }, { dataSources }) => dataSources.countryAPI.deleteCountry(id),

    createSystem: (_, { countryId, countryName }, { dataSources }) => dataSources.systemAPI.postSystem({ countryId, countryName }),
    updateSystem: (_, { country }, { dataSources }) => dataSources.systemAPI.putSystem(country),
    updateLeader: (_, { id, leaderUrl, leaderType }, { dataSources }) => dataSources.systemAPI.putLeader({ id, leaderUrl, leaderType }),
  },
};
