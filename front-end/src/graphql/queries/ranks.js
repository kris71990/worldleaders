import { gql } from '@apollo/client';

const GET_GDP_RANK = gql`
  query {
    rankingsGDP {
      _id
      countryName
      gdpPPPRank
    }
  }
`;

const GET_POP_RANK = gql`
  query {
    rankingsPop {
      _id
      countryName
      population
      populationRank
    }
  }
`;

const GET_AREA_RANK = gql`
  query {
    rankingsArea {
      _id
      countryName
      area
      areaRank
    }
  }
`;

export { GET_AREA_RANK, GET_POP_RANK, GET_GDP_RANK };
