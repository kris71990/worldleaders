'use strict';

import { gql } from 'apollo-server-express';

const GET_COUNTRIES_CIA = gql`
  query {
    countriesCIA
  }
`;

const GET_COUNTRIES = gql`
  query {
    countries {
      _id
      countryName
    }
  }
`;

const GET_COUNTRY = gql`
  query country($id: String!){
    country(id: $id) {
      _id
      countryName
      lastUpdated
      flagUrl
      hasLinkedSystem
      location
      area
      areaRank
      population
      populationRank
      lifeExpectancy
      lifeExpectancyRank
      gdpPPPRank
      typeOfGovernment
      borderCountries
      naturalResources
      ethnicities {
        name
        percent
      }
      languages {
        name
        note
      }
      religions {
        name
        percent
        breakdown {
          name
          percent
        }
      }
      exports
      imports
      exportPartners {
        name
        percent
      }
      importPartners {
        name
        percent
      }
    }
  }
`;

export { GET_COUNTRIES, GET_COUNTRY, GET_COUNTRIES_CIA };
