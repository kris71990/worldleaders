'use strict';

import logger from './logger';

const parseElectionDates = (exec, leg) => {
  logger.log(logger.INFO, 'Parsing election dates');

  const elections = { exec: {}, leg: {} };
  const findNextRx = /(((next)+)(.*?)[)])/g;
  const findLastRx = /(last.*?)(([(])(.*?))/g;

  elections.exec.next = exec.match(findNextRx);
  elections.exec.last = exec.match(findLastRx);
  elections.leg.next = leg.match(findNextRx);
  elections.leg.last = leg.match(findLastRx);

  return elections;
};

export default parseElectionDates;
