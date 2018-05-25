'use strict';

import express from 'express';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import logger from './logger';

mongoose.Promise = bluebird;

const app = express();
let server = null;

app.all('*', (request, response) => {
  logger.log(logger.INFO, '404 - not found from catch-all');
  return response.sendStatus(404);
});

const startServer = () => {
  return mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      server = app.listen(process.env.PORT, () => {
        logger.log(logger.INFO, `Server listening on port ${process.env.PORT}`);
      });
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
