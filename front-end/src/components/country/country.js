import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import autoBind from '../../utils/autoBind';

import * as countryActions from '../../actions/countryActions';
import * as routes from '../../utils/routes';
import './country.scss';

const defaultState = {
  selected: null,
}

class Country extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.location.state;
    autoBind.call(this, Country);
  }

  componentDidMount() {
    this.setState({ selected: this.state.selected })
    console.log(this.state);
    this.props.countryGet(this.state)
      .then((response) => {
        this.setState({ selected: response.body })
      })
  }

  render() {
    const { selected } = this.props;

    let countryNameJSX = null;
    let populationJSX = null;
    let areaJSX = null;
    let borderingJSX = null;
    
    if (selected) {
      countryNameJSX = 
        <span>
          {
            selected.countryName ?
            selected.countryName.toUpperCase()
            : null
          }
        </span>;

      populationJSX = 
        <span>
          {
            Number(selected.population).toLocaleString()
          }
        </span>

      areaJSX = 
        <span>
          {
            Number(selected.area).toLocaleString()
          }
        </span>;

      borderingJSX = 
        <span>
          {
            selected.borderCountries ? 
            selected.borderCountries.map((x) => {
              return `- ${x} -`
            })
            : null
          }
        </span>
    }

    return (
      <div className="country-info">
        {
          selected ? 
            <div className="basic-info">
              <h1>{countryNameJSX}</h1>
              <h3>{selected.location}</h3>
              <p>Bordering<br/>{borderingJSX}</p>
              <p>-------------------</p>
              <p>Population: {populationJSX} million 
              <br/>Rank: {selected.populationRank}</p>
              <p>-------------------</p>
              <p>Area: {areaJSX} km<sup>2</sup>
              <br/>Rank: {selected.areaRank}</p>
              <p>-------------------</p>
              <p>Life Expectancy: {selected.lifeExpectancy} years
              <br/>Rank: {selected.lifeExpectancyRank}</p>
              <div>
              </div>
            </div>
        : null
        }
      </div>
    )
  }
}

Country.propTypes = {
  history: PropTypes.object,
  selected: PropTypes.object,
}

const mapStateToProps = (state) => {
  return {
    selected: state.country,
  };
};

const mapDispatchToProps = dispatch => ({
  countryGet: country => dispatch(countryActions.countryGetRequest(country.selected)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Country);
