'use strict';

import logger from './logger';

const findHOGKeywords = (string) => {
  logger.log(logger.INFO, 'finding keywords in head_of_government string');
  // "President Enrique PENA NIETO (since 1 December 2012)"

  const fullGov = string;
  const multsGov = fullGov.includes(';') ? fullGov.split('; ') : null;
  
  const keywordsGov = {};
  const regex = /\b([A-Za-z]+[-])?[A-Z]+\b/g;

  if (multsGov) {
    multsGov.map((x, i) => {
      const split = multsGov[i].split(' ');
      const root = multsGov[i].match(regex);
      if (!root) return null;
      if (root.length === 1) {
        const main = split.indexOf(root[0]);
        keywordsGov[i + 1] = split.slice(0, main + 1);
      } else {
        const arr = [];
        root.forEach(y => arr.push(y)); 
        keywordsGov[i + 1] = arr;
      }
      return null;
    });
  } else {
    const root = fullGov.match(regex);

    if (root) {
      if (root.length === 1) {
        const main = fullGov.indexOf(root[0]);
        keywordsGov[1] = fullGov.slice(0, main + 1);
      } else {
        const arr = [];
        root.forEach(y => arr.push(y)); 
        keywordsGov[1] = arr;
      }
    }
  }

  console.log(keywordsGov);
  return keywordsGov;
};

const findCOSKeywords = (string) => {
  logger.log(logger.INFO, 'finding keywords in chief_of_state string');

  const fullState = string;
  const multsState = fullState.includes(';') ? fullState.split(';') : null;

  const keywordsState = {};
  const regex = /\b([A-Za-z]+[-])?[A-Z]+\b/g;

  if (multsState) {
    multsState.map((x, i) => {
      const split = multsState[i].split(' ');
      const root = multsState[i].match(regex);
      if (!root) return null;
      if (root.length === 1) {
        const main = split.indexOf(root[0]);
        keywordsState[i + 1] = split.slice(0, main + 1);
      } else {
        const arr = [];
        root.forEach(y => arr.push(y)); 
        keywordsState[i + 1] = arr;
      }
      return null;
    });
  } else {
    const split = fullState.split(' ');
    const root = fullState.match(regex);

    if (root) {
      if (root.length === 1) {
        const main = split.indexOf(root[0]);
        keywordsState[1] = split.slice(0, main + 1);
      } else {
        const arr = [];
        root.forEach(y => arr.push(y)); 
        keywordsState.push(arr);
      }
    }
  }
  
  console.log(keywordsState);
  return keywordsState;
};

export { findHOGKeywords, findCOSKeywords };
