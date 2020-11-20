'use strict';

import logger from './logger';

// This function parses the full type of government string - typeOfGovernmentFull - and returns a concise version of it as the typeOfGovernment field in the System model. This is then used below in countSystems() when displaying a tally of all systems
const parseFullGov = (string) => {
  logger.log(logger.INFO, 'Parsing government string');

  let type;
  if (string.includes('dictatorship') || string.includes('authoritarian') || string.includes('single-party') || string.includes('single party')) {
    type = 'dictatorship';
  } else if (string.includes('communist')) {
    type = 'communist state';
  } else if (string.includes('democracy')) {
    if (string.includes('parliamentary')) {
      type = 'parliamentary democracy';
    } else if (string.includes('presidential')) {
      type = 'presidential democracy';
    } else {
      type = 'democracy';
    }
  } else if (string.includes('republic')) {
    if (string.includes('theocratic')) {
      type = 'theocratic republic';
    } else if (string.includes('parliamentary')) {
      type = 'parliamentary republic';
    } else if (string.includes('presidential')) {
      type = 'presidential republic';
    } else if (string.includes('constitutional')) {
      type = 'constitutional republic';
    } else {
      type = 'republic';
    }
  } else if (string.includes('monarchy')) {
    if (string.includes('parliamentary')) {
      type = 'parliamentary monarchy';
    } else if (string.includes('constitutional') && !string.includes('parliamentary')) {
      type = 'constitutional monarchy';
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

// This function counts the types of governmental systems using the typeOfGovernment field in the System collection (produced above in parseGov())
const countSystems = (systems) => {
  logger.log(logger.INFO, 'Counting systems');

  const countedSystems = {};

  systems.forEach((x) => {
    switch (x) {
      case 'dictatorship': {
        if (countedSystems.dictatorship) {
          countedSystems.dictatorship += 1;
        } else {
          countedSystems.dictatorship = 1;
        }
        break;
      }
      case 'communist state': {
        if (countedSystems.communistState) {
          countedSystems.communistState += 1;
        } else {
          countedSystems.communistState = 1;
        }
        break;
      }
      case 'parliamentary democracy': {
        if (countedSystems.parliamentaryDemocracy) {
          countedSystems.parliamentaryDemocracy += 1;
        } else {
          countedSystems.parliamentaryDemocracy = 1;
        }
        break;
      }
      case 'presidential democracy': {
        if (countedSystems.presidentialDemocracy) {
          countedSystems.presidentialDemocracy += 1;
        } else {
          countedSystems.presidentialDemocracy = 1;
        }
        break;
      }
      case 'democracy': {
        if (countedSystems.democracy) {
          countedSystems.democracy += 1;
        } else {
          countedSystems.democracy = 1;
        }
        break;
      }
      case 'parliamentary republic': {
        if (countedSystems.parliamentaryRepublic) {
          countedSystems.parliamentaryRepublic += 1;
        } else {
          countedSystems.parliamentaryRepublic = 1;
        }
        break;
      }
      case 'presidential republic': {
        if (countedSystems.presidentialRepublic) {
          countedSystems.presidentialRepublic += 1;
        } else {
          countedSystems.presidentialRepublic = 1;
        }
        break;
      }
      case 'constitutional republic': {
        if (countedSystems.constitutionalRepublic) {
          countedSystems.constitutionalRepublic += 1;
        } else {
          countedSystems.constitutionalRepublic = 1;
        }
        break;
      }
      case 'theocratic republic': {
        if (countedSystems.theocraticRepublic) {
          countedSystems.theocraticRepublic += 1;
        } else {
          countedSystems.theocraticRepublic = 1;
        }
        break;
      }
      case 'republic': {
        if (countedSystems.republic) {
          countedSystems.republic += 1;
        } else {
          countedSystems.republic = 1;
        }
        break;
      }
      case 'parliamentary monarchy': {
        if (countedSystems.parliamentaryMonarchy) {
          countedSystems.parliamentaryMonarchy += 1;
        } else {
          countedSystems.parliamentaryMonarchy = 1;
        }
        break;
      }
      case 'constitutional monarchy': {
        if (countedSystems.constitutionalMonarchy) {
          countedSystems.constitutionalMonarchy += 1;
        } else {
          countedSystems.constitutionalMonarchy = 1;
        }
        break;
      }
      case 'presidential federation': {
        if (countedSystems.presidentialFederation) {
          countedSystems.presidentialFederation += 1;
        } else {
          countedSystems.presidentialFederation = 1;
        }
        break;
      }
      case 'federation': {
        if (countedSystems.federation) {
          countedSystems.federation += 1;
        } else {
          countedSystems.federation = 1;
        }
        break;
      }
      default: {
        if (countedSystems.unknown) {
          countedSystems.unknown += 1;
        } else {
          countedSystems.unknown = 1;
        }
      }
    }
  });

  logger.log(logger.INFO, 'returning system tally');
  return countedSystems;
};

export { parseFullGov, countSystems };
