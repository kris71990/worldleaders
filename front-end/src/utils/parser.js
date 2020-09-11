const parseCountryName = (countryName) => {
  if (countryName.includes('_')) {
    return countryName.split('_').map(y => y.charAt(0).toUpperCase() + y.slice(1)).join(' ');
  }
  return countryName.charAt(0).toUpperCase() + countryName.slice(1);
};

export { parseCountryName };
