import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import autoBind from '../../utils/autoBind';

import Country from '../country/country';
import CountryForm from '../countryForm/countryForm';
import * as countryActions from '../../actions/countryActions';
import * as routes from '../../utils/routes';
import './landing.scss';

const defaultState = {
  selected: '',
  redirect: false,
}

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
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

  handleChange(e) {
    this.setState({
      selected: e.target.value,
    })
  }

  handleSearch() {
    this.setState({ selected: this.state.selected, redirect: true })
    console.log(this.state.selected);
  }

  render() {
    const { redirect } = this.state;
    const { countryList } = this.props;

    countryList.sort((x, y) => {
      let countryA = x.countryName;
      let countryB = y.countryName;
      return ((countryA < countryB) ? -1 : ((countryA > countryB) ? 1 : 0));
    });

    return (
      <div>
        <h2>Choose a country</h2>
        <div className="country-list">
          <select 
            className="country-select" 
            value={this.state.value}
            onChange={this.handleChange}>

            <option value="empty">Select</option>
            { countryList ?
              countryList.map((country) => {
                return (
                  <option name={country.countryName} value={country.id} key={country.id}>
                    {
                      country.countryName.includes('_') 
                        ? 
                        country.countryName.split('_').map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join()
                        :
                        country.countryName.charAt(0).toUpperCase() + country.countryName.slice(1)
                    }
                  </option>
                )
              })
              : null
            }
          </select>
          <button onClick={this.handleSearch}>Get info</button>
        </div>
        <CountryForm onComplete={this.handleCreateCountry} countries={countryList}/>

        { redirect ? 
            <Redirect to={{ pathname: '/countries', state: { selected: this.state.selected }}}
            /> 
          : null 
        }
      </div>
    );
  }
}

Landing.propTypes = {
  countryList: PropTypes.array,
  countryListFetch: PropTypes.func,
  countryCreate: PropTypes.func,
  countryGet: PropTypes.func,
  history: PropTypes.object,
  selected: PropTypes.string,
  redirect: PropTypes.bool,
}

const mapStateToProps = (state) => {
  return {
    countryList: state.countries,
  };
};

const mapDispatchToProps = dispatch => ({
  countryListFetch: () => dispatch(countryActions.countryListGetRequest()),
  countryCreate: country => dispatch(countryActions.countryCreateRequest(country)),
  countryGet: country => dispatch(countryActions.countryGetRequest(country)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);