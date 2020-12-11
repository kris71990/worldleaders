import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { useQuery } from '@apollo/client';
import { GET_SYSTEM } from '../../graphql/queries/system';

// import CapitalMap from '../capital-map/capital-map';
import SystemElections from '../system-elections/system-elections';
import SystemLeaders from '../system-leaders/system-leaders';

import * as systemActions from '../../actions/systemActions';
import * as parser from '../../utils/parser';
import './system.scss';

function System(props) {
  const [country] = useState(props.location.state.selected);
  const [system, setSystem] = useState({});

  const { loading, error, data } = useQuery(GET_SYSTEM, {
    variables: { country: country.countryName },
  });

  useEffect(() => {
    if (data && data.system) {
      setSystem(data.system);
    }
  }, [data]);

  const handleUpdateSystem = () => {
    props.systemUpdate(props.selected)
      .then(() => {
        props.systemGet(props.selected.countryName);
      });
  };

  if (loading) return 'Loading...';
  if (error) return `Error: ${error.message}`;

  let nameJSX = null;
  let capitalJSX = null;
  let typeJSX = null;
  let independenceJSX = null;

  if (system) {
    if (system.fullName === 'none') {
      nameJSX = <h1>{ parser.parseCountryName(system.countryName) }</h1>;
    } else if (system.fullName) {
      nameJSX = <h1>{ parser.parseFullCountryName(system.fullName) }</h1>;
    }

    if (system.typeOfGovernment) {
      typeJSX = 
        <div id="type">
          <h4>Type</h4>
          <p>{ system ? parser.capitalize(system.typeOfGovernment) : null }</p>
        </div>;
    }

    if (system.independence) {
      independenceJSX = 
        <div id="independence">
          <h4>Independence</h4>
          <p>{ system ? parser.parseDate(system.independence) : null }</p>
        </div>;
    }

    if (system.capital) {
      capitalJSX = 
        <div id="capitals">
          <h4>Capital</h4>
          <ul>
            {
              system.capital.map((x) => {
                return (
                  <li key={x}>{ x }</li>
                );
              })
            }
          </ul>
        </div>;
    }
  }

  return (
    <div className="system-info">
      <div id="info-status">
        <div>
          <p>Last Updated: { system ? system.lastUpdated : null }</p>
          <button onClick={ handleUpdateSystem }>Update</button> 
        </div>
      </div>
      { nameJSX }
      <div id="basic-system-info">
        { typeJSX }
        { capitalJSX }
        {
          // selected ? <CapitalMap selected={selected}/> : null
        }
        { independenceJSX }
      </div>
      <SystemLeaders selected={ system }/>
      <SystemElections selected={ system }/>
    </div>
  );
}

System.propTypes = {
  history: PropTypes.object,
  selected: PropTypes.object,
  location: PropTypes.object,
  systemGet: PropTypes.func,
  systemUpdate: PropTypes.func,
};


const mapDispatchToProps = dispatch => ({
  systemGet: system => dispatch(systemActions.systemGetRequest(system)),
  systemUpdate: country => dispatch(systemActions.systemUpdateRequest(country)),
});

export default connect(null, mapDispatchToProps)(System);
