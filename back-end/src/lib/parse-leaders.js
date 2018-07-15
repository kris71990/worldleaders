'use strict';

import logger from './logger';

if (selected.headOfGovernmentFull && selected.chiefOfStateFull) {
  const fullGov = selected.headOfGovernmentFull;
  const fullState = selected.chiefOfStateFull;
  const multsGov = fullGov.includes(';') ? fullGov.split('; ') : null;
  const multsState = fullState.includes(';') ? fullState.split(';') : null;
  
  const keywordsGov = {};
  if (multsGov) {
    multsGov.map((x, i) => {
      const split = multsGov[i].split(' ');
      const root = multsGov[i].match(/\b[A-Z]+\b/g);
      if (!root) return null;
      if (root.length === 1) {
        const main = split.indexOf(root[0]);
        keywordsGov[i + 1] = split.slice(0, main + 1);
      } else {
        root.forEach((y) => {
          console.log(multsGov[i].split(' ').indexOf(y));
        });
      }
      return null;
    });
  } else {
    const split = fullGov.split(' ');
    const root = fullGov.match(/\b[A-Z]+\b/g);

    if (root) {
      if (root.length === 1) {
        const main = split.indexOf(root[0]);
        keywordsGov[1] = split.slice(0, main + 1);
      } else {
        console.log('more than one capitalized word');
      }
    }
  }
  console.log(keywordsGov);

  // const keywordsState = {};
  // if (multsState) {
  //   multsState.map((x, i) => {
  //     keywordsState[i] = multsState[i].match(/\b[A-Z]+\b/g);
  //     let ind = multsState[i].indexOf(keywordsState[i]);
  //     // console.log(ind);
  //     return null;
  //   });
  // } else {
  //   keywordsState[1] = fullState.match(/\b[A-Z]+\b/g);
  //   let ind = fullState.indexOf(keywordsState[1]);
  // console.log(ind);
  // }
}
