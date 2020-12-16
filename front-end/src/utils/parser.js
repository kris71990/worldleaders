const parseCountryName = (countryName) => {
  if (countryName.includes('_')) {
    return countryName.split('_').map(y => y.charAt(0).toUpperCase() + y.slice(1)).join(' ');
  }
  return countryName.charAt(0).toUpperCase() + countryName.slice(1);
};

const parseFullCountryName = (fullName) => {
  if (fullName.includes(';')) return fullName.split(';')[0];
  return fullName;
};

const capitalize = (string) => {
  const splitStr = string.split(' ');
  if (splitStr.length > 1) {
    return splitStr.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
  }
  return splitStr[0].charAt(0).toUpperCase() + splitStr.slice(1);
};

const parseSystemType = (system) => {
  const rx = /[A-Z]/g;
  const index = system.search(rx);

  if (index === -1) return capitalize(system);
  const splitOnIndex = [system.slice(0, index), system.slice(index)];
  return `${splitOnIndex[0].charAt(0).toUpperCase()}${splitOnIndex[0].slice(1)} ${splitOnIndex[1]}`;
};

const parseDate = (date) => {
  return new Date(date).toDateString();
};

const parseElectionDates = (dates) => {
  if (dates === 'unknown') return 'Unknown';
  if (dates.length > 1) {
    if (dates.every(date => date === dates[0])) return dates[0];
  }
  return dates;
};

const sortElectionDates = (elections, type) => {
  if (type === 'leg') {
    const sortedElections = elections.slice().sort((a, b) => {
      if (a.electionDates.leg.next[0] === 'unknown') return b - a;

      const legNextA = new Date(a.electionDates.leg.next[0]);
      const legNextB = new Date(b.electionDates.leg.next[0]);
      return legNextA - legNextB;
    }, []);
    return sortedElections;
  }
  
  if (type === 'exec') {
    const sortedElections = elections.slice().sort((a, b) => {
      if (a.electionDates.exec.next[0] === 'unknown') return b - a;

      const execNextA = new Date(a.electionDates.exec.next[0]);
      const execNextB = new Date(b.electionDates.exec.next[0]);
      return execNextA - execNextB;
    }, []);
    return sortedElections;
  }
  return elections;
};

export { 
  parseCountryName, parseFullCountryName, parseElectionDates, sortElectionDates, capitalize, parseDate, parseSystemType,
};
