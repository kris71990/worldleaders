'use strict';

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
// import cors from 'cors';
import HttpError from 'http-errors';

import baseTypeDefs from '../graphql/schemas/base-defs';
import countryTypeDefs from '../graphql/schemas/country-schema';
import systemTypeDefs from '../graphql/schemas/system-schema';
import resolvers from '../graphql/resolvers';
import CountryAPI from '../graphql/datasources/country';
import SystemAPI from '../graphql/datasources/system';

import logger from './logger';
// import countryRouter from '../routes/country-router';
// import govSystemRouter from '../routes/gov-system-router';
// import rankingsRouter from '../routes/rankings-router';
// import photoRouter from '../routes/photo-router';
import errorMiddleware from './error-middleware';

mongoose.promise = bluebird;

const app = express();

const connection = mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const server = new ApolloServer({ 
  introspection: true,
  playground: true,
  typeDefs: [baseTypeDefs, countryTypeDefs, systemTypeDefs],
  resolvers,
  dataSources: () => ({
    countryAPI: new CountryAPI({ connection }),
    systemAPI: new SystemAPI({ connection }),
  }),
});

server.applyMiddleware({ app });

app.all('*', (request, response) => {
  logger.log(logger.INFO, '404 - not found from catch-all');
  return response.sendStatus(404);
});

app.use(errorMiddleware);

const startServer = () => {
  // return mongoose.connect(process.env.MONGODB_URI, {
  //   useNewUrlParser: true,
  //   useCreateIndex: true,
  //   useUnifiedTopology: true,
  // })
  // .then(() => {
  app.listen({ port: process.env.PORT }, () => {
    logger.log(logger.INFO, `Server listening on port ${process.env.PORT}${server.graphqlPath}`);
  });
  // .catch(() => {
  //   logger.log(logger.ERROR, 'Server failed to start');
  //   return new HttpError(400, 'Error starting server');
  // });
};

const stopServer = () => {
  return mongoose.disconnect()
    .then(() => {
      server.close(() => {
        logger.log(logger.INFO, 'Server disconnected');
      });
    });
};

export { startServer, stopServer };
