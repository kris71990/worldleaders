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

const parseElectionDates = (dates) => {
  if (dates === 'unknown') return 'Unknown';
  if (dates.length > 1) {
    if (dates.every(date => date === dates[0])) return dates[0];
  }
  return dates;
};

const sortElectionDates = (elections, type) => {
  if (type === 'leg') {
    const sortedElections = elections.sort((a, b) => {
      if (a.electionDates.leg.next === 'unknown') return b - a;

      const legNextA = new Date(a.electionDates.leg.next[0]);
      const legNextB = new Date(b.electionDates.leg.next[0]);
      return legNextA - legNextB;
    });
    return sortedElections;
  }
  
  if (type === 'exec') {
    const sortedElections = elections.sort((a, b) => {
      if (a.electionDates.exec.next === 'unknown') return b - a;

      const execNextA = new Date(a.electionDates.exec.next[0]);
      const execNextB = new Date(b.electionDates.exec.next[0]);
      return execNextA - execNextB;
    });
    return sortedElections;
  }
  return elections;
};

export { 
  parseCountryName, parseFullCountryName, parseElectionDates, sortElectionDates,
};
