'use strict';

const leaderUrlValidator = (url) => {
  if (url.slice(0, 29) !== 'https://upload.wikimedia.org/') return false;

  const imgTypes = ['.svg', '.jpg', '.png'];
  if (imgTypes.indexOf(url.slice(url.length - 4)) === -1) return false;
  return true;
};

const flagUrlValidator = (url) => {
  if (url.slice(0, 29) !== 'https://upload.wikimedia.org/' 
      || !url.includes('Flag_of_')) {
    return false;
  }

  const imgTypes = ['.svg', '.jpg', '.png'];
  if (imgTypes.indexOf(url.slice(url.length - 4)) === -1) return false;
  return true;
};

export { leaderUrlValidator, flagUrlValidator };
