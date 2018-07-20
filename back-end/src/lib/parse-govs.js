'use strict';

import logger from './logger';

const parseFullGov = (string) => {
  logger.log(logger.INFO, 'Parsing government string');

  let type;
  if (string.includes('dictatorship') || string.includes('authoritarian') || string.includes('single-party') || string.includes('single party')) {
    type = 'dictatorship';
  } else if (string.includes('communist')) {
    type = 'communist state';
  } else if (string.includes('monarchy')) {
    if (string.includes('parliamentary')) {
      type = 'parliamentary monarchy';
    } else if (string.includes('constitutional') && !string.includes('parliamentary')) {
      type = 'constitutional monarchy';
    }
  } else if (string.includes('democracy')) {
    if (string.includes('parliamentary')) {
      type = 'parliamentary democracy';
    } else if (string.includes('presidential')) {
      type = 'presidential democracy';
    } else {
      type = 'democracy';
    }
  } else if (string.includes('republic')) {
    if (string.includes('parliamentary')) {
      type = 'parliamentary republic';
    } else if (string.includes('presidential')) {
      type = 'presidential republic';
    } else if (string.includes('constitutional')) {
      type = 'constitutional republic';
    } else {
      type = 'republic';
    }
  } else if (string.includes('federation')) {
    if (string.includes('presidential')) {
      type = 'presidential federation';
    } else {
      type = 'federation';
    }
  } else {
    type = 'unknown';
  }
  return type;
};

const filterDemocracies = (systems) => {
  logger.log(logger.INFO, 'Filtering system data for democracies');

  const democracies = systems.filter(country => country.includes('democracy'))
    .map((x) => {
      const split = x.split(' ');
      return split;
    }).map((y) => {
      let index = 0;
      y.forEach((z, i) => {
        switch (z) {
          case 'democracy':
            index = i + 1;
            return index;
          case 'democracy;':
            index = i + 1;
            return index;
          case 'democracy,':
            index = i + 1;
            return index;
          default: 
            return null;
        }
      }, 0);
      return y.slice(0, index).join(' ');
    });

  const parsedDemocracies = {};

  democracies.forEach((x) => {
    const parliamentary = x.includes('parliamentary');
    const presidential = x.includes('presidential');

    if (parliamentary) {
      if (!parsedDemocracies['parliamentary democracy']) {
        parsedDemocracies['parliamentary democracy'] = 1;
      } else {
        parsedDemocracies['parliamentary democracy'] += 1;
      }
    }
      
    if (presidential) {
      if (!parsedDemocracies['presidential democracy']) {
        parsedDemocracies['presidential democracy'] = 1;
      } else {
        parsedDemocracies['presidential democracy'] += 1;
      }
    }
  });
  return parsedDemocracies;
};

const filterRepublics = (systems) => {
  logger.log(logger.INFO, 'Filtering system data for republics');

  const republics = systems.filter(country => country.includes('republic'))
    .map((x) => {
      const split = x.split(' ');
      return split;
    }).map((y) => {
      let index = 0;
      y.forEach((z, i) => {
        switch (z) {
          case 'republic':
            index = i + 1;
            return index;
          case 'republic;':
            index = i + 1;
            return index;
          default: 
            return null;
        }
      }, 0);
      return y.slice(0, index).join(' ');
    });

  const parsedRepublics = {};

  republics.forEach((x) => {
    const parliamentary = x.includes('parliamentary');
    const presidential = x.includes('presidential');
    const theocratic = x.includes('theocratic');

    if (parliamentary) {
      if (!parsedRepublics['parliamentary republic']) {
        parsedRepublics['parliamentary republic'] = 1;
      } else {
        parsedRepublics['parliamentary republic'] += 1;
      }
    }
      
    if (presidential) {
      if (!parsedRepublics['presidential republic']) {
        parsedRepublics['presidential republic'] = 1;
      } else {
        parsedRepublics['presidential republic'] += 1;
      }
    }

    if (theocratic) {
      if (!parsedRepublics['theocratic republic']) {
        parsedRepublics['theocratic republic'] = 1;
      } else {
        parsedRepublics['theocratic republic'] += 1;
      }
    }
  });
  return parsedRepublics;
};

const filterMonarchies = (systems) => {
  logger.log(logger.INFO, 'Filtering system data for monarchies');

  const monarchies = systems.filter(country => country.includes('monarchy')).map((x) => {
    const split = x.split(' ');
    return split;
  }).map((y) => {
    let index = 0;
    y.forEach((z, i) => {
      if (z.includes('monarchy')) {
        index = i + 1;
        return index;
      }
      return null;  
    }, 0);
    return y.slice(0, index).join(' ');
  });

  const parsedMonarchies = {};

  monarchies.forEach((x) => {
    const parliamentary = x.includes('parliamentary');

    if (parliamentary) {
      if (!parsedMonarchies['parliamentary monarchy']) {
        parsedMonarchies['parliamentary monarchy'] = 1;
      } else {
        parsedMonarchies['parliamentary monarchy'] += 1;
      }
    } else if (!parliamentary) {
      if (!parsedMonarchies['constitutional monarchy']) {
        parsedMonarchies['constitutional monarchy'] = 1;
      } else {
        parsedMonarchies['constitutional monarchy'] += 1;
      }
    }
  });
  return parsedMonarchies;
};

const filterDictatorships = (systems) => {
  logger.log(logger.INFO, 'Filtering system data for dictatorships');

  const dictatorships = systems.filter(country => country.includes('dictatorship')).map((x) => {
    const split = x.split(' ');
    return split;
  }).map((y) => {
    let index = 0;
    y.forEach((z, i) => {
      if (z.includes('dictatorship')) {
        index = i + 1;
        return index;
      }
      return null;  
    }, 0);
    return y.slice(0, index).join(' ');
  });

  const parsedDictatorships = {};

  dictatorships.forEach(() => {
    if (!parsedDictatorships.dictatorship) {
      parsedDictatorships.dictatorship = 1;
    } else {
      parsedDictatorships.dictatorship += 1;
    }
  });
  return parsedDictatorships;
};

const filterCommunism = (systems) => {
  logger.log(logger.INFO, 'Filtering system data for communism');

  const communism = systems.filter(country => country.includes('communist')).map((x) => {
    const split = x.split(' ');
    return split;
  }).map((y) => {
    let index = 0;
    y.forEach((z, i) => {
      if (z.includes('communist')) {
        index = i + 2;
        return index;
      }
      return null;  
    }, 0);
    return y.slice(0, index).join(' ');
  });

  const parsedCommunists = {};

  communism.forEach(() => {
    if (!parsedCommunists['communist state']) {
      parsedCommunists['communist state'] = 1;
    } else {
      parsedCommunists['communist state'] += 1;
    }
  });
  return parsedCommunists;
};

export { 
  filterDemocracies, 
  filterRepublics, 
  filterMonarchies, 
  filterDictatorships, 
  filterCommunism,
  parseFullGov,
};
