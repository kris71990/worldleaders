'use strict';

import logger from './logger';

const parseElectionDates = (exec, leg) => {
  logger.log(logger.INFO, 'Parsing election dates');

  const elections = { exec: {}, leg: {} };
  const findNextRx = /(((next)+)(.*?)[)])/g;
  const findLastRx = /(last.*?)(([(])(.*?))/g;
  const findDateRx = /(((([0-9])(.*?)\s)|(\w+)\s)([\d]{4}))/g;

  const execNext = exec.match(findNextRx);
  const execLast = exec.match(findLastRx);
  const legNext = leg.match(findNextRx);
  const legLast = leg.match(findLastRx);

  if (!execNext) {
    elections.exec.next = null;
  } else {
    const execNextDates = execNext.map(clause => clause.match(findDateRx)[0]);
    elections.exec.next = execNextDates;
  }

  if (!execLast) {
    elections.exec.last = null;
  } else {
    const execLastDates = execLast.map(clause => clause.match(findDateRx)[0]);
    elections.exec.last = execLastDates;
  }

  if (!legNext) {
    elections.leg.next = null;
  } else {
    const legNextDates = legNext.map(clause => clause.match(findDateRx)[0]);
    elections.leg.next = legNextDates;
  }

  if (!legLast) {
    elections.leg.last = null;
  } else {
    const legLastDates = legLast.map(clause => clause.match(findDateRx)[0]);
    elections.leg.last = legLastDates;
  }

  return elections;
};

export default parseElectionDates;
