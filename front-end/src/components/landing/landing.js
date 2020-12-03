import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';

import CountryForm from '../forms/countryForm/countryForm';
import SelectMenu from '../select-country/select-country';
import * as countryActions from '../../actions/countryActions';
import GET_COUNTRIES from '../../graphql/queries';
import * as routes from '../../utils/routes';
import './landing.scss';

function Landing(props) {
  const [selected, setSelected] = useState('');
  const [redirect, setRedirect] = useState(false);
  
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  useEffect(() => {
    props.countryListFetch();
  }, []);

  const handleCreateCountry = (country) => {
    return props.countryCreate(country)
      .then(() => {
        props.history.push(routes.ROOT_ROUTE);
      });
  };

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
        onComplete={ handleCreateCountry } 
        countries={ props.countryList }
      />
      { redirect 
        ? <Redirect to={{ pathname: '/countries', state: { selected } }}/> 
        : null 
      }
    </div>
  );
}

Landing.propTypes = {
  countryList: PropTypes.array,
  countriesExisting: PropTypes.array,
  countryListFetch: PropTypes.func,
  countriesFetch: PropTypes.func,
  countryCreate: PropTypes.func,
  history: PropTypes.object,
  selected: PropTypes.string,
  redirect: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    countryList: state.countries.countries,
    countriesExisting: state.countries.existing,
  };
};

const mapDispatchToProps = dispatch => ({
  countryListFetch: () => dispatch(countryActions.countryListGetRequest()),
  countryCreate: country => dispatch(countryActions.countryCreateRequest(country)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
