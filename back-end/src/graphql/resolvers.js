'use strict';

export default {
  Query: {
    countries: (_, __, { dataSources }) => dataSources.countryAPI.getCountries(),
    country: (_, { id }, { dataSources }) => dataSources.countryAPI.getCountry(id),
    
    system: (_, { country }, { dataSources }) => dataSources.systemAPI.getSystem(country),
    systems: (_, __, { dataSources }) => dataSources.systemAPI.getSystems(),

    rankingsGDP: (_, __, { dataSources }) => dataSources.countryAPI.getGDPRankings(),
    rankingsArea: (_, __, { dataSources }) => dataSources.countryAPI.getAreaRankings(),
    rankingsPop: (_, __, { dataSources }) => dataSources.countryAPI.getPopRankings(),
  },

  Mutation: {
    createCountry: (_, { countryName }, { dataSources }) => dataSources.countryAPI.postCountry(countryName),
    updateFlag: (_, { id, flagUrl }, { dataSources }) => dataSources.countryAPI.putFlag(id, flagUrl),
    createSystem: (_, { countryId, countryName }, { dataSources }) => dataSources.systemAPI.postSystem({ countryId, countryName }),
    updateCountry: (_, { id }, { dataSources }) => dataSources.countryAPI.putCountry(id),
    updateSystem: (_, { country }, { dataSources }) => dataSources.systemAPI.putSystem(country),

    // **
    removeCountry: (_, { id }, { dataSources }) => dataSources.countryAPI.deleteCountry(id),
    updateLeader: (_, { id, leaderUrl, leaderType }, { dataSources }) => dataSources.systemAPI.putLeader({ id, leaderUrl, leaderType }),
    // **
  },
};
