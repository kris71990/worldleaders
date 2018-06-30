import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import autoBind from '../../utils/autoBind';

import CountryForm from '../countryForm/countryForm';
import * as countryActions from '../../actions/countryActions';
import * as routes from '../../utils/routes';
import './landing.scss';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    autoBind.call(this, Landing);
  }
  componentDidMount() {
    this.props.countryListFetch();
  }

  handleCreateCountry(country) {
    this.props.countryCreate(country)
      .then(() => {
        this.props.history.push(routes.ROOT_ROUTE);
      });
  }

  render() {
    const { countryList } = this.props;
    console.log(this.props)

    return (
      <div>
        <h3>Choose a country</h3>
        <div className="country-list">
          <select className="country-select">
            <option value="empty">Select</option>
            { countryList ?
              countryList.map((country) => {
                return (
                  <option value={country} key={country}>{country}</option>
                )
              })
              : null
            }
          </select>
        </div>
        <CountryForm onComplete={this.handleCreateCountry} countries={countryList}/>
      </div>
    );
  }
}

Landing.propTypes = {
  countryList: PropTypes.array,
  countryListFetch: PropTypes.func,
  countryCreate: PropTypes.func,
  history: PropTypes.object,
}

const mapStateToProps = (state) => {
  return {
    countryList: state.countries,
  };
};

const mapDispatchToProps = dispatch => ({
  countryListFetch: () => dispatch(countryActions.countryListGetRequest()),
  countryCreate: country => dispatch(countryActions.countryCreateRequest(country))
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);