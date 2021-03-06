'use strict';

import logger from './logger';

const findHOGKeywords = (string) => {
  logger.log(logger.INFO, 'finding keywords in head_of_government string');

  const fullGov = string;
  const multsGov = fullGov.includes(';') ? fullGov.split('; ') : null;
  
  let keywordsGov = [];
  const regex = /\b([A-Za-z]+[-])?[A-Z]+\b/g;

  if (multsGov) {
    multsGov.map((x, i) => {
      const split = multsGov[i].split(' ');
      const root = multsGov[i].match(regex);

      if (!root) return null;
      if (root.length === 1) {
        const main = split.indexOf(root[0]);
        const sliced = split.slice(0, main + 1).map(y => y.toLowerCase());
        sliced.forEach(word => keywordsGov.push(word));
      } else {
        const arr = [];
        root.forEach(y => arr.push(y.toLowerCase())); 
        keywordsGov = arr;
      }
      return null;
    });
  } else {
    const root = fullGov.match(regex);

    if (!root) return null;
    if (root) {
      if (root.length === 1) {
        const main = fullGov.indexOf(root[0]);
        const sliced = fullGov.slice(0, main + root[0].length).split(' ').map(y => y.toLowerCase());
        sliced.forEach(word => keywordsGov.push(word));
      } else {
        const arr = [];
        root.forEach(y => arr.push(y.toLowerCase())); 
        keywordsGov = arr;
      }
    }
  }

  return keywordsGov;
};

const findCOSKeywords = (string) => {
  logger.log(logger.INFO, 'finding keywords in chief_of_state string');

  const fullState = string;
  const multsState = fullState.includes(';') ? fullState.split('; ') : null;

  let keywordsState = [];
  const regex = /\b([A-Za-z]+[-])?[A-Z]+\b/g;

  if (multsState) {
    multsState.map((x) => {
      x = x.replace(/([,])?/g, '');
      const split = x.split(' ');
      const root = x.match(regex);

      if (!root) return null;
      if (root.length === 1) {
        const main = split.indexOf(root[0]);
        const sliced = split.slice(0, main + 1).map(y => y.toLowerCase());
        sliced.forEach(word => keywordsState.push(word));
      } else {
        const arr = [];
        root.forEach(y => arr.push(y.toLowerCase())); 
        keywordsState = arr;
      }
      return null;
    });
  } else {
    const split = fullState.split(' ');
    const root = fullState.match(regex);

    if (root) {
      if (root.length === 1) {
        const main = split.indexOf(root[0]);
        const sliced = split.slice(0, main + 1).map(y => y.toLowerCase());
        sliced.forEach(word => keywordsState.push(word));
      } else {
        const arr = [];
        root.forEach(y => arr.push(y.toLowerCase())); 
        keywordsState = arr;
      }
    }
  }

  return keywordsState;
};

export { findHOGKeywords, findCOSKeywords };
