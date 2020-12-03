import { gql } from '@apollo/client';

const ADD_COUNTRY = gql`
  mutation createCountry($countryName: String!) {
    createCountry(countryName: $countryName) {
      _id
      countryName
    }
  }
`;

export default ADD_COUNTRY;
