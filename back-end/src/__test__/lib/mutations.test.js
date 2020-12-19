import { gql } from 'apollo-server-express';

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

export { ADD_COUNTRY, UPDATE_COUNTRY };
