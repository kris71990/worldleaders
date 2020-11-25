'use strict';

import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Query {
    system(country: String!): System
    systems: [System]
  }

  extend type Mutation {
    createSystem(countryId: ID!, countryName: String!): System
    updateSystem(country: String!): System
    updateLeader(id: ID!, leaderUrl: String!, leaderType: String!): System
  }

  type System {
    _id: String!
    countryId: String!
    countryName: String!
    capital: [String]
    capitalCoordinates: [[Int]]
    independence: String
    fullName: String
    chiefOfStateFull: String
    headOfGovernmentFull: String
    chiefOfStateKeywords: [String]
    headOfGovernmentKeywords: [String]
    chiefOfStateImg: String
    headOfGovernmentImg: String
    electionDates: [DateSchema]
    electionsExec: String
    electionResultsExec: String
    electionsLeg: String
    electionResultsLeg: String
    typeOfGovernment: String
    typeOfGovernmentFull: String
    lastUpdated: String
  }

  type DateSchema {
    exec: Date
    leg: Date
  }

  type Date {
    next: [String]
    last: [String]
  }
`;

export default typeDefs;
