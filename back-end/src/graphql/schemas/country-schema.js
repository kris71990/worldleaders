'use strict';

import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Query {
    countries: [Country]
    country(_id: String!): Country
  }

  extend type Mutation {
    createCountry(countryName: String!): Country
    editCountry(_id: ID!): Country
  }

  type Country {
    _id: String!
    countryName: String!
    location: String
    area: String
    areaRank: String
    population: String
    populationRank: String
    lifeExpectancy: String,
    lifeExpectancyRank: String
    gdpPPPRank: String
    borderCountries: [String]
    naturalResources: [String]
    ethnicities: [Ethnicity]
    languages: [Language]
    religions: [Religion]
    exports: [String]
    exportPartners: [Partner]
    imports: [String]
    importPartners: [Partner]
    typeOfGovernment: String
    hasLinkedSystem: Boolean
    flagUrl: String
    lastUpdated: String
  }
  
  type Ethnicity {
    name: String
    percent: Float
  }

  type Language {
    name: String
    note: String
  }

  type Religion {
    name: String
    percent: Float
    breakdown: [ReligionBreakdown]
  }

  type ReligionBreakdown {
    name: String
    percent: Float
  }

  type Partner {
    name: String
    percent: Float
  }
`;

export default typeDefs;
