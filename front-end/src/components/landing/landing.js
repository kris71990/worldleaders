import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as countryActions from '../../actions/countryActions';
import './landing.scss';

class Landing extends React.Component {
  componentDidMount() {
    this.props.countryListFetch();
  }

  render() {
    const { countryList } = this.props;
    console.log(this.props)

    return (
      <div className="country-list">
        <h3>Choose a country</h3>
        <div className="body">
          <select className="country-select">
            <option value="empty">Select</option>
            { countryList ?
              countryList.map((country) => {
                return (
                  <option value={country}>{country}</option>
                )
              })
              : null
            }
          </select>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  countryList: PropTypes.array,
  countryListFetch: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    countryList: state.countries,
  };
};

const mapDispatchToProps = dispatch => ({
  countryListFetch: () => dispatch(countryActions.countryListGetRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);