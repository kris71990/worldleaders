/* eslint-disable prefer-destructuring */

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
    elections.exec.next = ['unknown'];
  } else {
    const execNextDates = execNext.map(clause => clause.match(findDateRx));
    if (!execNextDates) {
      elections.exec.next = ['unknown'];
    } else {
      elections.exec.next = execNextDates[0];
    }
  }

  if (!execLast) {
    elections.exec.last = ['unknown'];
  } else {
    const execLastDates = execLast.map(clause => clause.match(findDateRx));
    if (!execLastDates) {
      elections.exec.last = ['unknown'];
    } else {
      elections.exec.last = execLastDates[0];
    }
  }

  if (!legNext) {
    elections.leg.next = ['unknown'];
  } else {
    const legNextDates = legNext.map(clause => clause.match(findDateRx));
    if (legNextDates[0] === null) {
      elections.leg.next = ['unknown'];
    } else {
      elections.leg.next = legNextDates[0];
    }
  }

  if (!legLast) {
    elections.leg.last = ['unknown'];
  } else {
    const legLastDates = legLast.map(clause => clause.match(findDateRx));
    if (!legLastDates) {
      elections.leg.last = ['unknown'];
    } else {
      elections.leg.last = legLastDates[0];
    }
  }

  return elections;
};

export default parseElectionDates;
