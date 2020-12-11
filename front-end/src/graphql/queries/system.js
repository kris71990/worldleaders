import { gql } from '@apollo/client';

const GET_SYSTEM = gql`
  query system($country: String!) {
    system(country: $country) {
      _id
      lastUpdated
      countryId
      countryName
      fullName
      capital
      capitalCoordinates
      independence
      typeOfGovernmentFull
      typeOfGovernment
      chiefOfStateFull
      chiefOfStateKeywords
      headOfGovernmentFull
      headOfGovernmentKeywords
      electionDates {
        exec {
          next
          last
        }
        leg {
          next
          last
        }
      }
      electionsExec
      electionResultsExec
      electionsLeg
      electionResultsLeg
    }
  }
`;

const GET_SYSTEMS = gql`
  query {
    systems {
      _id
      countryName
      typeOfGovernment
    }
  }
`;

export { GET_SYSTEM, GET_SYSTEMS };
