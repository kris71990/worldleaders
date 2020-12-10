import { gql } from '@apollo/client';

const ADD_COUNTRY = gql`
  mutation createCountry($countryName: String!) {
    createCountry(countryName: $countryName) {
      _id
      countryName
    }
  }
`;

const UPDATE_COUNTRY = gql`
  mutation updateCountry($id: String!) {
    updateCountry(id: $id) {
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

const UPDATE_FLAG = gql`
  mutation updateFlag($id: String!, $flagUrl: String!) {
    updateFlag(id: $id, flagUrl: $flagUrl) {
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

const ADD_SYSTEM = gql`
  mutation createSystem($countryId: String!, $countryName: String!) {
    createSystem(countryId: $countryId, countryName: $countryName) {
      _id
      countryName
      typeOfGovernment
    }
  }
`;

export { 
  ADD_COUNTRY, UPDATE_COUNTRY, UPDATE_FLAG, ADD_SYSTEM, 
};
