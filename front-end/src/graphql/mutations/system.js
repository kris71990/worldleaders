import { gql } from '@apollo/client';

const ADD_SYSTEM = gql`
  mutation createSystem($countryId: String!, $countryName: String!) {
    createSystem(countryId: $countryId, countryName: $countryName) {
      _id
      countryName
      typeOfGovernment
    }
  }
`;

const UPDATE_SYSTEM = gql`
  mutation updateSystem($country: String!) {
    updateSystem(country: $country) {
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

const UPDATE_LEADER = gql`
  mutation updateLeader($id: String!, $leaderUrl: String!, $leaderType: String!) {
    updateLeader(id: $id, leaderUrl: $leaderUrl, leaderType: $leaderType) {
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

export { ADD_SYSTEM, UPDATE_SYSTEM, UPDATE_LEADER };
