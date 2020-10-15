'use strict';

import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

import cors from 'cors';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import HttpError from 'http-errors';

import logger from './logger';
import countryRouter from '../routes/country-router';
import govSystemRouter from '../routes/gov-system-router';
import rankingsRouter from '../routes/rankings-router';
import photoRouter from '../routes/photo-router';
import errorMiddleware from './error-middleware';

mongoose.Promise = bluebird;

const app = express();
let server = null;

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

app.use(rankingsRouter);
app.use(countryRouter);
app.use(photoRouter);
app.use(govSystemRouter);

app.all('*', (request, response) => {
  logger.log(logger.INFO, '404 - not found from catch-all');
  return response.sendStatus(404);
});

app.use(errorMiddleware);

const startServer = () => {
  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      server = app.listen(process.env.PORT, () => {
        logger.log(logger.INFO, `Server listening on port ${process.env.PORT}`);
      });
    })
    .catch(() => {
      logger.log(logger.ERROR, 'Server failed to start');
      throw new HttpError(400, 'Error starting server');
    });
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
