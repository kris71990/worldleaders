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
      chiefOfStateImg
      headOfGovernmentFull
      headOfGovernmentKeywords
      headOfGovernmentImg
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

const GET_ELECTIONS = gql`
  query {
    systems {
      _id
      countryName
      typeOfGovernment
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
    }
  }
`;

export { GET_SYSTEM, GET_SYSTEMS, GET_ELECTIONS };
