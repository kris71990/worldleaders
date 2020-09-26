import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CountryBasic from '../country-basic/country-basic';
import CountryCulture from '../country-culture/country-culture';
import CountryEconomy from '../country-economy/country-economy';

import * as countryActions from '../../actions/countryActions';
// import * as routes from '../../utils/routes';
import './country.scss';

class Country extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.location.state;
  }

  componentDidMount() {
    this.props.countryGet(this.state)
      .then((response) => {
        this.setState({ selected: response.body });
        return this.props.countriesGetExisting();
      });
  }

  render() {
    const { selected, existing } = this.props;

    return (
      <div className="country-info">
        {
          selected 
            ? <div>
                <CountryBasic selected={ selected } existingCount={ existing.length }/>
                <CountryCulture selected={ selected }/>
                <CountryEconomy selected={ selected } existingCount={ existing.length }/>
              </div>
            : null
        }
      </div>
    );
  }
}

Country.propTypes = {
  history: PropTypes.object,
  selected: PropTypes.object,
  existing: PropTypes.array,
  location: PropTypes.object,
  countryGet: PropTypes.func,
  countriesGetExisting: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    selected: state.country,
    existing: state.countries.existing,
  };
};

const mapDispatchToProps = dispatch => ({
  countryGet: country => dispatch(countryActions.countryGetRequest(country.selected)),
  countriesGetExisting: () => dispatch(countryActions.countriesExistingFetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Country);
