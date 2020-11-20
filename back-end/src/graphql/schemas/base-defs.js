'use strict';

import { gql } from 'apollo-server-express';

const baseTypeDefs = gql`
  type Query
  type Mutation
`;

export default baseTypeDefs;
