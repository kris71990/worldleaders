import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import autoBind from '../../utils/autoBind';

import CountryForm from '../countryForm/countryForm';
import SelectMenu from '../select-country/select-country';
import * as countryActions from '../../actions/countryActions';
import * as routes from '../../utils/routes';
import './landing.scss';

const defaultState = {
  selected: '',
  redirect: false,
};

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
    });
  }

  handleSearch() {
    this.setState({ selected: this.state.selected, redirect: true });
  }

  render() {
    const { redirect } = this.state;
    const { countryList } = this.props;

    if (countryList) {
      countryList.sort((x, y) => {
        const countryA = x.countryName;
        const countryB = y.countryName;
        return ((countryA < countryB) ? -1 : ((countryA > countryB) ? 1 : 0));
      });
    }

    return (
      <div className="landing">
        <SelectMenu 
          onClick={ this.handleSearch } 
          onChange={ this.handleChange }
          value={ this.state.selected }
          countries={ countryList }
        />
        <p>---------------------</p>
        <CountryForm 
          onComplete={ this.handleCreateCountry } 
          countries={ countryList }
        />
        { redirect 
          ? <Redirect to={{ pathname: '/countries', state: { selected: this.state.selected } }}/> 
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
  history: PropTypes.object,
  selected: PropTypes.string,
  redirect: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    countryList: state.countries,
  };
};

const mapDispatchToProps = dispatch => ({
  countryListFetch: () => dispatch(countryActions.countryListGetRequest()),
  countryCreate: country => dispatch(countryActions.countryCreateRequest(country)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
