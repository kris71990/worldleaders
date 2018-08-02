'use strict';

import superagent from 'superagent';
import fs from 'fs';
import HttpError from 'http-errors';
import logger from './logger';
import data from '../../data.json';

export default () => {
  const { date } = data.metadata;

  logger.log(logger.INFO, `The current data is for ${date}`);
  
  return superagent.get('https://api.github.com/repos/iancoleman/cia_world_factbook_api')
    .then((file) => {
      const newestDate = file.body.updated_at.split('T')[0];
      let CIA_DATE;
      
      if (newestDate !== date) {
        CIA_DATE = newestDate;
        logger.log(logger.INFO, `The new data is for ${CIA_DATE}`);

        return superagent.get('https://raw.githubusercontent.com/iancoleman/cia_world_factbook_api/master/data/factbook.json')
          .then((newData) => {
            fs.writeFileSync('data.json', newData.text, (err) => {
              if (err) throw new HttpError(400, 'problem accessing data');
              logger.log(logger.INFO, `Updated with new data - ${CIA_DATE}`);
              return CIA_DATE;
            });
          })
          .catch(() => {
            throw new HttpError(400, 'error getting data');
          });
      } 

      logger.log(logger.INFO, `Data already up to date - ${newestDate}`);
      return newestDate;
    })
    .then(Promise.resolve())
    .catch(() => {
      throw new HttpError(400, 'error getting data');
    });
};
