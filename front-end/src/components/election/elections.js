import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useQuery } from '@apollo/client';
import { GET_ELECTIONS } from '../../graphql/queries/system';

import * as parser from '../../utils/parser';

import './elections.scss';

function Elections() {
  const [elections, setElections] = useState(null);
  const [type, setType] = useState('executive');

  const { loading, error, data } = useQuery(GET_ELECTIONS);

  useEffect(() => {
    if (data && data.systems) {
      setElections(data.systems);
    }
  }, [data]);

  const handleToggleElectionType = (e) => {
    if (e.target.textContent === 'Legislative') {
      return setType('legislative');
    }
    return setType('executive');
  };

  const handleComputeUnknownClass = (dates) => {
    if (type === 'legislative' && dates.leg.next[0] === 'unknown') return 'unknown';
    if (type === 'executive' && dates.exec.next[0] === 'unknown') return 'unknown';
    return null;
  };

  if (loading) return 'Loading...';
  if (error) return `Error: ${error.message}`;
  let futureElectionsJSX = null;

  if (elections) {
    let sortedElections;
    if (type === 'legislative') {
      sortedElections = parser.sortElectionDates(elections, 'leg');
    } else {
      sortedElections = parser.sortElectionDates(elections, 'exec');
    }

    futureElectionsJSX = 
      <table className="election-tracker">
        <tbody>
        {
          sortedElections.map((system) => {
            const { countryName } = system;
            const parsedCountry = parser.parseCountryName(countryName);
            const className = countryName.includes(' ') ? countryName.replace(' ', '-') : countryName;
            const systemUrl = `https://en.wikipedia.org/wiki/${countryName}`;

            return (
              <tr key={ system._id } className={ className }>
                <td className={`country ${handleComputeUnknownClass(system.electionDates)}`}>
                  <a target="_blank" rel="noopener noreferrer" href={ systemUrl }>
                    { parsedCountry }
                  </a>
                </td>
                <td className={`dates ${handleComputeUnknownClass(system.electionDates)}`}>
                  { type === 'legislative' ?
                    parser.parseElectionDates(system.electionDates.leg.next)
                    : parser.parseElectionDates(system.electionDates.exec.next)
                  }
                </td>
              </tr>
            );
          })
        }
        </tbody>
      </table>;
  }

  return (
    <div className="election-info">
      <h3>Upcoming Elections Tracker</h3>
      <div className="toggle-buttons">
        <button 
          onClick={ handleToggleElectionType }
          className={ type === 'executive' ? 'selected' : null }
        >Executive</button>
        <button 
          onClick={ handleToggleElectionType }
          className={ type === 'legislative' ? 'selected' : null }
        >Legislative</button>
      </div>
      { futureElectionsJSX }
    </div>
  );
}

Elections.propTypes = {
  history: PropTypes.object,
};

export default Elections;
