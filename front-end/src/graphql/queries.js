import { gql } from '@apollo/client';

const GET_COUNTRIES = gql`
  query {
    countries {
      _id
      countryName
    }
  }
`;

export default GET_COUNTRIES;
