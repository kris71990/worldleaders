'use strict';

import express from 'express';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import fs from 'fs';
import superagent from 'superagent';
import HttpError from 'http-errors';
import logger from './logger';
import countryRouter from '../routes/country-router';
import govSystemRouter from '../routes/gov-system-router';
import errorMiddleware from './error-middleware';

mongoose.Promise = bluebird;

const app = express();
let server = null;

app.use(countryRouter);
app.use(govSystemRouter);

app.all('*', (request, response) => {
  logger.log(logger.INFO, '404 - not found from catch-all');
  return response.sendStatus(404);
});

app.use(errorMiddleware);

// const file = fs.createWriteStream('file.txt');

// app.get('https://raw.githubusercontent.com/iancoleman/cia_world_factbook_api/master/data/2018-04-30_factbook.json', (response) => {    
//   console.log(response);
//   response.on('data', (data) => {
//     file.write(data);
//   });
//   response.on('end', () => {
//     file.end();
//   });
//   logger.log(logger.INFO, 'Newest data received');
// });

const startServer = () => {
  return mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true })
    .then(() => {
      return superagent.get('https://raw.githubusercontent.com/iancoleman/cia_world_factbook_api/master/data/2018-04-30_factbook.json')
        .then((res) => {
          fs.writeFile('data.json', res.text, (err) => {
            if (err) throw new HttpError(400, 'problem accessing data');
            logger.log(logger.INFO, 'Data up to date');
          });
          server = app.listen(process.env.PORT, () => {
            logger.log(logger.INFO, `Server listening on port ${process.env.PORT}`);
          });
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
