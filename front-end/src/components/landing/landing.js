import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';

import CountryForm from '../forms/countryForm/countryForm';
import SelectMenu from '../select-country/select-country';

import * as countryActions from '../../actions/countryActions';
import { GET_COUNTRIES } from '../../graphql/queries/country';

import './landing.scss';

function Landing(props) {
  const [selected, setSelected] = useState('');
  const [redirect, setRedirect] = useState(false);
  
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  useEffect(() => {
    props.countryListFetch();
  }, []);


  const handleChange = (e) => {
    return setSelected(e.target.value);
  };

  const handleSearch = () => {
    setSelected(selected);
    return setRedirect(true);
  };

  const handleCountBlurb = (countryCount) => {
    if (countryCount === 1) {
      return `Tracking ${countryCount} country`;
    }
    return `Tracking ${countryCount} countries and territories`;
  };

  if (loading) return 'Loading...';
  if (error) return `Error: ${error.message}`;

  return (
    <div className="landing">
      { data ? <p>{ handleCountBlurb(data.countries.length) }</p> : null }
      {
        data ?
          <SelectMenu 
            onClick={ handleSearch } 
            onChange={ handleChange }
            value={ selected }
            countries={ data.countries }
          />
          : null
      }
      <p>---------------------</p>
      <CountryForm 
        countries={ props.countryList }
        history={ props.history }
      />
      { redirect 
        ? <Redirect to={{ 
          pathname: '/countries', 
          state: { selected, countryList: props.countryList },
        }}/> 
        : null 
      }
    </div>
  );
}

Landing.propTypes = {
  countryList: PropTypes.array,
  countryListFetch: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    countryList: state.countries.countries,
  };
};

const mapDispatchToProps = dispatch => ({
  countryListFetch: () => dispatch(countryActions.countryListGetRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
